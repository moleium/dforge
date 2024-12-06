export type DargComponent = {
  size?: [number | string, number | string]
  rendObj?: number
  children?: DargComponent[] | DargComponent
  watch?: any[]
  behavior?: string[]
  flow?: number
  pos?: [number, number]
  halign?: number
  valign?: number
  text?: string
  color?: number | string
  image?: string
  padding?: number[]
  margin?: number[]
  onClick?: string
  onHover?: string
  fillColor?: string | number
  borderColor?: string | number
  borderWidth?: number
  borderRadius?: number
  gap?: number
  clipChildren?: boolean
  keepAspect?: number
}

export enum RenderObject {
  ROBJ_TEXT = 1,
  ROBJ_IMAGE = 2,
  ROBJ_TEXTAREA = 3,
  ROBJ_BOX = 4,
  ROBJ_SOLID = 5,
  ROBJ_FRAME = 6
}

export enum Flow {
  FLOW_HORIZONTAL = 1,
  FLOW_VERTICAL = 2
}

export enum Align {
  ALIGN_LEFT = 1,
  ALIGN_CENTER = 2,
  ALIGN_RIGHT = 3,
  ALIGN_TOP = 4,
  ALIGN_BOTTOM = 5
}

export enum KeepAspect {
  KEEP_ASPECT_NONE = 1,
  KEEP_ASPECT_FILL = 2,
  KEEP_ASPECT_FIT = 3
}

export enum Behavior {
  Button = "Button",
  TextArea = "TextArea",
  WheelScroll = "WheelScroll",
  InspectPicker = "InspectPicker",
  BoundToArea = "BoundToArea"
}