import React, { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

const styles: Record<string, CSSProperties> = {
  text: {
    margin: 0,
    fontFamily: 'Rubik, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#3C3838',
  },
  signatureBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '300px',
    borderCollapse: 'collapse',
    cursor: 'not-allowed',
    userSelect: 'none',
  },
  signatureCell: {
    border: '1px solid #EDECEC',
    padding: '0 8px',
  },
  signatureHint: {
    color: '#918D8D',
    marginTop: '8px',
  },
  signatureFixedWidth: {
    width: '200px',
  },
  signatureImage: {
    maxWidth: '100%',
    height: '60px',
  },
  strong: {
    fontWeight: 500,
    padding: '8px',
  },
}

export interface SignatureViewProps {
  signatureDate?: string
  signatureString?: string
  signerLicence?: string
  signerName?: string
}

const SignatureView = ({
  signatureDate = '',
  signatureString,
  signerLicence,
  signerName,
}: SignatureViewProps) => {
  const { t } = useTranslation('Common')

  return (
    <>
      <table style={{ ...styles.signatureBox, ...styles.text }}>
        <tbody>
          <tr>
            <td style={{ ...styles.signatureCell, ...styles.strong }}>
              {t('Common:SIGNATURE_VIEW.LABEL')}
            </td>
            <td style={{ ...styles.signatureCell, ...styles.signatureFixedWidth }}>
              {signatureString && (
                <img
                  alt={t('Common:SIGNATURE_VIEW.LABEL').toLowerCase()}
                  src={signatureString}
                  style={styles.signatureImage}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {signerName && (
        <div>
          <p style={{ ...styles.text, ...styles.signatureHint }}>
            {t('Common:SIGNATURE_VIEW.SIGNED')}
            {signatureDate
              ? ` ${signatureDate} ${t('Common:SIGNATURE_VIEW.BY_SIGNER_NAME', { signerName })}`
              : ` ${t('Common:SIGNATURE_VIEW.BY_SIGNER_NAME', { signerName })}`
            }
            {signerLicence ? ` | ${t('Common:LICENSE').toLowerCase()}: ${signerLicence}` : ''}
          </p>
        </div>
      )}
    </>
  )
}

export default SignatureView
