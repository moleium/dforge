// Catppuccin Mocha colors
export const colors = {
  text: '#cdd6f4',       // Text
  subtext: '#a6adc8',    // Subtext0
  overlay: '#7f849c',    // Overlay0
  blue: '#89b4fa',       // Blue
  lavender: '#b4befe',   // Lavender  
  sapphire: '#74c7ec',   // Sapphire
  sky: '#89dceb',        // Sky
  teal: '#94e2d5',       // Teal
  green: '#a6e3a1',      // Green
  yellow: '#f9e2af',     // Yellow
  peach: '#fab387',      // Peach
  maroon: '#eba0ac',     // Maroon
  red: '#f38ba8',        // Red
  mauve: '#cba6f7',      // Mauve
  pink: '#f5c2e7',       // Pink
  flamingo: '#f2cdcd',   // Flamingo
  rosewater: '#f5e0dc',  // Rosewater
  base: '#1e1e2e',       // Base
  mantle: '#181825',     // Mantle
  crust: '#11111b',      // Crust
}

// Token types for syntax highlighting
export type Token = {
  text: string
  type: 'keyword' | 'operator' | 'string' | 'number' | 'comment' | 'function' | 'property' | 'punctuation' | 'text'
}

// Keywords in daRg
const keywords = [
  'size', 'rendObj', 'children', 'watch', 'behavior', 'flow', 'pos', 
  'halign', 'valign', 'text', 'color', 'fillColor', 'borderColor',
  'padding', 'margin', 'gap', 'clipChildren', 'keepAspect',
  'FLOW_HORIZONTAL', 'FLOW_VERTICAL',
  'ALIGN_LEFT', 'ALIGN_CENTER', 'ALIGN_RIGHT', 'ALIGN_TOP', 'ALIGN_BOTTOM',
  'ROBJ_TEXT', 'ROBJ_IMAGE', 'ROBJ_BOX', 'ROBJ_SOLID', 'ROBJ_FRAME'
]

export function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let current = ''
  let inString = false
  let inComment = false
  
  const addToken = (type: Token['type']) => {
    if (current) {
      tokens.push({ text: current, type })
      current = ''
    }
  }

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    const nextChar = code[i + 1]

    // Handle comments
    if (char === '/' && nextChar === '/') {
      addToken('text')
      inComment = true
      current += char
      continue
    }

    if (inComment) {
      if (char === '\n') {
        addToken('comment')
        inComment = false
      } else {
        current += char
      }
      continue
    }

    // Handle strings
    if (char === '"' || char === "'") {
      if (!inString) {
        addToken('text')
        inString = char
      } else if (char === inString) {
        current += char
        addToken('string')
        inString = false
        continue
      }
    }

    if (inString) {
      current += char
      continue
    }

    // Handle numbers
    if (/[0-9]/.test(char)) {
      if (!/[0-9.]/.test(current)) {
        addToken('text')
      }
      current += char
      if (!/[0-9.]/.test(nextChar)) {
        addToken('number')
      }
      continue
    }

    // Handle operators
    if (/[=+\-*/<>!&|^%]/.test(char)) {
      addToken('text')
      current += char
      addToken('operator')
      continue
    }

    // Handle punctuation
    if (/[[\]{}(),;]/.test(char)) {
      addToken('text')
      current += char
      addToken('punctuation')
      continue
    }

    // Handle whitespace
    if (/\s/.test(char)) {
      addToken('text')
      current += char
      addToken('text')
      continue
    }

    current += char

    // Check if current word is a keyword
    const word = current.trim()
    if (keywords.includes(word)) {
      addToken('keyword')
      continue
    }

    // Check if it's a function call
    if (nextChar === '(') {
      addToken('function')
      continue
    }

    // Check if it's a property access
    if (nextChar === '.') {
      addToken('property')
      continue
    }
  }

  addToken('text')
  return tokens
} 