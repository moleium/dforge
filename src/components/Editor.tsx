'use client'

import React, { useRef } from 'react'
import { cn } from '../../lib/utils'

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
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className={cn(
          "w-full h-full p-4 bg-transparent text-white resize-none",
          "focus:outline-none focus:ring-0"
        )}
      />
    </div>
  )
}