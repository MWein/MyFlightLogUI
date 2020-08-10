import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HistoryIcon from '@material-ui/icons/History'
import FlightIcon from '@material-ui/icons/Flight'
//import DeveloperIcon from '@material-ui/icons/DeveloperBoard'
import BuildIcon from '@material-ui/icons/Build'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


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
      label: 'Build Log',
      link: '/buildlog',
      icon: <BuildIcon />
    },
    // {
    //   label: 'About This Site (Coming Soon)',
    //   //link: '',
    //   icon: <DeveloperIcon />
    // },
  ]

  const determineCurrentPage = () => {
    const path = history.location.pathname
    return path === '/' ? paths.findIndex(x => x.link === '/') : paths.findIndex(x => path.includes(x.link) && x.link !== '/')
  }

  return (
    <BottomNavigation
      style={{ width: '100%', marginBottom: '20px' }}
      value={determineCurrentPage()}
      showLabels
    >
      {paths.map(path => {
        return (<BottomNavigationAction key={path.label} disabled={!path.link} label={path.label} icon={path.icon} onClick={() => history.push(path.link)} />)
      })}
    </BottomNavigation>
  )
}


NavBar.propTypes = {
  history: PropTypes.object
}


export default withRouter(NavBar)