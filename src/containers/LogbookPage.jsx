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



  const loadLogData = async () => {
    const response = await superagent.get('http://localhost:8081/log')
    const logData = JSON.parse(response.text)

    setLogs(logData.logs)
    setTotalTimes(logData.totals)
    setLoaded(true)
    setSelectedFlight(logData.logs[0].id)
  }


  useEffect(() => {
    if (!loaded) {
      loadLogData()
    }
  })



  const geoLocation = selectedFlight != null ? logs.find(x => x.id === selectedFlight).geolocation : []
  const planePic = selectedFlight != null ? `http://localhost:8081/plane-image?ident=${logs.find(x => x.id === selectedFlight).ident}` : null
  const pictures = selectedFlight != null ? logs.find(x => x.id === selectedFlight).pictures: []



  return (
    <div style={{ height:'100%' }}>
      <TotalTimeTable totalTimes={totalTimes} />

      <div style={{ display: 'inline-flex', marginTop: '20px', width: '100%' }}>
        <LogTable logs={logs} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} />
        <FlightDetails geoLocation={geoLocation} planePic={planePic} pictures={pictures} />
      </div>

    </div>
  )
}


export default LogbookPage