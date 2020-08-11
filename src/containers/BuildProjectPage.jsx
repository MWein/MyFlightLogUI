import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import PhasesList from '../components/BuildLog/PhasesList'


const buildPhasesSample = [
  {
    name: 'Research',
    id: '1',
    complete: false,
    entries: 5,
  },
  {
    name: 'Workshop',
    id: '2',
    complete: true,
    entries: 0
  },
  {
    name: 'Practice',
    id: '3',
    complete: true,
    entries: 0
  },
  {
    name: 'Empennage',
    id: '4',
    complete: false,
    entries: 0
  },
  {
    name: 'Horizontal Stabilizer',
    id: '5',
    complete: true,
    entries: 0
  },
  {
    name: 'Wings',
    id: '6',
    complete: false,
    entries: 0
  },
  {
    name: 'Fuselage',
    id: '7',
    complete: false,
    entries: 0
  },
]


const BuildProjectPage = () => {
  //const { buildId } = useParams()
  
  const [ buildPhases, setBuildPhases ] = useState(buildPhasesSample)
  const [ selectedPhase, setSelectedPhase ] = useState('all')




  return (
    <div style={{ display: 'flex' }}>
      <PhasesList selection={selectedPhase} phases={buildPhases} onChange={id => {setSelectedPhase(id)}} />


      <div style={{ width: '100%' }}>


        <div style={{ display: 'flex' }}>
          <Paper style={{ padding: '15px', minWidth: '700px' }}>

            <div style={{ display: 'flex', position: 'relative' }}>
              <Typography variant='h5'>
                Vans RV-9 {selectedPhase !== 'all' && `(${buildPhases.find(x => x.id === selectedPhase).name})`}
              </Typography>

              <Typography style={{ position: 'absolute', right: '15px' }} variant='h6'>
                1 August 2020 - 10 August 2020
              </Typography>
            </div>

            <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

            <Typography variant='h6'>
              150.1 Hours
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