import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import VisitedAirports from './VisitedAirports'
import LogbookPage from './LogbookPage'

import NavBar from '../components/NavBar'

import Container from '@material-ui/core/Container'

const AppContainer = () => {
  return (
      <BrowserRouter>
        <Container maxWidth={false} style={{ padding: '25px', height: 'calc(100vh - 50px)' }}>
          <Route component={VisitedAirports} exact path='/' />
          <Route component={LogbookPage} path='/logbook' />
        </Container>
        <NavBar />
      </BrowserRouter>
  )
}

export default AppContainer
