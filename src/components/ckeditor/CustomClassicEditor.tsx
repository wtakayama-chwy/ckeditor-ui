/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */

// Editor
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// import EditorWatchdog from '@ckeditor/ckeditor5-watchdog/src/editorwatchdog'

// import CollaborativeEditing
import RealTimeCollaborativeEditing from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting'
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices'

/*
// The following plugins enable real-time collaborative comments.
// You do not need to import them if you do not want this integration.
import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments';

// The following plugins enable real-time collaborative track changes and are optional.
// They depend on the `Comments` and `RealTimeCollaborativeComments` from above, so make sure to include
// them in the editor plugins if you want to integrate the real-time collaborative track changes.
// You do not need to import them if you do not want this integration.
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges';

// The following plugins enable revision history for real-time collaboration.
// You do not need to import them if you do not want this integration.
import RevisionHistory from '@ckeditor/ckeditor5-revision-history/src/revisionhistory';
import RealTimeCollaborativeRevisionHistory from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativerevisionhistory';

// The following plugin enables the users presence list and is optional.
// You do not need to import it if you do not want to integrate the user list.
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist';
*/

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
class CustomClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
CustomClassicEditor.builtinPlugins = [
  Bold,
  CloudServices,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  Image,
  Italic,
  Link,
  List,
  Paragraph,
  RealTimeCollaborativeEditing,
  Table,
  TodoList,
  CustomSignature,
  // Comments,
  // RealTimeCollaborativeComments,
  // TrackChanges,
  // RealTimeCollaborativeTrackChanges,
  // RevisionHistory,
  // RealTimeCollaborativeRevisionHistory,
  // PresenceList
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
