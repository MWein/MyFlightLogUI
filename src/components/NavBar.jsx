import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HistoryIcon from '@material-ui/icons/History'
import FlightIcon from '@material-ui/icons/Flight'
import { withRouter } from 'react-router-dom'


const NavBar = ({ history }) => {
  const value = () => {
    const path = history.location.pathname

    if (path === '/') {
      return 0
    } else if (path === '/logbook') {
      return 1
    } else {
      return -1
    }
  }

  return (
    <center style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
      <BottomNavigation
        value={value()}
        showLabels
        style={{ maxWidth: '600px' }}
      >
        <BottomNavigationAction label="Visited Airports" icon={<LocationOnIcon />} onClick={() => history.push('/')} />
        <BottomNavigationAction label="Logbook" icon={<HistoryIcon />} onClick={() => history.push('/logbook')}  />
        <BottomNavigationAction label="Airplanes Flown" icon={<FlightIcon />} />
      </BottomNavigation>
    </center>
  )
}

export default withRouter(NavBar)