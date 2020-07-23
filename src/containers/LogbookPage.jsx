import React, { useEffect, useState } from 'react'
import TotalTimeTable from '../components/TotalTimeTable'
import LogTable from '../components/LogTable'
import FlightDetails from '../components/FlightDetails'
import superagent from 'superagent'


const LogbookPage = () => {
  const [ loaded, setLoaded ] = useState(false)
  const [ logs, setLogs ] = useState([])
  const [ totalTimes, setTotalTimes ] = useState({
    takeoffs: 0,
    landings: 0,
    night: 0,
    instrument: 0,
    simInstrument: 0,
    crossCountry: 0,
    dual: 0,
    pic: 0,
    total: 0,
  })


  const [ selectedFlight, setSelectedFlight ] = useState(null)
  const [ foreflightTrack, setForeflightTrack ] = useState([])


  const loadLogData = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/log`)
    const logData = JSON.parse(response.text)

    setLoaded(true)
    setLogs(logData.logs)
    setTotalTimes(logData.totals)
    setSelectedFlight(logData.logs[0].id)
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