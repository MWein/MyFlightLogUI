import React from 'react'
import { useParams } from 'react-router-dom'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'


const buildPhases = [
  {
    name: 'Research',
    id: 'whatever'
  },
  {
    name: 'Workshop',
    id: 'whatever'
  },
  {
    name: 'Practice',
    id: 'whatever'
  },
  {
    name: 'Empennage',
    id: 'whatever'
  },
  {
    name: 'Horizontal Stabilizer',
    id: 'whatever'
  },
  {
    name: 'Wings',
    id: 'whatever'
  },
  {
    name: 'Fuselage',
    id: 'whatever'
  },
]


const BuildProjectPage = () => {
  //const { buildId } = useParams()
  
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Button variant='contained' color='primary' style={{ width: '100%', marginBottom: '15px' }}>
          Generate Report
        </Button>

        <Paper style={{ width: '200px', minWidth: '200px', maxHeight: 'auto' }}>
          <Typography variant='h6' style={{ textAlign: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
            Phases
          </Typography>

          <Divider />
          
          <List>
            <ListItem button key='showall'>
              <ListItemText primary='Show All Entries' />
            </ListItem>
            {buildPhases.map(x => x.name).map(text => (
              <ListItem selected={text == 'Wings'} button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>




      <div style={{ background: 'green', width: '100%', marginLeft: '15px', height: '1000px' }}>


        <div style={{ display: 'flex' }}>
          <Paper style={{ padding: '15px', minWidth: '700px' }}>

            <div style={{ display: 'flex', position: 'relative' }}>
              <Typography variant='h5'>
                Vans RV-9 (Horizontal Stabilizer)
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