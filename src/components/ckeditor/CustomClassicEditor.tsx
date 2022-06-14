/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
// Editor
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

// Languages
import '@ckeditor/ckeditor5-build-classic/build/translations/pt-br'
import '@ckeditor/ckeditor5-build-classic/build/translations/es'

// Plugins
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Image from '@ckeditor/ckeditor5-image/src/image'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import Table from '@ckeditor/ckeditor5-table/src/table'
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport'
// import ReactDOM from 'react-dom'
import CustomSignature from './plugins/converters/signature'

// CKEditor plugin implementing a product widget to be used in the editor content.
// import ProductPreviewEditing from './plugins/productPreview/productpreviewediting'
// import ProductPreview from './plugins/productPreview/ProductPreview'

import i18n, { LanguageCode } from '../../locales/i18n'

const CKEditorLanguagesMap = {
  [LanguageCode['en-US']]: 'en', // it comes by default in English
  [LanguageCode['es-ES']]: 'es',
  [LanguageCode['pt-BR']]: 'pt-br',
}

// In order to add more plugins, including custom ones we need to rebuild the editor. And there's 3 main ways to do that:
// check more here: https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/react.html#customizing-the-builds
class CustomClassicEditor extends ClassicEditor {}

// Plugins to include in the build.
CustomClassicEditor.builtinPlugins = [
  Bold,
  Essentials,
  Heading,
  Image,
  Italic,
  Link,
  List,
  Paragraph,
  Table,
  TodoList,
  GeneralHtmlSupport,
  CustomSignature,
  // ProductPreviewEditing,
]

// CustomClassicEditor configuration.
CustomClassicEditor.defaultConfig = {
  toolbar: {
    items: [
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
  },
  language: CKEditorLanguagesMap[i18n.language],
  // This is important to avoid CKEditor removing/replacing some tags and styles
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
  // The configuration of the Products plugin. It specifies a function that will allow
  // the editor to render a React <ProductPreview> component inside a product widget.
  // products: {
  //   productRenderer: (id: string, domElement: any) => {
  //     const product = [
  //       {
  //         id: 1,
  //         name: 'Colors of summer in Poland',
  //         price: '$1500',
  //         image: 'product1.jpg',
  //       },
  //       {
  //         id: 2,
  //         name: 'Mediterranean sun on Malta',
  //         price: '$1899',
  //         image: 'product2.jpg',
  //       },
  //       {
  //         id: 3,
  //         name: 'Tastes of Asia',
  //         price: '$2599',
  //         image: 'product3.jpg',
  //       },
  //       {
  //         id: 4,
  //         name: 'Exotic India',
  //         price: '$2200',
  //         image: 'product4.jpg',
  //       },
  //     ].find((prod: any) => prod.id === id)

  //     ReactDOM.render(
  //       <ProductPreview id={id} {...product} />,
  //       domElement,
  //     )
  //   },
  // },
}

export default CustomClassicEditor

