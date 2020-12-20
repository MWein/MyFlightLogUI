import React, { useState, useEffect } from 'react'
import superagent from 'superagent'
// import Paper from '@material-ui/core/Paper'
// import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'


import VFRDayAndNight from '../components/FlightCurrency/VFRDayAndNight'
import Instrument from '../components/FlightCurrency/Instrument'
import InstrumentRatingProgress from '../components/FlightCurrency/InstrumentRatingProgress'
import PrivatePilotProgress from '../components/FlightCurrency/PrivatePilotProgress'

const FlightCurrencyPage = () => {
  const [ loaded, setLoaded ] = useState(false)
  const [ currency, setCurrency ] = useState({})
  const [ instrumentProgress, setInstrumentProgress ] = useState({})

  const getCurrency = async () => {
    const responses = await Promise.all([
      superagent.get(`http://${window.location.hostname}:8081/flight-currency`),
      superagent.get(`http://${window.location.hostname}:8081/instrument-rating-progress`)
    ])
    const currencyData = JSON.parse(responses[0].text)
    const instrumentProgData = JSON.parse(responses[1].text)

    setLoaded(true)
    setCurrency(currencyData)
    setInstrumentProgress(instrumentProgData)
  }

  useEffect(() => {
    if (!loaded) {
      getCurrency()
    }
  }, [ loaded ])


  return (
    <div>
      <Grid style={{ width: '1100px', margin: 'auto' }} container>
        <Grid item xs={6}>
          <VFRDayAndNight style={{ margin: 'auto' }} currency={currency} />
        </Grid>
        <Grid item xs={6}>
          <Instrument currency={currency} />
        </Grid>
        <Grid item xs={6} style={{ marginTop: '20px' }}>
          <PrivatePilotProgress />
        </Grid>
        <Grid item xs={6} style={{ marginTop: '20px' }}>
          <InstrumentRatingProgress instrumentProgress={instrumentProgress} />
        </Grid>
      </Grid>
    </div>
  )
}

export default FlightCurrencyPage