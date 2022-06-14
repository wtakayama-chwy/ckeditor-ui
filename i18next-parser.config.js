module.exports = {
  contextSeparator: '_',
  // Key separator used in your translation keys

  pluralSeparator: '_',
  // Plural separator used in your translation keys
  // If you want to use plain english keys, separators such as `_` might conflict.
  // You might want to set `pluralSeparator` to a different string that does not occur in your keys.

  createOldCatalogs: true,
  // save previous translation catalogs to the \_old folder

  defaultValue: '',
  // Default value to give to empty keys

  indentation: 2,
  // Indentation of the catalog files

  keepRemoved: false,
  // Keep keys from the catalog that are no longer in code

  lexers: {
    js: ['JsxLexer'], // we're writing jsx inside .js files
    default: ['JavascriptLexer'],
  },

  locales: [
    'en-US',
    'es-ES',
    'pt-BR',
  ],
  // An array of the locales in your applications

  namespaceSeparator: ':',
  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:`
  // will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`.
  // That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  output: 'src/locales/languages/$LOCALE/$NAMESPACE.json',
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  input: [
    'src/**/*.js',
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file
  // Globs syntax: https://github.com/isaacs/node-glob#glob-primer

  sort: true,
  // Whether or not to sort the catalog
}
