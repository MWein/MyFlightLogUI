import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import CheckIcon from '@material-ui/icons/Check'

const PrivatePilotProgress = () => {
  const progressRow = (fieldName, completedHrs, requiredHrs) => (
    <tr>
      <td style={{ textAlign: 'right', width: '135px' }}>
        {fieldName}
      </td>
      <td>
        <LinearProgress style={{ marginLeft: '5px', marginRight: '5px' }} variant="determinate" value={100} />
      </td>
      <td style={{ width: '60px', textAlign: 'center' }}>
        {completedHrs} / {requiredHrs}
      </td>
      <td style={{ width: '25px' }}>
        <CheckIcon style={{ color: 'green' }} />
      </td>
    </tr>
  )

  return (
    <Paper style={{ padding: '15px', width: '500px', height: '200px', textAlign: 'center', margin: 'auto' }}>
      <div style={{ marginBottom: '10px' }}>
        Private Pilot Progress
      </div>
      <Divider />

      <table style={{ width: '100%', marginTop: '5px' }}>
        {progressRow('Dual Hours', 20, 20)}
        {progressRow('Night Flight', 3, 3)}
        {progressRow('Instrument', 3, 3)}
        {progressRow('Solo Cross Country', 5, 5)}
      </table>

      <table style={{ width: '400px', margin: 'auto' }}>
        <tr>
          <td style={{ textAlign: 'right' }}>Knowledge Test</td>
          <td>
            <CheckIcon style={{ color: 'green' }} />
          </td>
          <td style={{ textAlign: 'right' }}>150nm Cross Country</td>
          <td>
            <CheckIcon style={{ color: 'green' }} />
          </td>
        </tr>
      </table>
    </Paper>
  )
}

export default PrivatePilotProgress