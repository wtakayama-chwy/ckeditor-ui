import { Box } from '@mui/material'
import React from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = ({
  children,
  index,
  value,
  ...rest
}: TabPanelProps) => (
  <div
    aria-labelledby={`simple-tab-${index}`}
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    role="tabpanel"
    {...rest}
  >
    {value === index && (
    <Box sx={{ p: 3 }}>
      {children}
    </Box>
    )}
  </div>
)

export default TabPanel
