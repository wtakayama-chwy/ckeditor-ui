import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import ImportNotesTemplateUI from './importNotesTemplateUI'
import ImportNotesTemplateEditing from './importNotesTemplateEditing'

export default class ImportNotesTemplate extends Plugin {
  static get requires() {
    return [ImportNotesTemplateEditing, ImportNotesTemplateUI]
  }
}
