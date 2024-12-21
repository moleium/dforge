'use client'

import React from 'react'
import { cn } from '@lib/utils'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'

interface Props {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const DargEditor: React.FC<Props> = ({ 
  value, 
  onChange,
  className 
}) => {
  return (
    <div className={cn(
      "relative rounded-lg border border-border overflow-hidden font-mono text-sm",
      className
    )}>
      <AceEditor
        theme="one_dark"
        value={value}
        onChange={onChange}
        name="darg-editor"
        width="100%"
        height="100%"
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
        }}
      />
    </div>
  )
}