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

// function getConvertedData(editor: any) {
//   const initialData = editor.getData()

//   editor.conversion.for('upcast').elementToElement({
//     view: {
//       name: 'td',
//       classes: 'SIGNATURE_label',
//     },
//     model: (viewElement: any, { writer }: any) => {
//       // eslint-disable-next-line no-debugger
//       debugger
//       const a = ''
//       return writer.createElement('heading', { level: viewElement.getAttribute('data-level') })
//     },
//   })

//   return initialData
// }

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
    // setEditorData(getConvertedData(editor))

    if (process.env.NODE_ENV === 'development') {
      CKEditorInspector.attach(editor)
    }
  }

  // Do not render the <CKEditor /> component before the layout is ready.
  if (!editorData && initialDataProp) {
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

