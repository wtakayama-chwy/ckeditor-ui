import { LinearProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import Header from './components/Header/Header'
import TabNotesComponent from './components/TabNotesComponent/TabNotesComponent'
import i18n from './locales/i18n'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Header />
      <Suspense fallback={<LinearProgress color="inherit" />}>
        <TabNotesComponent />
      </Suspense>
    </I18nextProvider>
  )
}

export default App
