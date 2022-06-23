/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

// There're basically 2 types of conversion, upcast and downcast.
// 1. Upcast is when you're loading data to your editor
// 2. Downcast is when you're making changes the editor.
// https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/conversion/intro.html

// https://github.com/ckeditor/ckeditor5/issues/11704 - Typescript status

// type GenericItems = '$root' | '$container' | '$block' | '$blockObject' | '$inlineObject' | '$text'

export default class CustomSignature extends Plugin {
  static get requires() {
    return [Widget]
  }

  init() {
    this._defineSchema()
    this._defineConverters()
  }

  _defineSchema() {
    const { schema } = this.editor.model

    // table
    schema.register('signature', {
      // Whether an item is "self-contained" and should be treated as a whole. By default it sets isLimit true
      // which means that the element cannot be split by Enter
      isObject: true,
      // Inherits "allowed in" from other items, in this case $block
      allowWhere: '$block',
      allowAttributes: ['style'],
    })

    // table row
    schema.register('signatureRow', {
      // Whether the element can be split by Enter. So, actions that happen inside this element are limited to its content.
      isLimit: true,
      allowIn: 'signature',
      // Inherits "allowed children" from other items, in this case $block
      allowContentOf: '$block',
    })

    // table cell label
    schema.register('signatureLabel', {
      isLimit: true,
      allowIn: 'signatureRow',
      allowContentOf: '$block',
      allowAttributes: ['style'],
    })

    // table cell signature
    schema.register('signatureSignature', {
      isLimit: true,
      allowIn: 'signatureRow',
      allowContentOf: '$block',
      allowAttributes: ['style'],
    })
  }

  _defineConverters() {
    const { conversion } = this.editor
    // const renderSignature = config.get('signature').signatureRender

    // UPCAST
    conversion.for('upcast').elementToElement({
      model: (viewElement: any, { writer: modelWriter }: any) => {
        const signatureModel = modelWriter.createElement('signature', {
          style: viewElement.getAttribute('style'),
        })
        return signatureModel
      },
      view: {
        name: 'table',
        classes: 'SIGNATURE',
      },
      converterPriority: 'high',
    })

    conversion.for('upcast').elementToElement({
      model: 'signatureRow',
      view: {
        name: 'tr',
      },
      converterPriority: 'high',
    })

    conversion.for('upcast').elementToElement({
      model: (viewElement: any, { writer: modelWriter }: any) => {
        const signatureLabelModel = modelWriter.createElement('signatureLabel', {
          style: viewElement.getAttribute('style'),
        })
        return signatureLabelModel
      },
      view: {
        name: 'td',
        classes: 'SIGNATURE_label',
      },
      converterPriority: 'high',
    })

    conversion.for('upcast').elementToElement({
      model: (viewElement: any, { writer: modelWriter }: any) => {
        const signatureLabelModel = modelWriter.createElement('signatureSignature', {
          style: viewElement.getAttribute('style'),
        })
        return signatureLabelModel
      },
      view: {
        name: 'td',
        classes: 'SIGNATURE_signature',
      },
      converterPriority: 'high',
    })

    // DATA DOWNCAST
    conversion.for('downcast').elementToElement({
      model: 'signature',
      view: (modelElement: any, { writer: viewWriter }: any) => {
        const tableElement = viewWriter.createContainerElement('table', {
          class: 'SIGNATURE',
          style: modelElement.getAttribute('style'),
        })
        return tableElement
      },
      converterPriority: 'high',
    })

    conversion.for('downcast').elementToElement({
      model: 'signatureRow',
      view: {
        name: 'tr',
      },
      converterPriority: 'high',
    })

    conversion.for('downcast').elementToElement({
      model: 'signatureLabel',
      view: (modelElement: any, { writer: viewWriter }: any) => {
        const tableElement = viewWriter.createContainerElement('td', {
          class: 'SIGNATURE_label',
          style: modelElement.getAttribute('style'),
        })
        return tableElement
      },
      converterPriority: 'high',
    })

    conversion.for('downcast').elementToElement({
      model: 'signatureSignature',
      view: (modelElement: any, { writer: viewWriter }: any) => {
        const tableElement = viewWriter.createContainerElement('td', {
          class: 'SIGNATURE_signature',
          style: modelElement.getAttribute('style'),
        })
        return tableElement
      },
      converterPriority: 'high',
    })
  }
}

// type View = string | {
//   classes?: string | string[]
//   converterPriority?: 'high' | 'highest'
//   name: string
// }

// type Model = string

// function convertData({
//   conversion,
//   type,
//   model,
//   view,
//   override = true,
// }: {
//   conversion: any
//   model: Model
//   override: boolean
//   type: 'editingDowncast' | 'upcast' | 'dataDowncast' | 'downcast'
//   view: View
// }) {
//   conversion.for(type).elementToElement({
//     model,
//     view,
//     ...(override ? { converterPriority: 'high' } : {}),
//   })

// convertData()

