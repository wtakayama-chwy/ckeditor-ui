/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
// import React from 'react'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
// @ts-ignore
import Widget from '@ckeditor/ckeditor5-widget/src/widget'

// There're 2 types of conversion, upcast and downcast. Upcast is when you're loading data to your editor
// and downcast is when you're making changes the editor.
// https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/conversion/intro.html

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

    schema.register('signatureView', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',

      // Each product preview has an ID. A unique ID tells the application which
      // product it represents and makes it possible to render it inside a widget.
      // allowAttributes: ['id'],
    })
  }

  _defineConverters() {
    const { editor } = this
    // const renderSignatureView = editor.config.get('signature').signatureRenderer

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'table',
        classes: 'SIGNATURE',
      },
      model: (viewElement: any, { writer: modelWriter }: any) =>
        modelWriter.createElement('signatureView'),
    })

    editor.conversion.for('dataDowncast').elementToElement({
      model: 'signatureView',
      view: (modelElement: any, { writer: viewWriter }: any) =>
        viewWriter.createEmptyElement('table', {
          class: 'SIGNATURE',
        }),
    })

    // editor.conversion.for('editingDowncast').elementToElement({
    //   model: 'signatureView',
    //   view: ()
    // })
  }
}
