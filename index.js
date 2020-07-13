import AppContainer from './src/containers/AppContainer'
import React from 'react'
import 'regenerator-runtime/runtime'

import { render } from 'react-dom'

function startup() {
  render(
    <AppContainer />,
    document.getElementById('root')
  )
}

startup()
