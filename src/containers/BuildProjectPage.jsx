import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import PhasesList from '../components/BuildLog/PhasesList'
import superagent from 'superagent'
import { useParams } from 'react-router-dom'
import moment from 'moment'


const BuildProjectPage = () => {
  const { buildId } = useParams()
  
  const [ loaded, setLoaded ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const [ buildProjectData, setBuildProjectData ] = useState({ name: 'Loading', phases: [] })
  const [ selectedPhase, setSelectedPhase ] = useState('all')



  const getEntries = () => {
    return selectedPhase == 'all' ?
      buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.entries ], [])
      : buildProjectData.phases.find(x => x.id === selectedPhase).entries
  }



  const getHeaderData = () => {
    const phase = buildProjectData.phases.find(x => x.id === selectedPhase)

    const complete = selectedPhase === 'all' ? buildProjectData.phases.reduce((acc, x) => !x ? false : acc, false) : phase.complete

    const entries = selectedPhase == 'all' ?
      buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.entries ], [])
      : phase.entries

    const hours = (entries.reduce((acc, x) => acc + x.minutes, 0) / 60).toFixed(2)
    const hoursText = `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`


    const entryDates = entries.map(x => x.date).sort()


    let timeline
    const firstDate = entryDates[0]
    const lastDate = entryDates[entryDates.length - 1]
    if (!firstDate) {
      timeline = 'Not Started'
    } else if (complete) {
      timeline = `${moment(firstDate).format('D MMMM YYYY')} - ${moment(lastDate).format('DD MMMM YYYY')}`
    } else {
      timeline = `${moment(firstDate).format('D MMMM YYYY')} - Ongoing`
    }



    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    const cost = formatter.format(3400.25)


    return {
      hours: hoursText,
      timeline,
      cost,
    }
  }
  const { hours, timeline, cost } = getHeaderData()


  const entries = getEntries()



  const getBuildDetails = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/build-details?buildid=${buildId}`)
    const projectData = JSON.parse(response.text)

    setLoaded(true)
    setLoading(false)
    setBuildProjectData(projectData)
  }


  useEffect(() => {
    if (!loaded && !loading) {
      setLoading(true)
      getBuildDetails()
    }
  })


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

            <Typography variant='h6'>
              {hours}
            </Typography>
            <Typography variant='h6'>
              {cost}
            </Typography>
          </Paper>

          <Paper style={{ width: '100%', minWidth: '350px', marginLeft: '15px' }}>
            TODO:: Graph display with hours, rivets, expenses over time
          </Paper>
        </div>

        {entries.map(entry => {
          return (
            <Paper key={JSON.stringify(entry)} style={{ marginTop: '15px', padding: '15px' }}>
              <div style={{ display: 'flex', position: 'relative' }}>
                <Typography variant='h6' style={{ width: '150px' }}>
                  {`${moment(entry.date).format('MMM DD, YYYY')}`}
                </Typography>

                <Typography variant='h6'>
                  {`${entry.title} - (${(entry.minutes / 60).toFixed(2)} Hours)`}
                </Typography>

                <Typography variant='h6' style={{ position: 'absolute', right: '15px' }}>
                  {entry.phase}
                </Typography>
              </div>

              <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

              <Typography>
                {entry.description}
              </Typography>

            </Paper>
          )
        })}
      </div>
    </div>
  )
}


export default BuildProjectPage