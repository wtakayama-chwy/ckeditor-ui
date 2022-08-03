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
import { APIGW_PRELUDE_AUTH_TOKEN } from '../../configs'

// import ProductList from './plugins/productPreview/ProductList'
export type Note = {
  channelId: string
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
  bundleVersion: string | undefined
  channelId: string | undefined
  id: string | undefined
  tokenUrl: string | undefined
  webSocketUrl: string | undefined
}

const CustomCKEditor = ({
  id,
  channelId,
  bundleVersion,
  tokenUrl,
  webSocketUrl,
}: CustomCKEditorProps) => {
  const [customEditor, setCustomEditor] = useState<any>()
  // const [editorData, setEditorData] = useState(initialDataProp)

  const handleEditorDataChange = (event: any, editor: any) => {
    // setEditorData(editor.getData())
    // console.log('editorData', editorData)
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

  console.log('tokenUrl:', tokenUrl)
  console.log('webSocketUrl:', webSocketUrl)
  console.log('channelId:', channelId)
  console.log('bundleVersion:', bundleVersion)

  return (
    <>
      <CKEditor
        config={{
          cloudServices: {
            tokenUrl: () => new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest()
              xhr.withCredentials = true

              xhr.open('GET', `${tokenUrl}`)
              xhr.setRequestHeader('Authorization', `Bearer ${APIGW_PRELUDE_AUTH_TOKEN}`)
              xhr.setRequestHeader('Access-Control-Allow-Origin', '*')

              xhr.addEventListener('load', () => {
                const statusCode = xhr.status
                const xhrResponse = xhr.response
                console.log('response:', xhrResponse)

                if (statusCode < 200 || statusCode > 299) {
                  return reject(new Error('Cannot download a new token!'))
                }

                return resolve(xhrResponse)
              })

              xhr.addEventListener('error', () => reject(new Error('Network error')))
              xhr.addEventListener('abort', () => reject(new Error('Abort')))

              xhr.send()
            }),
            webSocketUrl,
            bundleVersion,
          },
          collaboration: {
            channelId,
          },
          toolbar: [
            'heading',
            '|', 'bold', 'italic', 'link',
            'bulletedList', 'numberedList',
            '|', 'insertTable', 'undo', 'redo',
            'comment', 'trackChanges', '|', 'revisionHistory'],
        }}
        editor={CustomClassicEditor}
        id={id}
        sidebar={document.querySelector('.sidebar')}
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

