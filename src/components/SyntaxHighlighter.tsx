import React from 'react'
import { colors, tokenize, Token } from '../syntax/highlighter'

interface Props {
  code: string
  className?: string
}

const tokenColors: Record<Token['type'], string> = {
  keyword: colors.mauve,
  operator: colors.sky,
  string: colors.green,
  number: colors.peach,
  comment: colors.overlay,
  function: colors.blue,
  property: colors.lavender,
  punctuation: colors.subtext,
  text: colors.text
}

export const SyntaxHighlighter: React.FC<Props> = ({ code, className }) => {
  const tokens = tokenize(code)

  return (
    <pre className={className} style={{ margin: 0 }}>
      <code>
        {tokens.map((token, i) => (
          <span 
            key={i}
            style={{ color: tokenColors[token.type] }}
          >
            {token.text}
          </span>
        ))}
      </code>
    </pre>
  )
} 