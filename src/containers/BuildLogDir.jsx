import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom'
import superagent from 'superagent'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import BuildProjectPage from './BuildProjectPage'
import PropTypes from 'prop-types'


const ProjectCard = (id, name, hours, lastEntry, onClick = () => {}) => {
  const date = moment(lastEntry)
  const lastEntryStr = date.isValid() ? date.format('D MMMM YYYY') : 'Not Started'

  return (
    <Paper key={id} onClick={onClick} style={{ position: 'relative', width: '300px', height: '265px', margin: '7px', cursor: 'pointer' }}>
      <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={`http://${window.location.hostname}:8081/build-cover?imgid=${id}`} style={{ maxWidth: '90%', maxHeight: '180px', borderRadius: '4px' }} />
      </div>

      <div style={{ position: 'relative', width: '100%', background: 'red' }}>
        <span style={{ position: 'absolute', left: '20px' }}>
          {hours} Hours
        </span>
        <span style={{ position: 'absolute', right: '20px' }}>
          {lastEntryStr}
        </span>
      </div>

      <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
        {name}
      </div>
    </Paper>
  )
}



const BuildLogDir = ({ history }) => {
  const { url } = useRouteMatch()

  const [ loaded, setLoaded ] = useState(false)
  const [ projects, setProjects ] = useState([])

  const getProjects = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/build-projects`)
    const projectData = JSON.parse(response.text)

    setLoaded(true)
    setProjects(projectData)
  }

  useEffect(() => {
    // Navigate directly to the project page if theres only one
    if (history.location.pathname === '/buildlog' && projects.length === 1) {
      history.push(`${url}/${projects[0].id}`)
    }

    if (!loaded) {
      getProjects()
    }
  })


  return (
    <div>
      <Switch>
        <Route exact path={`${url}/`}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {projects.map(proj => ProjectCard(proj.id, proj.name, proj.hours, proj.lastEntry, () => {history.push(`${url}/${proj.id}`)}))}

            {projects.length === 0 && <div style={{ color: 'white' }}>- No Build Projects -</div>}
          </div>
        </Route>

        <Route path={`${url}/:buildId`}>
          <BuildProjectPage />
        </Route>

      </Switch>
    </div>
  )
}


BuildLogDir.propTypes = {
  history: PropTypes.object
}


export default withRouter(BuildLogDir)