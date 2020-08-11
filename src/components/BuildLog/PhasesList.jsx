import React from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'


const PhasesList = ({ phases = [], selection, hidden, onChange = () => {} }) => {
  if (hidden) {
    return null
  }
  
  const totalEntries = phases.reduce((acc, x) => acc + x.entries.length, 0)

  return (
    <div style={{ marginRight: '15px', width: '200px', minWidth: '200px' }}>
      <Button variant='contained' color='primary' style={{ width: '100%', marginBottom: '15px' }}>
        Generate Report
      </Button>
      <Button variant='contained' color='primary' style={{ width: '100%', marginBottom: '15px' }}>
        Expenses
      </Button>

      <Paper style={{ maxHeight: 'auto' }}>
        <Typography variant='h6' style={{ textAlign: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
          Phases
        </Typography>

        <Divider />

        <List>
          <ListItem selected={selection === 'all'} button key='showall' onClick={() => onChange('all')}>
            <ListItemText primary={`Show All Entries (${totalEntries})`} />
          </ListItem>
          {phases.map(phase => (
            <ListItem selected={phase.id === selection} button key={phase.name} onClick={() => onChange(phase.id)}>
              <ListItemText primary={`${phase.name}${phase.entries.length > 0 ? ` (${phase.entries.length})` : ''}`} />

              {phase.complete &&
                <Paper style={{ background: 'green', padding: '5px', fontSize: '12px', color: 'gold' }}>
                  DONE
                </Paper>
              }
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}


PhasesList.propTypes = {
  phases: PropTypes.array,
  selection: PropTypes.string,
  hidden: PropTypes.bool,
  onChange: PropTypes.func
}


export default PhasesList