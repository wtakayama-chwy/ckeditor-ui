// Plugins
declare module '@ckeditor/ckeditor5-basic-styles/src/bold'
declare module '@ckeditor/ckeditor5-basic-styles/src/italic'
declare module '@ckeditor/ckeditor5-essentials/src/essentials'
declare module '@ckeditor/ckeditor5-paragraph/src/paragraph'
declare module '@ckeditor/ckeditor5-list/src/todolist'
declare module '@ckeditor/ckeditor5-heading/src/heading'
declare module '@ckeditor/ckeditor5-image/src/image'
declare module '@ckeditor/ckeditor5-link/src/link'
declare module '@ckeditor/ckeditor5-list/src/list'
declare module '@ckeditor/ckeditor5-table/src/table'
declare module '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport'
declare module '@ckeditor/ckeditor5-html-embed/src/htmlembed'

// Editor
declare module '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  import Event from '@ckeditor/ckeditor5-utils/src/eventinfo'
  import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig'
  import * as React from 'react'

  const CKEditor: React.FunctionComponent<{
    config?: EditorConfig
    data?: string
    disabled?: boolean
    editor: typeof ClassicEditor
    id?: string
    onBlur?: (event: Event, editor: ClassicEditor) => void
    onChange?: (event: Event, editor: ClassicEditor) => void
    onError?: (event: Event, editor: ClassicEditor) => void
    onFocus?: (event: Event, editor: ClassicEditor) => void
    onReady?: (editor: ClassicEditor) => void
  }>
  export { CKEditor }
}
declare module '@ckeditor/ckeditor5-core/src/command'
declare module '@ckeditor/ckeditor5-core/src/plugin'
declare module '@ckeditor/ckeditor5-inspector'

// Widgets
declare module '@ckeditor/ckeditor5-widget/src/utils'
declare module '@ckeditor/ckeditor5-widget/src/widget'
declare module '@ckeditor/ckeditor5-ui/src/button/buttonview'
