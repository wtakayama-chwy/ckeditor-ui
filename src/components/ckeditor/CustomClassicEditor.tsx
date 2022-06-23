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

// Custom Plugins
import CustomSignature from './plugins/converters/signature'

import i18n, { LanguageCode } from '../../locales/i18n'
import ImportNotesTemplate from './plugins/import-notes-template/importNotesTemplate'

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
  // Custom plugins
  CustomSignature,
  ImportNotesTemplate,
]

// CustomClassicEditor configuration.
CustomClassicEditor.defaultConfig = {
  table: {
    customClass: ['SIGNATURE'],
  },
  toolbar: {
    items: [
      'heading',
      'importNotesTemplate', // this will be custom plugin
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
  // as they work with MVC pattern and have their own models
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
}

export default CustomClassicEditor
