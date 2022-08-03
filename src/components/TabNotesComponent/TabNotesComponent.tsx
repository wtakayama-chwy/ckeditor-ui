import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import TabPanel from '../TabPanel/TabPanel'
import api from '../../services/api'
import { CKEDITOR_TOKEN_URL } from '../../configs'

// import { Note } from '../ckeditor/CustomCKEditor'
interface CkcsChannelData {
  bundleType: string
  bundleVersion: string
  channelId: string
  documentType: string
  soapId: number
  wssUrl: string
}
// Be sure to work on first render
const CustomCKEditor = React.lazy(() => import('../ckeditor/CustomCKEditor'))

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TabNotesComponent = () => {
  const { t } = useTranslation(['Common'])

  const [value, setValue] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [note, setNote] = useState<Note | null>(null)

  const [channelId, setChannelId] = useState('')
  const [bundleVersion, setBundleVersion] = useState('')
  const [wssUrl, setWssUrl] = useState('')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { search } = useLocation()
  const soapId = new URLSearchParams(search).get('soapId')
  const documentType = new URLSearchParams(search).get('documentType')

  useEffect(() => {
    async function setData(data: CkcsChannelData) {
      try {
        setChannelId(data.channelId)
        setBundleVersion(data.bundleVersion)
        setWssUrl(data.wssUrl)
        return data
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
        return null
      }
    }

    async function initChannel() {
      try {
        const channelRequestData = {
          documentType,
          soapId,
          bundleType: 'classic',
        }
        // eslint-disable-next-line max-len, @typescript-eslint/object-curly-spacing, quote-props
        const response = await api.post('/channel/init', channelRequestData)
        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`
          throw new Error(message)
        }
        const channelResponseData = response.data

        await setData(channelResponseData)
        return channelResponseData
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
        return null
      }
    }
    initChannel()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <div>
        <p>Soap:<b>{soapId}</b></p>
        <p>Doc Type:<b>{documentType}</b></p>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="basic tabs example" value={value} onChange={handleChange}>
          <Tab label={t('Common:NOTES_01')} {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel index={0} key={0} value={value}>
        <CustomCKEditor
          bundleVersion={bundleVersion}
          channelId={channelId}
          id="editor-01"
          tokenUrl={CKEDITOR_TOKEN_URL}
          webSocketUrl={wssUrl}
        />
      </TabPanel>
    </Box>

  )
}

export default TabNotesComponent

// channelId={note?.channelId}
// initialData={note}
