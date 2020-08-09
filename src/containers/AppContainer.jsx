import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import VisitedAirports from './VisitedAirports'
import LogbookPage from './LogbookPage'
import BuildLogDir from './BuildLogDir'

import NavBar from '../components/NavBar'

import Container from '@material-ui/core/Container'

const AppContainer = () => {
  return (
      <BrowserRouter>
        <Container maxWidth={false} style={{ padding: '25px', height: '100vh' }}>
          <NavBar />
          <Route component={LogbookPage} exact path='/' />
          <Route component={VisitedAirports} path='/airports' />
          <Route component={BuildLogDir} path='/buildlog' />
        </Container>
      </BrowserRouter>
  )
}

export default AppContainer
