import * as monaco from 'monaco-editor'

// Register daRg language
export function registerDargLanguage() {
  monaco.languages.register({ id: 'darg' })

  // Define daRg tokens
  monaco.languages.setMonarchTokensProvider('darg', {
    // Declare token types
    tokenizer: {
      root: [
        // Keywords
        [/\b(size|rendObj|children|watch|behavior|flow|pos|halign|valign|text|color|fillColor|borderColor|padding|margin|gap|clipChildren|keepAspect)\b/, 'keyword'],

        // Constants
        [/\b(FLOW_HORIZONTAL|FLOW_VERTICAL|ALIGN_LEFT|ALIGN_CENTER|ALIGN_RIGHT|ALIGN_TOP|ALIGN_BOTTOM|ROBJ_TEXT|ROBJ_IMAGE|ROBJ_BOX|ROBJ_SOLID|ROBJ_FRAME|SIZE_TO_CONTENT|KEEP_ASPECT_NONE|KEEP_ASPECT_FILL|KEEP_ASPECT_FIT)\b/, 'constant'],

        // Functions
        [/\b(Color|Picture|flex)\b(?=\()/, 'function'],

        // Numbers
        [/\b\d+\b/, 'number'],
        [/\b\d+\.\d+\b/, 'number'],

        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],  // Non-terminated string
        [/'([^'\\]|\\.)*$/, 'string.invalid'],  // Non-terminated string
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string_double' }],
        [/'/, { token: 'string.quote', bracket: '@open', next: '@string_single' }],

        // Comments
        [/\/\/.*$/, 'comment'],

        // Brackets
        [/[{}()\[\]]/, 'delimiter.bracket'],

        // Operators
        [/[=+\-*\/]/, 'operator'],
      ],

      string_double: [
        [/[^\\"]+/, 'string'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        [/\\./, 'string.escape']
      ],

      string_single: [
        [/[^\\']+/, 'string'],
        [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        [/\\./, 'string.escape']
      ]
    }
  })

  // Define theme rules for the tokens
  monaco.editor.defineTheme('darg-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'cba6f7' },    // Mauve
      { token: 'constant', foreground: '89b4fa' },   // Blue  
      { token: 'function', foreground: '94e2d5' },   // Teal
      { token: 'string', foreground: 'a6e3a1' },     // Green
      { token: 'number', foreground: 'fab387' },     // Peach
      { token: 'comment', foreground: '7f849c' },    // Overlay0
      { token: 'operator', foreground: '89dceb' },   // Sky
      { token: 'delimiter.bracket', foreground: 'f5c2e7' }, // Pink
      { token: 'string.escape', foreground: 'f5c2e7' }, // Pink
    ],
    colors: {
      'editor.background': '#1e1e2e',
      'editor.foreground': '#cdd6f4',
      'editor.lineHighlightBackground': '#313244',
      'editorLineNumber.foreground': '#7f849c',
      'editorLineNumber.activeForeground': '#cdd6f4',
      'editor.selectionBackground': '#45475a',
      'editor.inactiveSelectionBackground': '#313244',
      'editorIndentGuide.background': '#313244',
      'editorIndentGuide.activeBackground': '#45475a',
    }
  })
} 