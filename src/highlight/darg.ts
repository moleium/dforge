import hljs from 'highlight.js'

hljs.registerLanguage('darg', function(hljs) {
  return {
    name: 'DaRg',
    case_insensitive: false,
    
    keywords: {
      keyword: [
        // Layout properties
        'size', 'pos', 'flow', 'gap', 'padding', 'margin',
        'halign', 'valign', 'hplace', 'vplace',
        
        // Rendering properties  
        'rendObj', 'fillColor', 'borderColor', 'borderWidth',
        'color', 'text', 'image', 'keepAspect',
        
        // Behavior
        'behavior', 'watch', 'clipChildren',
        'onElemState', 'onClick', 'onChange'
      ].join(' '),

      literal: [
        // Render objects
        'ROBJ_TEXT', 'ROBJ_IMAGE', 'ROBJ_TEXTAREA', 'ROBJ_BOX',
        'ROBJ_SOLID', 'ROBJ_FRAME', 'ROBJ_VECTOR_CANVAS',
        
        // Flow types
        'FLOW_HORIZONTAL', 'FLOW_VERTICAL',
        
        // Alignment
        'ALIGN_LEFT', 'ALIGN_CENTER', 'ALIGN_RIGHT',
        'ALIGN_TOP', 'ALIGN_BOTTOM',
        
        // Sizing
        'SIZE_TO_CONTENT', 'KEEP_ASPECT_FIT', 'KEEP_ASPECT_FILL',
        
        // States
        'S_HOVER', 'S_ACTIVE', 'S_DRAG'
      ].join(' '),

      built_in: [
        // Functions
        'Color', 'Picture', 'Watched', 'Computed', 'flex',
        'hdpx', 'hdpxi', 'sh', 'sw'
      ].join(' ')
    },

    contains: [
      // Comments
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,

      // Strings
      {
        className: 'string',
        begin: '"', 
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },

      // Numbers including decimals
      {
        className: 'number',
        begin: '\\b\\d+(\\.\\d+)?\\b'
      },

      // Color values
      {
        className: 'number',
        begin: 'Color\\(',
        end: '\\)',
        contains: [
          {
            className: 'number',
            begin: '\\b\\d+\\b'
          }
        ]
      },

      // Functions
      {
        className: 'function',
        beginKeywords: 'function',
        end: '\\{',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: '[A-Za-z$_][0-9A-Za-z$_]*'
          }),
          {
            className: 'params',
            begin: '\\(',
            end: '\\)',
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          }
        ]
      },

      // Object properties
      {
        className: 'property',
        begin: '[A-Za-z_][A-Za-z0-9_]*(?=\\s*=)',
      }
    ]
  }
})