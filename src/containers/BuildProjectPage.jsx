import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import PhasesList from '../components/BuildLog/PhasesList'
import superagent from 'superagent'
import { useParams } from 'react-router-dom'



const BuildProjectPage = () => {
  const { buildId } = useParams()
  
  const [ loaded, setLoaded ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const [ buildProjectData, setBuildProjectData ] = useState({ name: 'Loading', phases: [] })
  const [ selectedPhase, setSelectedPhase ] = useState('all')



  const getHours = () => {
    const entries = selectedPhase == 'all' ?
      buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.entries ], [])
      : buildProjectData.phases.find(x => x.id === selectedPhase).entries

    const hours = (entries.reduce((acc, x) => acc + x.minutes, 0) / 60).toFixed(2)

    return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`
  }



  const getBuildDetails = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/build-details?buildid=${buildId}`)
    const projectData = JSON.parse(response.text)

    console.log(projectData)

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
                1 August 2020 - 10 August 2020
              </Typography>
            </div>

            <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

            <Typography variant='h6'>
              {getHours(selectedPhase)}
            </Typography>
            <Typography variant='h6'>
              $3500.01
            </Typography>
          </Paper>

          <Paper style={{ width: '100%', minWidth: '350px', marginLeft: '15px' }}>
            TODO:: Graph display with hours, rivets, expenses over time
          </Paper>

        </div>





      </div>  
    </div>
  )
}


export default BuildProjectPage