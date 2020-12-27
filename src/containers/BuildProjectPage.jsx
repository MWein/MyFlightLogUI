import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import PhasesList from '../components/BuildLog/PhasesList'
import superagent from 'superagent'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import LineGraph from '../components/BuildLog/LineGraph'

import { headerData, getEntriesFromPhase, createHoursGraphObject, createExpensesGraphObject } from '../api/buildProject'


const BuildProjectPage = () => {
  const { buildId } = useParams()
  
  const [ loaded, setLoaded ] = useState(false)

  const [ buildProjectData, setBuildProjectData ] = useState({ name: 'Loading', phases: [] })
  const [ selectedPhase, setSelectedPhase ] = useState('all')


  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })


  const { hours, timeline, cost, rivets } = headerData(buildProjectData, selectedPhase, currencyFormatter)

  const entries = getEntriesFromPhase(buildProjectData, selectedPhase)
  const hoursGraphObject = createHoursGraphObject(buildProjectData, selectedPhase)
  const expensesGraphObject = createExpensesGraphObject(buildProjectData, selectedPhase)

  const getBuildDetails = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/build-details?buildid=${buildId}`)
    const projectData = JSON.parse(response.text)

    setLoaded(true)
    setBuildProjectData(projectData)
  }


  useEffect(() => {
    if (!loaded) {
      getBuildDetails()
    }
  }, [ loaded ])


  return (
    <div style={{ display: 'flex' }}>
      <PhasesList selection={selectedPhase} phases={buildProjectData.phases} onChange={id => {setSelectedPhase(id)}} />

      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <Paper style={{ padding: '15px', minWidth: '700px' }}>
            <div style={{ display: 'flex', position: 'relative' }}>
              <Typography variant='h5'>
                {buildProjectData.name} {selectedPhase !== 'all' && `(${buildProjectData.phases.find(x => x.id === selectedPhase).name})`}
              </Typography>
              <Typography style={{ position: 'absolute', right: '15px' }} variant='h6'>
                {timeline}
              </Typography>
            </div>

            <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

            <table width="100%">
              <tr>
                <td style={{ width: '150px' }}>
                  <Typography variant='h6'>
                    {hours}
                  </Typography>
                </td>
                <td>
                  <LineGraph inputs={hoursGraphObject} valueLabel='Hours' />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant='h6'>
                    {rivets}
                  </Typography>
                </td>
                <td>
                  <LineGraph />
                </td>
              </tr>

              <tr>
                <td>
                  <Typography variant='h6'>
                    {cost}
                  </Typography>
                </td>
                <td>
                  <LineGraph inputs={expensesGraphObject} formatter={currencyFormatter} />
                </td>
              </tr>
            </table>

          </Paper>

          <Paper style={{ width: '100%', minWidth: '350px', marginLeft: '15px' }}>
            TODO:: Graph display with hours, rivets, expenses over time
          </Paper>
        </div>

        {entries.map(entry => {
          return (
            <Paper key={JSON.stringify(entry)} style={{ marginTop: '15px', marginBottom: '15px', padding: '15px' }}>
              <div style={{ display: 'flex', position: 'relative' }}>
                <Typography variant='h6' style={{ width: '150px' }}>
                  {`${moment(entry.date).format('MMM DD, YYYY')}`}
                </Typography>

                <Typography variant='h6'>
                  {`${entry.title} - (${(entry.minutes / 60).toFixed(2)} Hours`}
                  {entry.rivets === 0 ? ')' : `, ${entry.rivets} ${entry.rivets === 1 ? 'Rivet' : 'Rivets'})`}
                </Typography>

                <Typography variant='h6' style={{ position: 'absolute', right: '15px' }}>
                  {entry.phase}
                </Typography>
              </div>

              <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

              <Typography style={{ marginBottom: entry.pictures.length === 0 ? '0px' : '15px' }}>
                {entry.description}
              </Typography>

              {entry.pictures.map(imgId => (
                <span key={imgId} style={{ width: '100%', height: '200px', alignItems: 'left', justifyContent: 'left', marginRight: '15px', marginTop: '15px' }}>
                  <img src={`http://${window.location.hostname}:8081/img?id=${imgId}&thumb=true`} style={{ maxWidth: '90%', maxHeight: '180px', borderRadius: '4px' }} />
                </span>
              ))}

            </Paper>
          )
        })}
      </div>
    </div>
  )
}


export default BuildProjectPage