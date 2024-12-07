import { DargComponent, RenderObject, Flow, Align } from './types'

export class DargParser {
  private source: string
  private pos: number = 0

  constructor(source: string) {
    this.source = source
  }

  parse(): DargComponent {
    return this.parseComponent()
  }

  private parseComponent(): DargComponent {
    // Skip whitespace
    this.skipWhitespace()

    // Check if we're starting a component
    if (this.current() !== '{') {
      throw new Error('Expected component to start with {')
    }
    
    this.advance()
    
    const component: DargComponent = {}
    
    while (this.pos < this.source.length && this.current() !== '}') {
      const property = this.parseProperty()
      if (property) {
        Object.assign(component, property)
      }
      this.skipWhitespace()
      
      // Skip comma if present
      if (this.current() === ',') {
        this.advance()
      }
    }

    if (this.current() !== '}') {
      throw new Error('Expected component to end with }')
    }
    
    this.advance()
    return component
  }

  private parseProperty(): Partial<DargComponent> {
    this.skipWhitespace()
    
    const key = this.parseIdentifier()
    this.skipWhitespace()
    
    if (this.current() !== '=') {
      throw new Error('Expected = after property name')
    }
    
    this.advance()
    this.skipWhitespace()
    
    const value = this.parseValue(key)
    
    return { [key]: value }
  }

  private parseValue(propertyName: string): any {
    switch(propertyName) {
      case 'size':
      case 'pos':
      case 'padding':
      case 'margin':
        return this.parseArray()
      case 'children':
        return this.parseChildren()
      case 'rendObj':
        return this.parseRenderObject()
      case 'flow': 
        return this.parseFlow()
      case 'text':
        return this.parseString()
      case 'onClick':
      case 'onHover':
        return this.parseFunction()
      default:
        return this.parsePrimitive()
    }
  }

  private parseChildren(): DargComponent[] {
    if (this.current() !== '[') {
      // Single child
      return [this.parseComponent()]
    }

    // Array of children
    this.advance()
    const children: DargComponent[] = []
    
    while (this.current() !== ']') {
      children.push(this.parseComponent())
      this.skipWhitespace()
      
      if (this.current() === ',') {
        this.advance()
      }
    }
    
    this.advance()
    return children
  }

  private parseArray(): any[] {
    if (this.current() !== '[') {
      throw new Error('Expected array to start with [')
    }
    
    this.advance()
    const values: any[] = []
    
    while (this.pos < this.source.length && this.current() !== ']') {
      this.skipWhitespace()

      // Handle function calls like flex()
      if (/[a-zA-Z_]/.test(this.current())) {
        const identifier = this.parseIdentifier()
        if (this.current() === '(') {
          this.advance()
          const args = this.parseFunctionArgs()
          this.advance() // Skip closing parenthesis
          values.push(`${identifier}(${args.join(',')})`)
        } else {
          values.push(identifier)
        }
      }
      // Handle numbers
      else if (/[0-9-]/.test(this.current())) {
        values.push(Number(this.parseNumber()))
      }
      // Handle strings
      else if (this.current() === '"' || this.current() === "'") {
        values.push(this.parseString())
      }
      
      this.skipWhitespace()
      
      if (this.current() === ',') {
        this.advance()
        this.skipWhitespace()
      }
    }

    if (this.current() !== ']') {
      throw new Error('Expected array to end with ]')
    }
    
    this.advance()
    return values
  }

  // Helper methods
  private current(): string {
    return this.source[this.pos]
  }

  private advance(): void {
    this.pos++
  }

  private skipWhitespace(): void {
    while (/\s/.test(this.current())) {
      this.advance()
    }
  }

  private parseIdentifier(): string {
    let identifier = ''
    while (/[a-zA-Z_]/.test(this.current())) {
      identifier += this.current()
      this.advance()
    }
    return identifier
  }

  private parseNumber(): string {
    let num = ''
    while (/[0-9.]/.test(this.current())) {
      num += this.current()
      this.advance() 
    }
    return num
  }

