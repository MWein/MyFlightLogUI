import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HistoryIcon from '@material-ui/icons/History'
import FlightIcon from '@material-ui/icons/Flight'
import DeveloperIcon from '@material-ui/icons/DeveloperBoard'
import BuildIcon from '@material-ui/icons/Build'
import { withRouter } from 'react-router-dom'


const NavBar = ({ history }) => {
  const paths = [
    {
      label: 'Visited Airports',
      link: '/',
      icon: <LocationOnIcon />
    },
    {
      label: 'Logbook',
      link: '/logbook',
      icon: <HistoryIcon />
    },
    {
      label: 'Airplanes Flown (Coming Soon)',
      //link: '',
      icon: <FlightIcon />
    },
    {
      label: 'RV14 Build Log (Coming Soon)',
      //link: '',
      icon: <BuildIcon />
    },
    {
      label: 'About This Site (Coming Soon)',
      //link: '',
      icon: <DeveloperIcon />
    },
  ]

  return (
    <center style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
      <BottomNavigation
        value={paths.findIndex(x => x.link === history.location.pathname)}
        showLabels
        style={{ maxWidth: '750px' }}
      >
        {paths.map(path => {
          return (<BottomNavigationAction disabled={!path.link} label={path.label} icon={path.icon} onClick={() => history.push(path.link)} />)
        })}
      </BottomNavigation>
    </center>
  )
}

export default withRouter(NavBar)