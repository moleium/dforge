"use client"

import { DargPreviewer } from '@/previewer/Previewer'
import { useState } from 'react'
import { DargEditor } from '@/components/editor'

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
      size = [flex(), SIZE_TO_CONTENT]
      flow = FLOW_HORIZONTAL
      gap = 10
      children = [
        {
          rendObj = ROBJ_IMAGE
          size = [40, 40]
          image = "https://avatars.githubusercontent.com/u/93382765?v=4"
          keepAspect = KEEP_ASPECT_FIT
        },
        {
          flow = FLOW_VERTICAL
          children = [
            {
              rendObj = ROBJ_TEXT
              text = "DaRg UI Framework"
              color = Color(255, 215, 0)
            }
            {
              rendObj = ROBJ_TEXT
              text = "A declarative UI framework for games"
              color = Color(150, 150, 150)
            }
          ]
        }
      ]
    },
    {
      size = [flex(), SIZE_TO_CONTENT]
      flow = FLOW_HORIZONTAL
      gap = 20
      children = [
        {
          size = [200, SIZE_TO_CONTENT]
          flow = FLOW_VERTICAL
          gap = 5
          children = [
            {
              size = [flex(), 40]
              rendObj = ROBJ_BOX
              borderWidth = 1
              borderColor = Color(50, 100, 50)
              fillColor = Color(30, 60, 30)
              behavior = ["Button"]
              children = {
                rendObj = ROBJ_TEXT
                text = "Dashboard"
                color = Color(255, 255, 255)
              }
            },
            {
              size = [flex(), 40]
              rendObj = ROBJ_BOX
              borderWidth = 1
              borderColor = Color(50, 50, 100)
              fillColor = Color(30, 30, 60)
              behavior = ["Button"]
              children = {
                rendObj = ROBJ_TEXT
                text = "Settings"
                color = Color(255, 255, 255)
              }
            }
          ]
        },
        {
          size = [flex(), SIZE_TO_CONTENT]
          flow = FLOW_VERTICAL
          gap = 10
          children = [
            {
              rendObj = ROBJ_TEXTAREA
              text = "Welcome to DaRg UI Framework\nThis is a textarea component that supports multiline text."
              color = Color(200, 200, 200)
            },
            {
              rendObj = ROBJ_BOX
              size = [flex(), 100]
              borderWidth = 1
              borderColor = Color(80, 80, 80)
              fillColor = Color(30, 30, 30)
              padding = [10, 10]
              children = {
                rendObj = ROBJ_TEXT
                text = "This is a box component with padding and border"
                color = Color(200, 200, 200)
              }
            }
          ]
        }
      ]
    },
    {
      size = [flex(), 40]
      rendObj = ROBJ_SOLID
      fillColor = Color(30, 30, 30)
      flow = FLOW_HORIZONTAL
      halign = ALIGN_CENTER
      valign = ALIGN_CENTER
      children = {
        rendObj = ROBJ_TEXT
        text = "© 2024 DaRg Framework"
        color = Color(150, 150, 150)
      }
    }
  ]
}
`)

  return (
    <div className="flex h-screen bg-background">
      {/* Left Preview Panel */}
      <div className="flex-1 p-8 border-r border-border">
        <div className="rounded-lg bg-card shadow-xl overflow-hidden">
          <DargPreviewer 
            code={squirrelCode}
            width={800}
            height={600}
            scale={1}
          />
        </div>
      </div>

      {/* Right Editor Panel */}
      <div className="w-[950px] p-8 bg-muted/5">
        <div className="h-full flex flex-col">
          <DargEditor
            value={squirrelCode}
            onChange={setSquirrelCode}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}
