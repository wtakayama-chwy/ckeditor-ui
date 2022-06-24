import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createServer } from 'miragejs'

import './index.css'
import App from './App'

/*
createServer({
  routes() {
    this.namespace = 'api'

    this.get('/notes', () => ({
      notesData: {
        id: '1',
        note: {
          // eslint-disable-next-line max-len
          notes01: '<p><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </strong></p>',
          notes02: '<table class="SIGNATURE">Signature</table>',
          // notes02: '<div class="SIGNATURE_signature">Note <b>02</b></div>',
        },
      },
    }))
  },
})
*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

