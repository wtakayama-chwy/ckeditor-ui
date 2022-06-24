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
  const [channelId1, setChannelId1] = useState<string>('')
  const [channelId2, setChannelId2] = useState<string>('')
  const [channelId3, setChannelId3] = useState<string>('')
  const [channelId4, setChannelId4] = useState<string>('')
  const [note1, setNote1] = useState<Note | null>(null)
  const [note2, setNote2] = useState<Note | null>(null)
  const [note3, setNote3] = useState<Note | null>(null)
  const [note4, setNote4] = useState<Note | null>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    async function getNote(index: number, channelId: string) {
      try {
        const response = await api.get<Note>(`document?channelId=${channelId}`)
        let rnote = null
        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`
          throw new Error(message)
        }
        const note = await response.data
        if (index === 1) {
          setNote1(note)
          rnote = note1
        }
        if (index === 2) {
          setNote2(note)
          rnote = note2
        }
        if (index === 3) {
          setNote3(note)
          rnote = note3
        }
        if (index === 4) {
          setNote4(note)
          rnote = note4
        }
        return rnote
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
        return null
      }
    }

    async function getChannelId(index: number, noteType: number, baseId: string) {
      try {
        const response = await api.get<string>(`channelId?baseId=${baseId}&type=${noteType}`)
        let rchannelId = null
        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`
          throw new Error(message)
        }
        const channelId = await response.data
        if (index === 1) {
          setChannelId1(channelId)
          rchannelId = channelId1
          await getNote(1, channelId)
        }
        if (index === 2) {
          setChannelId2(channelId)
          rchannelId = channelId2
          await getNote(2, channelId)
        }
        if (index === 3) {
          setChannelId3(channelId)
          rchannelId = channelId3
          await getNote(3, channelId)
        }
        if (index === 4) {
          setChannelId4(channelId)
          rchannelId = channelId4
          await getNote(4, channelId)
        }
        return rchannelId
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
        return null
      }
    }
    getChannelId(1, 100, '1001')
    getChannelId(2, 101, '1001')
    getChannelId(3, 100, '1002')
    getChannelId(4, 101, '1002')
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="basic tabs example" value={value} onChange={handleChange}>
          <Tab label={t('Common:NOTES_01')} {...a11yProps(0)} />
          <Tab label={t('Common:NOTES_02')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel index={0} key={0} value={value}>
        <CustomCKEditor id={`editor-0${1}`} initialData={note1} />
        <CustomCKEditor id={`editor-0${2}`} initialData={note2} />
      </TabPanel>
      <TabPanel index={1} key={1} value={value}>
        <CustomCKEditor id={`editor-0${3}`} initialData={note3} />
        <CustomCKEditor id={`editor-0${4}`} initialData={note4} />
      </TabPanel>
    </Box>

  )
}

export default TabNotesComponent
