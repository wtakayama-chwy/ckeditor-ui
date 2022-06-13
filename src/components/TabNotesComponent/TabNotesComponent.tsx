import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '../TabPanel/TabPanel'
import CustomCKEditor from '../ckeditor/CustomCKEditor'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TabNotesComponent = () => {
  const [value, setValue] = useState(0)
  const [medicalHistory, setMedicalHistory] = useState(null)
  const [dischargeHistory, setDischargeHistory] = useState(null)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fakeFeatchNotes1 = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          template: '<p>Medical Notes!</p>',
        })
      }, 2500)
    })

    fakeFeatchNotes1.then((res: any) => {
      // eslint-disable-next-line no-console
      console.log(res)
      setMedicalHistory(res.template)
    })
  }, [])

  useEffect(() => {
    const fakeFeatchNotes2 = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          template: '<p>Discharge Notes!</p>',
        })
      }, 2500)
    })

    fakeFeatchNotes2.then((res: any) => {
      // eslint-disable-next-line no-console
      console.log(res)
      setDischargeHistory(res.template)
    })
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="basic tabs example" value={value} onChange={handleChange}>
          <Tab label="Editor One" {...a11yProps(0)} />
          <Tab label="Editor Two" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={value}>
        <CustomCKEditor id="editor-01" initialData={medicalHistory} />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomCKEditor id="editor-02" initialData={dischargeHistory} />
      </TabPanel>
    </Box>

  )
}

export default TabNotesComponent
