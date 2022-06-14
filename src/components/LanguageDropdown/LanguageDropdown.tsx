import React, { useState } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import i18n from '../../locales/i18n'

export type Item = {
  id: string
  name: string
  value: any
}

export interface LanguageDropdownProps {
  items: Item[]
}

const LanguageDropdown = ({
  items,
}: LanguageDropdownProps) => {
  const [selectedItem, setSelectedItem] = useState<Item['value']>(i18n.language)

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value)
    i18n.changeLanguage(event.target.value)
    window.location.reload()
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 80 }} variant="standard">
        <Select
          id="demo-simple-select"
          value={selectedItem}
          onChange={handleChange}
        >
          {items.map(item => (
            <MenuItem key={item.id} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageDropdown
