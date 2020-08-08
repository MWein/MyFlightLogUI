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
      label: 'Logbook',
      link: '/',
      icon: <HistoryIcon />
    },
    {
      label: 'Visited Airports',
      link: '/airports',
      icon: <LocationOnIcon />
    },
    {
      label: 'Airplanes Flown (Coming Soon)',
      //link: '',
      icon: <FlightIcon />
    },
    {
      label: 'RV-9 Build Log (Coming Soon)',
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
    <center style={{ width: '100%', marginBottom: '20px' }}>
      <BottomNavigation
        value={paths.findIndex(x => x.link === history.location.pathname)}
        showLabels
      >
        {paths.map(path => {
          return (<BottomNavigationAction disabled={!path.link} label={path.label} icon={path.icon} onClick={() => history.push(path.link)} />)
        })}
      </BottomNavigation>
    </center>
  )
}

export default withRouter(NavBar)