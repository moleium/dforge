export interface PreviewerProps {
  code: string
  width?: number
  height?: number
  scale?: number
}

export interface PreviewerState {
  ast: any
  error?: string
  isLoading: boolean
} 