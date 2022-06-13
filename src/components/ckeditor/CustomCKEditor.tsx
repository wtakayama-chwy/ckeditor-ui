/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react'

// @ts-ignore
// import Context from '@ckeditor/ckeditor5-core/src/context'
// @ts-ignore
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Divider, Grid, Skeleton } from '@mui/material'

// Editor Plugins
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import CustomClassicEditor from './CustomClassicEditor'

type EditorToolbarNames =
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

type EditorConfig = {
  // When passing plugins we must use a personal build
  plugins?: any[]
  toolbar: EditorToolbarNames[] | {
    items: EditorToolbarNames[]
    shouldNotGroupWhenFull: boolean
  }
}

export interface CustomCKEditorProps {
  config?: EditorConfig
  id: string
  initialData: string | null
}

const BasicConfig: EditorConfig = {
  // plugins: [Bold],
  plugins: [TodoList],
  toolbar: [
    'heading',
    'code', // this will be custom plugin
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'todoList',
    'insertTable',
    'uploadImage',
    '|',
    'undo',
    'redo',
    'revisionHistory',
  ],
}

const CustomCKEditor = ({
  config = BasicConfig,
  id,
  initialData: initialDataProp,
}: CustomCKEditorProps) => {
  const [customEditor, setCustomEditor] = useState<any>()
  const [initialData, setInitialData] = useState(initialDataProp)

  console.log({ customEditor })

  // Do not render the <CKEditor /> component before the layout is ready.
  if (!initialData) {
    return (
      <Grid width="100%">
        <Skeleton height={38} variant="rectangular" width="100%" />
        <Divider />
        <Skeleton height={118} variant="rectangular" width="100%" />
      </Grid>
    )
  }

  return (
    <>
      <CKEditor
        config={config}
        data={initialData}
        editor={CustomClassicEditor}
        id={id}
        onBlur={(event: any, editor: any) => {
          console.log('[BLUR]', event, editor)
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData()
          setInitialData(initialDataProp || '')
          console.log('[CHANGE]', { event, editor, data })
        }}
        onFocus={(event: any, editor: any) => {
          console.log('[FOCUS]', event, editor)
        }}
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
          setCustomEditor(editor)
        }}
      />
    </>
  )
}

export default CustomCKEditor

