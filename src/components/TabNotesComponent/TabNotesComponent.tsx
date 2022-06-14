import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useTranslation } from 'react-i18next'
import TabPanel from '../TabPanel/TabPanel'
import { Api } from '../../services/api'

// Be sure to work on first render
const CustomCKEditor = React.lazy(() => import('../ckeditor/CustomCKEditor'))

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

type NoteApiResponse = {
  notesData: {
    id: string
    note: {
      notes01: string
      notes02: string
    }
  }
}

const TabNotesComponent = () => {
  const { t } = useTranslation(['Common'])

  const [value, setValue] = useState(0)
  const [notes, setNotes] = useState<string[] | null>(null)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await Api.get<NoteApiResponse>('notes')

        if (!(response.status === 200)) {
          const message = `An error has ocurred: ${response.status}`
          throw new Error(message)
        }

        const { note } = await response.data.notesData
        setNotes([
          note.notes01,
          note.notes02,
        ].filter(Boolean))
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(`[CATCH] - ${error.message}`)
      }
    }
    getNotes()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="basic tabs example" value={value} onChange={handleChange}>
          <Tab label={t('Common:NOTES_01')} {...a11yProps(0)} />
          <Tab label={t('Common:NOTES_02')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      {notes?.map((note, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TabPanel index={index} key={index} value={value}>
          <CustomCKEditor id={`editor-0${index}`} initialData={note} />
        </TabPanel>
      ))}
    </Box>

  )
}

export default TabNotesComponent
