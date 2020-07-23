import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import VisitedAirports from './VisitedAirports'
import LogbookPage from './LogbookPage'

import NavBar from '../components/NavBar'

import Container from '@material-ui/core/Container'

const AppContainer = () => {
  return (
      <BrowserRouter>
        <Container maxWidth={false} style={{ padding: '25px', height: '100vh' }}>
          <Route component={VisitedAirports} exact path='/' />
          <Route component={LogbookPage} path='/logbook' />
          <NavBar />
        </Container>
      </BrowserRouter>
  )
}

export default AppContainer
