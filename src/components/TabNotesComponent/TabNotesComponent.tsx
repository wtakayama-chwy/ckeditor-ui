import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useTranslation } from 'react-i18next'
import TabPanel from '../TabPanel/TabPanel'
import api from '../../services/api'
import { Note } from '../ckeditor/CustomCKEditor'

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
  const [note, setNote] = useState<Note | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [note2, setNote2] = useState<Note | null>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    async function getNote(noteId: string) {
      try {
        const response = await api.get<Note>(`document?channelId=${noteId}`)
        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`
          throw new Error(message)
        }
        const data = await response.data
        if (noteId === 't100_1001') {
          setNote(data)
        } else if (noteId === 't100_1002') {
          setNote2(data)
        }
        return data
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
        return null
      }
    }

    async function getChannelId(noteType: number, baseId: string) {
      try {
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
    getChannelId(100, '1001')
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="basic tabs example" value={value} onChange={handleChange}>
          <Tab label={t('Common:NOTES_01')} {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel index={0} key={0} value={value}>
        <CustomCKEditor channelId={note?.channelId} id="editor-01" initialData={note} />
      </TabPanel>
    </Box>

  )
}

export default TabNotesComponent
