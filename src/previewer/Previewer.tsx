"use client";

import React, { useEffect, useState } from 'react'
import { DargParser } from '../parser/parser'
import { DargComponentPreview } from './DargComponent'
import { PreviewerProps, PreviewerState } from './types'

export const DargPreviewer: React.FC<PreviewerProps> = ({
  code,
  width = 800,
  height = 600,
  scale = 1
}) => {
  const [state, setState] = useState<PreviewerState>({
    ast: null,
    isLoading: true
  })

  useEffect(() => {
    try {
      const parser = new DargParser(code)
      const ast = parser.parse()
      setState({ ast, isLoading: false })
    } catch (error) {
      setState({ 
        ast: null, 
        error: error.message, 
        isLoading: false 
      })
    }
  }, [code])

  const containerStyle: React.CSSProperties = {
    width,
    height,
    padding: '20px',
    overflow: 'auto',
    borderRadius: '8px'
  }

  if (state.isLoading) {
    return <div>Loading...</div>
  }

  if (state.error) {
    return (
      <div style={{ color: 'red' }}>
        Error: {state.error}
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <DargComponentPreview 
        component={state.ast} 
        scale={scale}
      />
    </div>
  )
}