'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@lib/utils'
import hljs from 'highlight.js'
import '@highlight/styles/catppuccin.css'
import '@highlight/darg'

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
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (preRef.current) {
      const highlighted = hljs.highlight(value, { language: 'DaRg' }).value
      preRef.current.innerHTML = highlighted
      preRef.current.className = 'hljs p-4 m-0 bg-transparent pointer-events-none'
    }
  }, [value])

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (scrollRef.current && target !== scrollRef.current) {
      scrollRef.current.scrollTop = target.scrollTop
      scrollRef.current.scrollLeft = target.scrollLeft
    }
  }

  return (
    <div className={cn(
      "relative rounded-lg border border-border overflow-hidden font-mono text-sm",
      className
    )}>
      <div 
        ref={scrollRef}
        className="absolute inset-0 overflow-auto"
        onScroll={handleScroll}
      >
        <pre 
          ref={preRef}
          className="p-4 m-0 bg-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        spellCheck={false}
        className={cn(
          "absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none",
          "focus:outline-none focus:ring-0"
        )}
      />
    </div>
  )
}