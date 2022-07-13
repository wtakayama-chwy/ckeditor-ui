const CKCS_ENVIRONMENT_ID = 'vtqbjwTRwtWxlfja7BRL'
const CKCS_API_SECRET = 'hiw5q2qxOCsA2ofcobFgJY08lfETeLftZij8dcbJc17miTv99zhPlHIKkOyn'
const CKCS_ACCESS_KEY = 'uJKa4QlIBOl1R0PAwVGkWiw6d4kdXFFPhgOEmifoU4XyyvfwJnqY8OcikktH'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

// Update with your credentials and application endpoint
const environmentId = CKCS_ENVIRONMENT_ID
const apiSecret = CKCS_API_SECRET
const applicationEndpoint = 'https://89797.cke-cs.com'

const apiEndpoint = `${ applicationEndpoint }/api/v5/${ environmentId }/editors/`
const editorBundle = fs.readFileSync(path.resolve('./build/ckeditor.js'))

const body = {
  bundle: editorBundle.toString(),
  config: {
    cloudServices: {
      bundleVersion: 'ckeditor-1.0.1', // Set a unique name for the uploaded bundle
    },
    toolbar: [
      // Toolbar items
    ],
    // Other config options
  },
}

let CSTimestamp = Date.now()
CSTimestamp = '1657132600056'
const axiosConfig = {
  headers: {
    'X-CS-Timestamp': CSTimestamp,
    'X-CS-Signature': generateSignature(apiSecret, 'POST', apiEndpoint, CSTimestamp, body),
  },
}

console.log('----- x -----')
console.log('Calling POST editors...')
console.log('----- x -----')
console.log('apiEndpoint', apiEndpoint)
console.log('axiosConfig', axiosConfig)
console.log('----- x -----')

axios.post(apiEndpoint, body, axiosConfig)
  .then(response => {
    console.log(response.status)
  }).catch(error => {
    console.log(error.message)
    console.log(error.response.data)
  })

function generateSignature(apiSecret, method, uri, timestamp, body) {
  const url = new URL(uri)
  const path = url.pathname + url.search
  const hmac = crypto.createHmac('SHA256', apiSecret)
  console.log('url', url)
  console.log('path', path)
  console.log('timestamp', timestamp)

  const plainData = `${ method.toUpperCase() }${ path }${ timestamp }`
  console.log('plainData', plainData)

  hmac.update(plainData)

  if (body) {
    hmac.update(Buffer.from(JSON.stringify(body)))
  }

  return hmac.digest('hex')
}
