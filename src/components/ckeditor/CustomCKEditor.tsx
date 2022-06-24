/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from '@ckeditor/ckeditor5-inspector'

import CustomClassicEditor from './CustomClassicEditor'
import CustomCKEditorSkeleton from './CustomCKEditorSkeleton'

export interface CustomCKEditorProps {
  id: string
  initialData: string | undefined
}

const CustomCKEditor = ({
  id,
  initialData: initialDataProp,
}: CustomCKEditorProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [customEditor, setCustomEditor] = useState<any>()
  const [editorData, setEditorData] = useState(initialDataProp)

  console.log({
    customEditor,
    dataUi: customEditor?.ui?.editor?.getData(),
  })

  const handleEditorDataChange = (event: any, editor: any) => {
    const newData = editor.getData()
    setEditorData(newData)
  }

  const handleEditorReady = (editor: any) => {
    setCustomEditor(editor)

    setIsLoading(false)
    // console.log({
    //   get: editor.data.get(),
    //   getData: editor.getData(),
    // })
    setEditorData(editor.getData())

    if (process.env.NODE_ENV === 'development') {
      CKEditorInspector.attach(editor)
    }
  }

  // Do not render the <CKEditor /> component before the layout is ready.
  // if (!editorData && initialDataProp) {
  //   return (
  //     <CustomCKEditorSkeleton />
  //   )
  // }

  return (
    <>
      {isLoading && <CustomCKEditorSkeleton />}
      <CKEditor
        data={editorData}
        editor={CustomClassicEditor}
        id={id}
        onBlur={(event, editor) => {
          console.log('[BLUR]', event, editor)
        }}
        onChange={handleEditorDataChange}
        onFocus={(event, editor) => {
          console.log('[FOCUS]', event, editor)
        }}
        onReady={handleEditorReady}
      />
    </>
  )
}

export default CustomCKEditor

