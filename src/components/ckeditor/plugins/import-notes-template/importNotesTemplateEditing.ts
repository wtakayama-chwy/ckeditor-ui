/* eslint-disable no-underscore-dangle */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'
// import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils'

import InsertImportNotesTemplateCommand from './insertImportNotesTemplateCommand'

export default class ImportNotesTemplateEditing extends Plugin {
  static get requires() {
    return [Widget]
  }

  init() {
    // this._defineSchema()
    // this._defineConverters()

    // @ts-ignore
    this.editor.commands.add('insertImportNotesTemplate', new InsertImportNotesTemplateCommand(this.editor))
  }

  // _defineSchema() {
  //   const { schema } = this.editor.model

  //   schema.register('importNotesTemplate', {
  //     // Behaves like a self-contained object (e.g. an image).
  //     isObject: true,
  //     // Allow in places where other blocks are allowed (e.g. directly in the root).
  //     allowWhere: '$block',
  //   })
  // }

  // _defineConverters() {
  //   const { conversion } = this.editor

  //   // <importNotesTemplate> -> upcast | dataDowncast | editingDowncast (model -> view | view -> model)
  //   conversion.for('upcast').elementToElement({
  //     model: 'importNotesTemplate',
  //     // view: (modelElement: any, { writer: viewWriter }: any) => {
  //     //   const noteTemplate = viewWriter.createElement(modelElement)
  //     //   return toWidget(noteTemplate, viewWriter)
  //     // },
  //     view: {
  //       name: 'section',
  //       classes: ['import-notes-template'],
  //     },
  //   })

  //   conversion.for('dataDowncast').elementToElement({
  //     model: 'importNotesTemplate',
  //     view: {
  //       name: 'section',
  //       classes: ['import-notes-template'],
  //     },
  //   })

  //   conversion.for('editingDowncast').elementToElement({
  //     model: 'importNotesTemplate',
  //     view: (modelElement: any, { writer: viewWriter }: any) => {
  //       const section = viewWriter.createContainerElement('section', { class: 'import-notes-template' })

  //       return toWidget(section, viewWriter, { label: 'import notes template widget' })
  //     },
  //   })
  // }
}
