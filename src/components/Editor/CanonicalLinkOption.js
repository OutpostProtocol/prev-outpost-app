import React from 'react'
import { styled } from '@material-ui/core/styles'
import {
  TextField,
  Checkbox
} from '@material-ui/core'

const AdvancedOptions = styled('div')({
  margin: '5vh 0 10vh'
})

const TextFieldContainer = styled(TextField)({
  width: '100%'
})

const StyledCheckbox = styled(Checkbox)({
  padding: 0
})

const CheckboxContainer = styled('div')({
  display: 'flex',
  'align-items': 'center'
})

const CheckboxText = styled('p')({
  'padding-left': '5px'
})

const CanonicalLinkOption = ({ hasCanonicalLink, setHasLink, canonicalLink, setCanonicalLink }) => {
  return (
    <AdvancedOptions>
      <CheckboxContainer>
        <StyledCheckbox
          color='secondary'
          checked={hasCanonicalLink}
          onChange={(event) => {
            if (event && event.target && event.target.checked !== undefined) {
              setHasLink(event.target.checked)
            }
          }}
          disableRipple
        />
        <CheckboxText>
          This article was originally published somewhere else
        </CheckboxText>
      </CheckboxContainer>
      { hasCanonicalLink &&
          <div>
            <TextFieldContainer
              color='primary'
              type='url'
              label='ORIGINAL URL'
              value={canonicalLink}
              onChange={(event) => {
                if (event && event.target && event.target.value !== undefined) {
                  setCanonicalLink(event.target.value)
                }
              }}
            />
          </div>
      }
    </AdvancedOptions>
  )
}

export default CanonicalLinkOption
