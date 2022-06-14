/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from '@ckeditor/ckeditor5-inspector'

import CustomClassicEditor from './CustomClassicEditor'
import CustomCKEditorSkeleton from './CustomCKEditorSkeleton'
// import ProductList from './plugins/productPreview/ProductList'

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
  id: string
  initialData: string | null
}

const CustomCKEditor = ({
  id,
  initialData: initialDataProp,
}: CustomCKEditorProps) => {
  const [customEditor, setCustomEditor] = useState<any>()
  const [editorData, setEditorData] = useState(initialDataProp)

  const handleEditorDataChange = (event: any, editor: any) => {
    setEditorData(editor.getData())
  }

  const handleEditorReady = (editor: any) => {
    setCustomEditor(editor)
    setEditorData(editor.getData())
    CKEditorInspector.attach(editor)
  }

  // Do not render the <CKEditor /> component before the layout is ready.
  if (!editorData) {
    return (
      <CustomCKEditorSkeleton />
    )
  }

  return (
    <>
      <CKEditor
        data={editorData}
        editor={CustomClassicEditor}
        id={id}
        onBlur={(event: any, editor: any) => {
          console.log('[BLUR]', event, editor)
        }}
        onChange={handleEditorDataChange}
        onFocus={(event: any, editor: any) => {
          console.log('[FOCUS]', event, editor)
        }}
        onReady={handleEditorReady}
      />
      {/* <ProductList
        key="product-list"
        products={[
          {
            id: 1,
            name: 'Colors of summer in Poland',
            price: '$1500',
            image: 'product1.jpg',
          },
          {
            id: 2,
            name: 'Mediterranean sun on Malta',
            price: '$1899',
            image: 'product2.jpg',
          },
          {
            id: 3,
            name: 'Tastes of Asia',
            price: '$2599',
            image: 'product3.jpg',
          },
          {
            id: 4,
            name: 'Exotic India',
            price: '$2200',
            image: 'product4.jpg',
          },
        ]}
        onClick={(tid: any) => {
          customEditor.execute('insertProduct', tid)
          customEditor.editing.view.focus()
        }}
      /> */}

    </>
  )
}

export default CustomCKEditor

