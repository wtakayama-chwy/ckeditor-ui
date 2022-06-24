/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from '@ckeditor/ckeditor5-inspector'

import CustomClassicEditor from './CustomClassicEditor'

import CustomCKEditorSkeleton from './CustomCKEditorSkeleton'

// import ProductList from './plugins/productPreview/ProductList'
export type Note = {
  channelId: string
  content: string
  id: string
}

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
  initialData: Note | null
}

const CustomCKEditor = ({
  id,
  initialData: initialDataProp,
}: CustomCKEditorProps) => {
  const [customEditor, setCustomEditor] = useState<any>()
  const [editorData, setEditorData] = useState(initialDataProp)

  const handleEditorDataChange = (event: any, editor: any) => {
    setEditorData(editor.getData())
    console.log('editorData', editorData)
    console.log({ event, editor })
  }

  const handleEditorReady = (editor: any) => {
    setCustomEditor(editor)
    setEditorData(editor.getData())
    CKEditorInspector.attach(editor)
    console.log('Editor is ready to use!', editor)
  }

  // Do not render the <CKEditor /> component before the layout is ready.
  if (!editorData) {
    console.log('Editor is NOT ready to use!')
    return (
      <CustomCKEditorSkeleton />
    )
  }

  // const tokenUrl = 'https://89797.cke-cs.com/token/dev/47d7448fad15f7217683546671dc008cc51d8f8ccfba95d70427d30d6348?limit=10'
  const tokenUrl = 'https://3a79-2804-14c-65a7-8267-d8bd-fde8-1a24-55ed.sa.ngrok.io/ckcs/token'
  const webSocketUrl = 'wss://89797.cke-cs.com/ws'
  const personId = 1

  return (
    <>
      <CKEditor
        config={{
          cloudServices: {
            tokenUrl: () => new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest()

              xhr.open('GET', `${tokenUrl}?personId=${personId}`)

              xhr.addEventListener('load', () => {
                const statusCode = xhr.status
                const xhrResponse = xhr.response

                if (statusCode < 200 || statusCode > 299) {
                  return reject(new Error('Cannot download a new token!'))
                }

                return resolve(xhrResponse)
              })

              xhr.addEventListener('error', () => reject(new Error('Network error')))
              xhr.addEventListener('abort', () => reject(new Error('Abort')))

              xhr.setRequestHeader('Access-Control-Allow-Origin', '*')

              xhr.send()
            }),
            webSocketUrl,
          },
          collaboration: {
            channelId: editorData.channelId,
          },
        }}
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
    </>
  )
}

export default CustomCKEditor

