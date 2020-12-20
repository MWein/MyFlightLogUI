import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'


const VFRDayAndNight = ({ currency }) => {
  const section = (title, takeoffs, landings, met) => (
    <div>
      <div style={{ marginTop: '10px' }}>
        {title}
      </div>
      <div style={{ marginTop: '10px' }}>
        Takeoffs Last 90 Days: {takeoffs}
      </div>
      <div style={{ marginTop: '10px' }}>
        Landings Last 90 Days: {landings}
      </div>
      <div style={{ marginTop: '10px', fontWeight: 'bold', color: met ? 'darkGreen' : 'red' }}>
        {met ? 'Current' : 'Not Current'}
      </div>
    </div>
  )

  return (
    <Paper style={{ padding: '15px', width: '500px', height: '150px', textAlign: 'center', margin: 'auto' }}>
      <div style={{ marginBottom: '10px' }}>
        VFR Currency
      </div>
      <Divider />

      <Grid container>
        <Grid item xs={6}>
          {section('Day', currency.vfrDayTO || 0, currency.vfrDayLandings || 0, currency.vfrDay)}
        </Grid>
        <Grid item xs={6}>
          {section('Night', currency.vfrNightTO || 0, currency.vfrNightLandings || 0, currency.vfrNight)}
        </Grid>
      </Grid>
    </Paper>
  )
}

VFRDayAndNight.propTypes = {
  currency: PropTypes.object.isRequired,
}

export default VFRDayAndNight