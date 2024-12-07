"use client"

import { DargPreviewer } from '../src/previewer/Previewer'
import { useState } from 'react'

export default function Page() {
  const [squirrelCode, setSquirrelCode] = useState(`
{
  size = [flex(), SIZE_TO_CONTENT]
  flow = FLOW_VERTICAL
  gap = 20
  padding = [20, 20]
  rendObj = ROBJ_SOLID
  fillColor = Color(20, 20, 20)
  children = [
    
    {
      rendObj = ROBJ_TEXT
      text = "Alignment Demo"
      color = Color(255, 215, 0)
    },

    
    {
      size = [flex(), 200]
      flow = FLOW_VERTICAL
      gap = 10
      children = [
        {
          rendObj = ROBJ_TEXT
          text = "Horizontal Alignment"
          color = Color(200, 200, 200)
        },
        
        {
          size = [flex(), 50]
          rendObj = ROBJ_BOX
          borderWidth = 1
          borderColor = Color(100, 100, 100)
          fillColor = Color(30, 30, 30)
          halign = ALIGN_LEFT
          children = {
            rendObj = ROBJ_TEXT
            text = "ALIGN_LEFT"
            color = Color(255, 255, 255)
          }
        },
        
        {
          size = [flex(), 50]
          rendObj = ROBJ_BOX
          borderWidth = 1
          borderColor = Color(100, 100, 100)
          fillColor = Color(30, 30, 30)
          halign = ALIGN_CENTER
          children = {
            rendObj = ROBJ_TEXT
            text = "ALIGN_CENTER"
            color = Color(255, 255, 255)
          }
        },
        
        {
          size = [flex(), 50]
          rendObj = ROBJ_BOX
          borderWidth = 1
          borderColor = Color(100, 100, 100)
          fillColor = Color(30, 30, 30)
          halign = ALIGN_RIGHT
          children = {
            rendObj = ROBJ_TEXT
            text = "ALIGN_RIGHT"
            color = Color(255, 255, 255)
          }
        }
      ]
    },

    
    {
      size = [flex(), 200]
      flow = FLOW_HORIZONTAL
      gap = 10
      children = [
        {
          rendObj = ROBJ_TEXT
          text = "Vertical\nAlignment"
          color = Color(200, 200, 200)
        },
        
        {
          size = [150, flex()]
          rendObj = ROBJ_BOX
          borderWidth = 1
          borderColor = Color(100, 100, 100)
          fillColor = Color(30, 30, 30)
          valign = ALIGN_TOP
          children = {
            rendObj = ROBJ_TEXT
            text = "ALIGN_TOP"
            color = Color(255, 255, 255)
          }
        },
        
        {
          size = [150, flex()]
          rendObj = ROBJ_BOX
          borderWidth = 1
          borderColor = Color(100, 100, 100)
          fillColor = Color(30, 30, 30)
          valign = ALIGN_CENTER
          children = {
            rendObj = ROBJ_TEXT
            text = "ALIGN_CENTER"
            color = Color(255, 255, 255)
          }
        },
        
        {
          size = [150, flex()]
          rendObj = ROBJ_BOX
          borderWidth = 1
          borderColor = Color(100, 100, 100)
          fillColor = Color(30, 30, 30)
          valign = ALIGN_BOTTOM
          children = {
            rendObj = ROBJ_TEXT
            text = "ALIGN_BOTTOM"
            color = Color(255, 255, 255)
          }
        }
      ]
    },

    
    {
      size = [flex(), 200]
      rendObj = ROBJ_BOX
      borderWidth = 1
      borderColor = Color(100, 100, 100)
      fillColor = Color(30, 30, 30)
      children = [
        {
          size = [flex(), flex()]
          flow = FLOW_HORIZONTAL
          gap = 10
          children = [
            
            {
              size = [flex(), flex()]
              halign = ALIGN_LEFT
              valign = ALIGN_TOP
              children = {
                rendObj = ROBJ_TEXT
                text = "Top Left"
                color = Color(255, 255, 255)
              }
            },
            
            {
              size = [flex(), flex()]
              halign = ALIGN_CENTER
              valign = ALIGN_TOP
              children = {
                rendObj = ROBJ_TEXT
                text = "Top Center"
                color = Color(255, 255, 255)
              }
            },
            
            {
              size = [flex(), flex()]
              halign = ALIGN_RIGHT
              valign = ALIGN_TOP
              children = {
                rendObj = ROBJ_TEXT
                text = "Top Right"
                color = Color(255, 255, 255)
              }
            }
          ]
        },
        {
          size = [flex(), flex()]
          flow = FLOW_HORIZONTAL
          gap = 10
          children = [
            
            {
              size = [flex(), flex()]
              halign = ALIGN_LEFT
              valign = ALIGN_CENTER
              children = {
                rendObj = ROBJ_TEXT
                text = "Center Left"
                color = Color(255, 255, 255)
              }
            },
            
            {
              size = [flex(), flex()]
              halign = ALIGN_CENTER
              valign = ALIGN_CENTER
              children = {
                rendObj = ROBJ_TEXT
                text = "Center Center"
                color = Color(255, 255, 255)
              }
            },
            
            {
              size = [flex(), flex()]
              halign = ALIGN_RIGHT
              valign = ALIGN_CENTER
              children = {
                rendObj = ROBJ_TEXT
                text = "Center Right"
                color = Color(255, 255, 255)
              }
            }
          ]
        },
        {
          size = [flex(), flex()]
          flow = FLOW_HORIZONTAL
          gap = 10
          children = [
            
            {
              size = [flex(), flex()]
              halign = ALIGN_LEFT
              valign = ALIGN_BOTTOM
              children = {
                rendObj = ROBJ_TEXT
                text = "Bottom Left"
                color = Color(255, 255, 255)
              }
            },
            
            {
              size = [flex(), flex()]
              halign = ALIGN_CENTER
              valign = ALIGN_BOTTOM
              children = {
                rendObj = ROBJ_TEXT
                text = "Bottom Center"
                color = Color(255, 255, 255)
              }
            },
            
            {
              size = [flex(), flex()]
              halign = ALIGN_RIGHT
              valign = ALIGN_BOTTOM
              children = {
                rendObj = ROBJ_TEXT
                text = "Bottom Right"
                color = Color(255, 255, 255)
              }
            }
          ]
        }
      ]
    }
  ]
}
`)

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
        <DargPreviewer 
          code={squirrelCode}
          width={800}
          height={600}
          scale={1}
        />
        <textarea
          value={squirrelCode}
          onChange={(e) => setSquirrelCode(e.target.value)}
          style={{
            width: '400px',
            height: '600px',
            padding: '12px',
            fontFamily: 'monospace',
            fontSize: '14px',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            border: '1px solid #333',
            borderRadius: '4px',
            resize: 'none'
          }}
        />
      </div>
    </div>
  )
}
