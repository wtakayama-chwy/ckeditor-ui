/* eslint-disable max-len */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'

// In order to add more plugins, including custom ones we need to rebuild the editor. And there's 3 main ways to do that:
// check more here: https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/react.html#customizing-the-builds
class CustomClassicEditor extends ClassicEditor {}

// Plugins to include in the build.
CustomClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  TodoList,
]

// CustomClassicEditor configuration.
CustomClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'todoList',
      'undo',
      'redo',
    ],
  },
  language: 'en',
}

export default CustomClassicEditor

