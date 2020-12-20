import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'


const InstrumentRatingProgress = ({ instrumentProgress }) => {
  const progressRow = (fieldName, completedHrs, requiredHrs) => {
    const completedFloor = Math.min(completedHrs, requiredHrs)
    const progress = (completedFloor / requiredHrs) * 100
    const complete = progress >= 100

    return (
      <tr>
        <td style={{ textAlign: 'right', width: '135px' }}>
          {fieldName}
        </td>
        <td>
          <LinearProgress style={{ marginLeft: '5px', marginRight: '5px' }} variant="determinate" value={progress} />
        </td>
        <td style={{ width: '60px', textAlign: 'center' }}>
          {completedFloor} / {requiredHrs}
        </td>
        <td style={{ width: '25px' }}>
          {complete ?
            <CheckIcon style={{ color: 'green' }} /> :
            <CloseIcon style={{ color: 'red' }} />
          }
        </td>
      </tr>
    )
  }

  return (
    <Paper style={{ padding: '15px', width: '500px', height: '200px', textAlign: 'center', margin: 'auto' }}>
      <div style={{ marginBottom: '10px' }}>
        Instrument Rating Progress
      </div>
      <Divider />

      <table style={{ width: '100%', marginTop: '5px' }}>
        {progressRow('Cross Country PIC', instrumentProgress.ccPic || 0, 50)}
        {progressRow('Instrument Hours', instrumentProgress.instrHours || 0, 40)}
        {progressRow('Instrument with CFI', instrumentProgress.instrHoursWithCFI || 0, 15)}
        {progressRow('Recent Instruction', instrumentProgress.recentInstrInstruction || 0, 3)}
      </table>

      <table style={{ width: '400px', margin: 'auto' }}>
        <tr>
          <td style={{ textAlign: 'right' }}>Knowledge Test</td>
          <td>
            {
              instrumentProgress.knowledgeTest ?
                <CheckIcon style={{ color: 'green' }} /> :
                <CloseIcon style={{ color: 'red' }} />
            }
          </td>
          <td style={{ textAlign: 'right' }}>250nm Cross Country</td>
          <td>
            {
              instrumentProgress.longCC ?
                <CheckIcon style={{ color: 'green' }} /> :
                <CloseIcon style={{ color: 'red' }} />
            }
          </td>
        </tr>
      </table>
    </Paper>
  )
}

InstrumentRatingProgress.propTypes = {
  instrumentProgress: PropTypes.object.isRequired,
}

export default InstrumentRatingProgress