  private parseString(): string {
    if (this.current() !== '"' && this.current() !== "'") {
      throw new Error('Expected string to start with quote')
    }
    
    const quote = this.current()
    this.advance()
    
    let str = ''
    while (this.current() !== quote) {
      str += this.current()
      this.advance()
    }
    
    this.advance()
    return str
  }

  private parseFunction(): string {
    // Parse function definition
    // @() or function() syntax
    let fn = ''
    while (this.current() !== '}' && this.current() !== ',') {
      fn += this.current()
      this.advance()
    }
    return fn.trim()
  }

  private parseRenderObject(): RenderObject {
    const identifier = this.parseIdentifier()
    switch(identifier) {
      case 'ROBJ_TEXT':
        return RenderObject.ROBJ_TEXT
      case 'ROBJ_IMAGE':
        return RenderObject.ROBJ_IMAGE
      case 'ROBJ_TEXTAREA':
        return RenderObject.ROBJ_TEXTAREA
      case 'ROBJ_BOX':
        return RenderObject.ROBJ_BOX
      case 'ROBJ_SOLID':
        return RenderObject.ROBJ_SOLID
      case 'ROBJ_FRAME':
        return RenderObject.ROBJ_FRAME
      default:
        throw new Error(`Unknown render object: ${identifier}`)
    }
  }

  private parseFlow(): Flow {
    const identifier = this.parseIdentifier()
    switch(identifier) {
      case 'FLOW_HORIZONTAL':
        return Flow.FLOW_HORIZONTAL
      case 'FLOW_VERTICAL':
        return Flow.FLOW_VERTICAL
      default:
        throw new Error(`Unknown flow type: ${identifier}`)
    }
  }

  private parsePrimitive(): any {
    if (this.current() === 'A' && this.source.slice(this.pos).startsWith('ALIGN_')) {
      const identifier = this.parseIdentifier()
      switch(identifier) {
        case 'ALIGN_LEFT':
        case 'ALIGN_TOP':
          return 1
        case 'ALIGN_CENTER':
          return 2
        case 'ALIGN_RIGHT':
        case 'ALIGN_BOTTOM':
          return 3
        default:
          console.warn('Unknown alignment:', identifier)
          return identifier
      }
    }
    
    // Handle different primitive types
    if (this.current() === '"' || this.current() === "'") {
      return this.parseString()
    }
    
    if (/[0-9-]/.test(this.current())) {
      return Number(this.parseNumber())
    }

    if (this.current() === '[') {
      return this.parseArray()
    }

    if (this.current() === '{') {
      return this.parseComponent()
    }

    // Handle function calls like Color() or Picture()
    const identifier = this.parseIdentifier()
    if (this.current() === '(') {
      this.advance()
      const args = this.parseFunctionArgs()
      this.advance() // Skip closing parenthesis
      
      // Special handling for common functions
      switch(identifier) {
        case 'Color':
          return this.processColorFunction(args)
        case 'Picture':
          return this.processPictureFunction(args)
        default:
          return `${identifier}(${args.join(',')})`
      }
    }

    // Handle constants like SIZE_TO_CONTENT
    return identifier
  }

  private parseFunctionArgs(): any[] {
    const args: any[] = []
    
    while (this.current() !== ')') {
      this.skipWhitespace()
      
      if (/[0-9-]/.test(this.current())) {
        args.push(Number(this.parseNumber()))
      } else if (this.current() === '"' || this.current() === "'") {
        args.push(this.parseString())
      } else {
        args.push(this.parseIdentifier())
      }

      this.skipWhitespace()
      
      if (this.current() === ',') {
        this.advance()
      }
    }

    return args
  }

  private processColorFunction(args: any[]): string {
    // Convert color arguments to a hex string or keep as Color() function
    if (args.length === 3 || args.length === 4) {
      return `Color(${args.join(',')})`
    }
    throw new Error('Invalid Color function arguments')
  }

  private processPictureFunction(args: any[]): string {
    // Handle Picture function calls
    if (args.length === 1) {
      return `Picture(${args[0]})`
    }
    throw new Error('Invalid Picture function arguments')
  }
} 