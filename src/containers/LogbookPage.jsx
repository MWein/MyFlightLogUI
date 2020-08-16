import React, { useEffect, useState } from 'react'
import TotalTimeTable from '../components/FlightLog/TotalTimeTable'
import LogTable from '../components/FlightLog/LogTable'
import FlightDetails from '../components/FlightLog/FlightDetails'
import superagent from 'superagent'
import moment from 'moment'


const LogbookPage = () => {
  const startingTotalTimes = {
    takeoffs: 0,
    landings: 0,
    night: 0,
    simInstrument: 0,
    crossCountry: 0,
    dual: 0,
    pic: 0,
    month: 0,
    year: 0,
    total: 0,
  }

  const [ loaded, setLoaded ] = useState(false)
  const [ logs, setLogs ] = useState([])
  const [ totalTimes, setTotalTimes ] = useState(startingTotalTimes)


  const [ selectedFlight, setSelectedFlight ] = useState(null)
  const [ foreflightTrack, setForeflightTrack ] = useState([])


  const loadLogData = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/log`)
    const logData = JSON.parse(response.text)

    // Flight hours this month and year
    const today = moment()
    const thisMonth = today.format('MMMM')
    const thisYear = today.format('YYYY')
    const month = logData.filter(log => moment(log.date).format('MMMM') === thisMonth).reduce((acc, log) => acc + log.total, 0)
    const year = logData.filter(log => moment(log.date).format('YYYY') === thisYear).reduce((acc, log) => acc + log.total, 0)


    // Calc Totals
    const totalTimes = {
      ...logData.reduce((acc, log) => ({
        takeoffs: acc.takeoffs + log.takeoffs,
        landings: acc.landings + log.landings,
        night: acc.night + log.night,
        simInstrument: acc.simInstrument + log.simInstrument,
        crossCountry: acc.crossCountry + log.crossCountry,
        dual: acc.dual + log.dual,
        pic: acc.pic + log.pic,
        total: acc.total + log.total,
      }), startingTotalTimes),
      month,
      year,
    }


    setLoaded(true)
    setLogs(logData)
    setTotalTimes(totalTimes)
    setSelectedFlight(logData[0].id)
  }


  useEffect(() => {
    if (!loaded) {
      loadLogData()
    }
  })


  
  const handleSetSelectedFlight = async flightId => {
    // Do nothing if the selected flight ID is the one the user just selected
    if (flightId === selectedFlight) {
      return
    }

    setSelectedFlight(flightId)
    setForeflightTrack([])

    if (flightId) {
      const selectedFlightObj = logs.find(x => x.id === flightId)

      if (selectedFlightObj.hasForeflightTrack) {
        const response = await superagent.get(`http://${window.location.hostname}:8081/foreflight-track?flightid=${flightId}`)
        const track = JSON.parse(response.text)

        setForeflightTrack(track)
      } else {
        setForeflightTrack([])
      }
    } else {
      setForeflightTrack([])
    }
  }


  const geoLocation = selectedFlight != null ? logs.find(x => x.id === selectedFlight).geolocation : []
  const planePic = selectedFlight != null ? `http://${window.location.hostname}:8081/plane-image?ident=${logs.find(x => x.id === selectedFlight).ident}` : null
  const pictureIds = selectedFlight != null ? logs.find(x => x.id === selectedFlight).pictures: []
  const pictures = pictureIds.map(x => `http://${window.location.hostname}:8081/flight-image?imgid=${x}`)

  return (
    <div>
      <TotalTimeTable totalTimes={totalTimes} />
      {window.mobileCheck() && <FlightDetails geoLocation={geoLocation} planePic={planePic} pictures={pictures} foreflightTrack={foreflightTrack} />}
      <div style={{ display: 'inline-flex', marginTop: '20px', width: '100%' }}>
        <LogTable logs={logs} selectedFlight={selectedFlight} setSelectedFlight={handleSetSelectedFlight} />
        {!window.mobileCheck() && <FlightDetails geoLocation={geoLocation} planePic={planePic} pictures={pictures} foreflightTrack={foreflightTrack} />}
      </div>

    </div>
  )
}


export default LogbookPage