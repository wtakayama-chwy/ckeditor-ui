import Command from '@ckeditor/ckeditor5-core/src/command'
import DOMPurify from 'dompurify'

import i18n from '../../../../locales/i18n'

// function createImportNotesTemplate(writer: any) {
//   const importNotesTemplate = writer.createElement('importNotesTemplate')
//   const importNotesTemplateTitle = writer.createElement('importNotesTemplateTitle')
//   const importNotesTemplateDescription = writer.createElement('importNotesTemplateDescription')

//   writer.append(importNotesTemplateTitle, importNotesTemplate)
//   writer.append(importNotesTemplateDescription, importNotesTemplate)

//   // There must be at least one paragraph for the description to be editable.
//   // See https://github.com/ckeditor/ckeditor5/issues/1464.
//   writer.appendElement('paragraph', importNotesTemplateDescription)

//   return importNotesTemplate
// }

export default class InsertImportNotesTemplateCommand extends Command {
  // constructor() {
  //   super()
  //   this.editor = editor
  // }

  execute() {
    // eslint-disable-next-line no-alert
    const htmlNotesTemplate = prompt(i18n.t('Common:NOTES_TEMPLATE'))

    if (htmlNotesTemplate) {
      // Avoid malicious scripts
      const sanitizedHtmlNotesTemplate = DOMPurify.sanitize(htmlNotesTemplate)

      const viewFragment = this.editor.data.processor.toView(sanitizedHtmlNotesTemplate)
      const modelFragment = this.editor.data.toModel(viewFragment)
      this.editor.model.insertContent(modelFragment)
    }

    // this.editor.model.change((writer: any) => {
    //   // Insert <simpleBox>*</simpleBox> at the current selection position
    //   // in a way that will result in creating a valid model structure.
    //   this.editor.model.insertContent(createImportNotesTemplate(writer))
    // })
  }

  // refresh() {
  //   const { model } = this.editor
  //   const { selection } = model.document
  //   const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'importNotesTemplate')

  //   this.isEnabled = allowedIn !== null
  // }
}
