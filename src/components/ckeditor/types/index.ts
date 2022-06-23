
export type EditorToolbarNames =
'heading' |
'fontfamily' |
'fontsize' |
'alignment' |
'fontColor' |
'fontBackgroundColor' |
'strikethrough' |
'underline' |
'subscript' |
'superscript' |
'link' |
'outdent' |
'indent' |
'bulletedList' |
'numberedList' |
'todoList' |
'code' |
'codeBlock' |
'insertTable' |
'uploadImage' |
'blockQuote' |
'undo' |
'redo' |
'bold' |
'italic' |
'revisionHistory' |
'|'

export type EditorConfig = {
// When passing plugins we must use a personal build
  plugins?: any[]
  toolbar: EditorToolbarNames[] | {
    items: EditorToolbarNames[]
    shouldNotGroupWhenFull: boolean
  }
}
