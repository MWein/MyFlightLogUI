import React from 'react'
import { useParams } from 'react-router-dom'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'



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
  const { buildId } = useParams()
  
  return (
    <div>
      



      <Paper style={{ width: '200px' }}>
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
  )
}


export default BuildProjectPage