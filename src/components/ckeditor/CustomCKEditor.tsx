/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from '@ckeditor/ckeditor5-inspector'

// @ts-ignore
// Editor - developed from online builder by Tulio
import CustomClassicEditor from 'ckeditor5-custom-build/build/ckeditor'

// CustomClassicEditor - developed from source by William
// import CustomClassicEditor from './CustomClassicEditor'

import CustomCKEditorSkeleton from './CustomCKEditorSkeleton'
import { CKCS_BUNDLE_VERSION, CKCS_TOKEN_URL, CKCS_WSS_URL } from '../../configs'

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
  channelId: string | undefined
  id: string
  initialData: Note | null
}

const CustomCKEditor = ({
  id,
  initialData: initialDataProp,
  channelId,
}: CustomCKEditorProps) => {
  const [customEditor, setCustomEditor] = useState<any>()
  const [editorData, setEditorData] = useState(initialDataProp)

  const handleEditorDataChange = (event: any, editor: any) => {
    // setEditorData(editor.getData())
    console.log('editorData', editorData)
    console.log({ event, editor })
  }

  const handleEditorReady = (editor: any) => {
    setCustomEditor(editor)
    // setEditorData(editor.getData())
    CKEditorInspector.attach(editor)
    console.log('Editor is ready to use!', editor)
  }

  // Do not render the <CKEditor /> component before the layout is ready.
  if (!channelId) {
    console.log('Editor is NOT ready to use!')
    console.log('channelId:', channelId)
    return (
      <CustomCKEditorSkeleton />
    )
  }

  const tokenUrl = CKCS_TOKEN_URL
  const webSocketUrl = CKCS_WSS_URL
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
            bundleVersion: CKCS_BUNDLE_VERSION,
          },
          collaboration: {
            channelId,
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

