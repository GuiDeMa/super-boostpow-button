import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { BoostButton } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<BoostButton content='test' value={0} />)
  })
})


