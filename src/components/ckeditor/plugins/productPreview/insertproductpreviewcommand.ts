// @ts-ignore
import Command from '@ckeditor/ckeditor5-core/src/command'

export default class InsertProductPreviewCommand extends Command {
  execute(id: string) {
    // @ts-ignore
    this.editor.model.change(writer => {
      // Insert <productPreview id="...">*</productPreview> at the current selection position
      // in a way which will result in creating a valid model structure.
      // @ts-ignore
      this.editor.model.insertContent(writer.createElement('productPreview', { id }))
    })
  }

  refresh() {
    // @ts-ignore
    const { model } = this.editor
    const { selection } = model.document
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'productPreview')
    // @ts-ignore
    this.isEnabled = allowedIn !== null
  }
}
