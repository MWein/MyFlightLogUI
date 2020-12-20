import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import moment from 'moment'


const Instrument = ({ currency }) => {
  const lastApproachDates = currency.lastApproaches || []

  const today = moment()
  const approachDateColor = date => {
    // TODO redo for *calendar* months

    const mDate = moment(date)
    const months = today.diff(mDate, 'months')

    if (months <= 4) {
      return 'black'
    } else if (months === 5) {
      return 'gold'
    } else if (months > 5) {
      return 'red'
    }
  }


  return (
    <Paper style={{ padding: '15px', width: '500px', height: '150px', textAlign: 'center', margin: 'auto' }}>
      <div style={{ marginBottom: '10px' }}>
        IFR Currency (NOT YET INSTRUMENT RATED)
      </div>
      <Divider />

      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        Approaches Last 6 Months: {currency.instrumentApproaches || 0}
      </div>

      <div style={{ width: '225px', margin: 'auto' }}>
        <Grid container>
          {lastApproachDates.map((date, index) => {
            return (
              <Grid key={date + index} item xs={6} style={{ color: approachDateColor(date) }}>
                {date}
              </Grid>
            )
          })}
        </Grid>
      </div>

      <div style={{ marginTop: '10px', fontWeight: 'bold', color: currency.instrument ? 'darkGreen' : 'red' }}>
        {currency.instrument ? 'Current' : 'Not Current'}
      </div>
    </Paper>
  )
}

Instrument.propTypes = {
  currency: PropTypes.object.isRequired,
}

export default Instrument