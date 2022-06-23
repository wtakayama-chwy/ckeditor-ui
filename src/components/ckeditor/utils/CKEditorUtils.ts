function injectWithInlineStyle(
  createElementFn: any,
  element: string,
  modelOrElement: any,
  options?: object,
) {
  createElementFn(element, {
    ...options,
    style: modelOrElement.getAttribute('style'),
  })
}

export const CKEditorUtils = {
  injectWithInlineStyle,
}
