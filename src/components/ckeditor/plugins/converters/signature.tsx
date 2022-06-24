/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { v4 as uuid } from 'uuid'

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils'

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
  }

  _defineConverters() {
    const { conversion, config } = this.editor
    const renderSignature = config.get('signature').signatureRender
    const elementUniqueId = `SIGNATURE_${uuid()}`

    // UPCAST
    conversion.for('upcast').elementToElement({
      model: (viewElement: any, { writer: modelWriter }: any) => {
        const signatureModel = modelWriter.createElement('signature', {
          style: viewElement?.getAttribute('style'),
          id: elementUniqueId,
        })
        return signatureModel
      },
      view: {
        name: 'table',
        classes: 'SIGNATURE',
      },
      converterPriority: 'high',
    })

    // DATA DOWNCAST
    conversion.for('dataDowncast').elementToStructure({
      model: 'signature',
      view: (modelElement: any, { writer: viewWriter }: any) => {
        const tableCellLabelElement = viewWriter.createContainerElement('td', {
          class: 'SIGNATURE_label',
          style: 'border: 1px solid #edecec; padding: 8px',
        }, ['Signature'])

        const tableCellSignatureElement = viewWriter.createContainerElement('td', {
          class: 'SIGNATURE_signature',
          style: 'border: 1px solid #edecec; padding: 8px; width: 200px',
        }, [''])

        const tableRowElement = viewWriter.createContainerElement('tr', null, [
          tableCellLabelElement,
          tableCellSignatureElement,
        ])

        const tableWrapperElement = viewWriter.createContainerElement('table', {
          class: 'SIGNATURE',
          style: modelElement.getAttribute('style'),
        }, [tableRowElement])

        return tableWrapperElement
      },
      converterPriority: 'high',
    })

    // EDITING DOWNCAST
    conversion.for('editingDowncast').elementToElement({
      model: 'signature',
      view: (modelElement: any, { writer: viewWriter }: any) => {
        const tableElement = viewWriter.createContainerElement('table', {
          class: 'SIGNATURE',
          style: modelElement.getAttribute('style'),
        })

        const reactWrapper = viewWriter.createRawElement('div', {
          classes: 'signature__react-wrapper',
        }, (domElement: any) => {
          renderSignature({
            id: elementUniqueId,
            signatureDate: '2022-06-24',
            signerLicense: 'L-0314',
            signerName: 'William Takayama',
            // eslint-disable-next-line max-len
            signatureString: 'https://www.pngitem.com/pimgs/m/332-3322454_fake-signature-png-fake-signatures-line-art-transparent.png',
          }, domElement)
        })

        viewWriter.insert(viewWriter.createPositionAt(tableElement, 0), reactWrapper)

        return toWidget(tableElement, viewWriter, { label: 'signature view widget' })
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

// convertData({
//   conversion: this.editor.conversion,
//   type: 'upcast',
//   model: 'signatureSignature',
//   view:
// })

// export function defineSchema(schema: any) {
//   // table
//   schema.register('signature', {
//     // Whether an item is "self-contained" and should be treated as a whole. By default it sets isLimit true
//     // which means that the element cannot be split by Enter
//     isObject: true,
//     // Inherits "allowed in" from other items, in this case $block
//     allowWhere: '$block',
//     allowAttributes: ['style'],
//   })

//   // table row
//   schema.register('signatureRow', {
//     // Whether the element can be split by Enter. So, actions that happen inside this element are limited to its content.
//     isLimit: true,
//     allowIn: 'signature',
//     // Inherits "allowed children" from other items, in this case $block
//     allowContentOf: '$block',
//   })

//   // table cell label
//   schema.register('signatureLabel', {
//     isLimit: true,
//     allowIn: 'signatureRow',
//     allowContentOf: '$block',
//     allowAttributes: ['style'],
//   })

//   // table cell signature
//   schema.register('signatureSignature', {
//     isLimit: true,
//     allowIn: 'signatureRow',
//     allowContentOf: '$block',
//     allowAttributes: ['style'],
//   })
// }

// export function convertData(conversion: any) {
//   // UPCAST
//   conversion.for('upcast').elementToElement({
//     model: (viewElement: any, { writer: modelWriter }: any) => {
//       const signatureModel = modelWriter.createElement('signature', {
//         style: viewElement?.getAttribute('style'),
//       })
//       return signatureModel
//     },
//     view: {
//       name: 'table',
//       classes: 'SIGNATURE',
//     },
//     converterPriority: 'high',
//   })

//   conversion.for('upcast').elementToElement({
//     model: 'signatureRow',
//     view: {
//       name: 'tr',
//     },
//     converterPriority: 'high',
//   })

//   conversion.for('upcast').elementToElement({
//     model: (viewElement: any, { writer: modelWriter }: any) => {
//       const signatureLabelModel = modelWriter.createElement('signatureLabel', {
//         style: viewElement?.getAttribute('style'),
//       })
//       return signatureLabelModel
//     },
//     view: {
//       name: 'td',
//       classes: 'SIGNATURE_label',
//     },
//     converterPriority: 'high',
//   })

//   conversion.for('upcast').elementToElement({
//     model: (viewElement: any, { writer: modelWriter }: any) => {
//       const signatureLabelModel = modelWriter.createElement('signatureSignature', {
//         style: viewElement?.getAttribute('style'),
//       })
//       return signatureLabelModel
//     },
//     view: {
//       name: 'td',
//       classes: 'SIGNATURE_signature',
//     },
//     converterPriority: 'high',
//   })

//   // DATA DOWNCAST
//   conversion.for('downcast').elementToElement({
//     model: 'signature',
//     view: (modelElement: any, { writer: viewWriter }: any) => {
//       const tableElement = viewWriter.createContainerElement('table', {
//         class: 'SIGNATURE',
//         style: modelElement.getAttribute('style'),
//       })
//       return tableElement
//     },
//     converterPriority: 'high',
//   })

//   conversion.for('downcast').elementToElement({
//     model: 'signatureRow',
//     view: {
//       name: 'tr',
//     },
//     converterPriority: 'high',
//   })

//   conversion.for('downcast').elementToElement({
//     model: 'signatureLabel',
//     view: (modelElement: any, { writer: viewWriter }: any) => {
//       const tableElement = viewWriter.createContainerElement('td', {
//         class: 'SIGNATURE_label',
//         style: modelElement.getAttribute('style'),
//       })
//       return tableElement
//     },
//     converterPriority: 'high',
//   })

//   conversion.for('downcast').elementToElement({
//     model: 'signatureSignature',
//     view: (modelElement: any, { writer: viewWriter }: any) => {
//       const tableElement = viewWriter.createContainerElement('td', {
//         class: 'SIGNATURE_signature',
//         style: modelElement.getAttribute('style'),
//       })
//       return tableElement
//     },
//     converterPriority: 'high',
//   })
// }
