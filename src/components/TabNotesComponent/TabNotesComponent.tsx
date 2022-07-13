import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import TabPanel from '../TabPanel/TabPanel'
import api from '../../services/api'
// import { Note } from '../ckeditor/CustomCKEditor'

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { search } = useLocation()
  const soapId = new URLSearchParams(search).get('soapId')
  const userId = new URLSearchParams(search).get('userId')
  const documentType = new URLSearchParams(search).get('documentType')

  useEffect(() => {
    async function getNote(noteId: string) {
      try {
        // eslint-disable-next-line no-console
        console.log(`noteId:${ noteId}`)
        /*
        const response = await api.get<Note>(`document?channelId=${noteId}`)
        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`
          throw new Error(message)
        }
        const data = await response.data
        setNote(data)
        return data
        */
        setChannelId(noteId)
        return noteId
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
        return null
      }
    }

    async function getChannelId() {
      try {
        const noteType = documentType
        const baseId = soapId
        const response = await api.get<string>(`channelId?baseId=${baseId}&type=${noteType}`)
        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`
          throw new Error(message)
        }
        const data = await response.data

        await getNote(data)
        return data
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
        return null
      }
    }
    getChannelId()
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
        <CustomCKEditor channelId={channelId} id="editor-01" personId={userId} />
      </TabPanel>
    </Box>

  )
}

export default TabNotesComponent

// channelId={note?.channelId}
// initialData={note}
