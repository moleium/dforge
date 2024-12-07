import React from 'react'
import { DargComponent } from '@parser/types'
import { cn } from '@lib/utils'

interface Props {
  component: DargComponent
  scale?: number
}

function parseColor(color: string | number | undefined): string | undefined {
  if (!color) return undefined
  
  // Handle Color() function string
  if (typeof color === 'string' && color.startsWith('Color(')) {
    const values = color.slice(6, -1).split(',').map(v => parseInt(v.trim()))
    if (values.length >= 3) {
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${values[3] ? values[3]/255 : 1})`
    }
  }
  
  // Handle numeric color values (hex)
  if (typeof color === 'number') {
    const r = (color >> 16) & 255
    const g = (color >> 8) & 255
    const b = color & 255
    const a = ((color >> 24) & 255) / 255
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  return color.toString()
}

export const DargComponentPreview: React.FC<Props> = ({ component, scale = 1 }) => {
  const getClassNames = () => {
    const alignmentClasses = {
      halign: component.halign === 1 ? 'justify-start' 
        : component.halign === 2 ? 'justify-center'
        : component.halign === 3 ? 'justify-end'
        : null,
      valign: component.valign === 1 ? 'items-start'
        : component.valign === 2 ? 'items-center'
        : component.valign === 3 ? 'items-end'
        : null
    }
    
    const classes = [
      'relative flex transition-all duration-200',
      component.clipChildren && 'overflow-hidden',
      component.behavior?.includes('Button') && 'cursor-pointer',
      
      // Flow direction
      component.flow === 1 && 'flex-row',
      component.flow === 2 && 'flex-col',
      
      // Alignment
      alignmentClasses.halign,
      alignmentClasses.valign
    ]

    const finalClasses = cn(classes)
    return finalClasses
  }

  const getStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      backgroundColor: parseColor(component.fillColor),
      borderWidth: component.borderWidth,
      borderColor: parseColor(component.borderColor),
      borderRadius: component.borderRadius,
      padding: component.padding?.map(p => `${p}px`).join(' '),
      margin: component.margin?.map(m => `${m}px`).join(' '),
      gap: component.gap ? `${component.gap}px` : undefined
    }

    if (component.size) {
      if (Array.isArray(component.size)) {
        const [width, height] = component.size
        if (typeof width === 'string' && width.includes('flex')) {
          style.flex = parseInt(width.replace('flex(', '').replace(')', '')) || 1
        } else {
          style.width = typeof width === 'number' ? width * scale : width
        }
        style.height = typeof height === 'number' ? height * scale : height
      }
    }

    if (component.pos) {
      style.position = 'absolute'
      const [x, y] = component.pos
      style.left = x
      style.top = y
    }

    return style
  }

  const finalClassNames = getClassNames()
  const finalStyle = getStyle()
  
  const renderContent = () => {
    switch(component.rendObj) {
      case 1: // ROBJ_TEXT
        return (
          <span 
            className="whitespace-pre-wrap"
            style={{ color: parseColor(component.color) }}
          >
            {component.text}
          </span>
        )
      
      case 2: // ROBJ_IMAGE
        return (
          <img 
            src={component.image} 
            className={cn(
              'w-full h-full',
              component.keepAspect === 1 && 'object-none',
              component.keepAspect === 2 && 'object-cover',
              !component.keepAspect && 'object-contain'
            )}
          />
        )
      
      case 3: // ROBJ_TEXTAREA
        return (
          <textarea 
            value={component.text}
            className="w-full h-full resize-none border-none bg-transparent whitespace-pre-wrap"
            style={{ color: parseColor(component.color) }}
            readOnly
          />
        )
      
      case 4: // ROBJ_BOX
      case 5: // ROBJ_SOLID
      case 6: // ROBJ_FRAME
        return null // Styling handled in getStyle()
    }
  }

  return (
    <div 
      className={finalClassNames}
      style={finalStyle} 
      onClick={component.onClick ? () => eval(component.onClick) : undefined}
      onMouseEnter={component.onHover ? () => eval(component.onHover) : undefined}
    >
      {renderContent()}
      {Array.isArray(component.children) && 
        component.children.map((child, index) => (
          <DargComponentPreview 
            key={index} 
            component={child} 
            scale={scale}
          />
        ))
      }
    </div>
  )
}