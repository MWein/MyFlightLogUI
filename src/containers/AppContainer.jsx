import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import MapPage from './MapPage'
import LogbookPage from './LogbookPage'

import Container from '@material-ui/core/Container'

const AppContainer = () => {
  return (
      <BrowserRouter>
        <Container maxWidth={false} style={{ background: '#222222', padding: '25px', height: '100vh' }}>
          <Route component={MapPage} exact path='/' />
          <Route component={LogbookPage} path='/logbook' />
        </Container>
      </BrowserRouter>
  )
}

export default AppContainer
