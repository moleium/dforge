"use client"

import { DargPreviewer } from '../src/previewer/Previewer'
import { useState } from 'react'
import { SyntaxHighlighter } from '../src/components/SyntaxHighlighter'

export default function Page() {
  const [squirrelCode, setSquirrelCode] = useState(`
{
  size = [400, 300]
  fillColor = Color(40, 40, 40)
  flow = FLOW_VERTICAL
  gap = 20
  children = [
    {
      size = [300, 80]
      fillColor = Color(60, 60, 60)
      text = "Left-Top Aligned"
      halign = ALIGN_LEFT
      valign = ALIGN_TOP
      rendObj = ROBJ_TEXT
    }
    {
      size = [300, 80]
      fillColor = Color(60, 60, 60) 
      text = "Center-Center Aligned"
      halign = ALIGN_CENTER
      valign = ALIGN_CENTER
      rendObj = ROBJ_TEXT
    }
    {
      size = [300, 80]
      fillColor = Color(60, 60, 60)
      text = "Right-Bottom Aligned"
      halign = ALIGN_RIGHT
      valign = ALIGN_BOTTOM
      rendObj = ROBJ_TEXT
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
      <div className="w-[450px] p-8 bg-muted/5">
        <div className="h-full flex flex-col">
          <div className="relative flex-1 rounded-lg border border-border shadow-inner">
            <textarea
              value={squirrelCode}
              onChange={(e) => setSquirrelCode(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-background resize-none focus:outline-none focus:ring-1 focus:ring-ring/20 text-transparent caret-white"
              spellCheck={false}
            />
            <div className="absolute inset-0 p-4 pointer-events-none overflow-auto">
              <SyntaxHighlighter 
                code={squirrelCode}
                className="font-mono text-sm whitespace-pre"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
