import React from 'react'
import { DargComponent } from '../parser/types'

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
  const getStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      display: 'flex',
      position: 'relative',
      backgroundColor: parseColor(component.fillColor),
      border: component.borderWidth ? 
        `${component.borderWidth}px solid ${parseColor(component.borderColor)}` : undefined,
      borderRadius: component.borderRadius,
      padding: component.padding?.map(p => `${p}px`).join(' '),
      margin: component.margin?.map(m => `${m}px`).join(' '),
      transition: 'all 0.2s',
      cursor: component.behavior?.includes('Button') ? 'pointer' : undefined,
      overflow: component.clipChildren ? 'hidden' : undefined
    }

    if (component.flow === 1) { // FLOW_HORIZONTAL
      style.flexDirection = 'row'
    } else if (component.flow === 2) { // FLOW_VERTICAL
      style.flexDirection = 'column'
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

    if (component.halign) {
      style.justifyContent = component.halign === 1 ? 'flex-start' 
        : component.halign === 2 ? 'center' 
        : 'flex-end'
    }

    if (component.valign) {
      style.alignItems = component.valign === 1 ? 'flex-start'
        : component.valign === 2 ? 'center'
        : 'flex-end' 
    }

    if (component.pos) {
      style.position = 'absolute'
      const [x, y] = component.pos
      style.left = x
      style.top = y
    }

    if (component.gap) {
      style.gap = `${component.gap}px`
    }

    return style
  }

  const renderContent = () => {
    switch(component.rendObj) {
      case 1: // ROBJ_TEXT
        return <span style={{
          color: parseColor(component.color),
          whiteSpace: 'pre-wrap'
        }}>{component.text}</span>
      
      case 2: // ROBJ_IMAGE
        return <img src={component.image} style={{
          width: '100%',
          height: '100%',
          objectFit: component.keepAspect === 1 ? 'none'
            : component.keepAspect === 2 ? 'cover'
            : 'contain'
        }} />
      
      case 3: // ROBJ_TEXTAREA
        return <textarea 
          value={component.text} 
          style={{
            color: parseColor(component.color),
            resize: 'none',
            border: 'none',
            background: 'none',
            width: '100%',
            height: '100%',
            whiteSpace: 'pre-wrap'
          }}
          readOnly
        />
      
      case 4: // ROBJ_BOX
      case 5: // ROBJ_SOLID
      case 6: // ROBJ_FRAME
        return null // Styling handled in getStyle()
    }
  }

  return (
    <div 
      style={getStyle()} 
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