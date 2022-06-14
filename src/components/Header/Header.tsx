import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown'
import { LanguageCode } from '../../locales/i18n'

const Header = () => {
  const { t } = useTranslation(['Common'])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            CKEditor
          </Typography>
          <LanguageDropdown
            items={[
              {
                id: '1',
                name: t('Common:ENGLISH'),
                value: LanguageCode['en-US'],
              },
              {
                id: '2',
                name: t('Common:SPANISH'),
                value: LanguageCode['es-ES'],
              },
              {
                id: '3',
                name: t('Common:PORTUGUESE'),
                value: LanguageCode['pt-BR'],
              },
            ]}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
