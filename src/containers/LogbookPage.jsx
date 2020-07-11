import React, { useEffect, useState } from 'react'
import TotalTimeTable from '../components/TotalTimeTable'
import LogTable from '../components/LogTable'
import FlightDetails from '../components/FlightDetails'


const tempData = {
  logs: [
    {
      id: 0,
      date: '9-10-2019',
      type: 'C172',
      ident: '6343D',
      from: 'KSET',
      to: 'KSET',
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 0.4,
      pic: 0,
      total: 0.4,
      remarks: 'Intro Lesson',
      planePic: 'http://www.stcharlesflyingservice.com/wp-content/uploads/2012/06/N55256-ext-300x224.jpg'
    },
    {
      id: 1,
      date: '9-20-2019',
      type: 'C172',
      ident: '6343D',
      from: 'KSET',
      to: 'KSET',
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 0.7,
      pic: 0,
      total: 0.7,
      remarks: '1st Lesson, taxi, takeoff, climbing turns and decents',
      planePic: 'https://qph.fs.quoracdn.net/main-qimg-4aa46167d516a2a3d13659337a316cd2'
    },
    {
      id: 2,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      from: 'KSET',
      to: 'KSET',
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: 'http://www.stcharlesflyingservice.com/wp-content/uploads/2017/02/n65191-ext-1-1024x576.jpg'
    },
    {
      id: 3,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      from: 'KSET',
      to: 'KSET',
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null
    }
  ],
  totalTimes: {
    takeoffs: 235,
    landings: 235,
    night: 3.6,
    instrument: 0,
    simInstrument: 3.7,
    crossCountry: 13.4,
    dual: 56.6,
    pic: 11.2,
    total: 67.8,
  }
}



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



  const [ selectedFlight, setSelectedFlight ] = useState(-1)



  useEffect(() => {
    if (!loaded) {
      setLogs(tempData.logs)
      setTotalTimes(tempData.totalTimes)
      setLoaded(true)
      setSelectedFlight(3)
    }
  })



  const planePic = selectedFlight != -1 ? logs.find(x => x.id === selectedFlight).planePic : null



  return (
    <div style={{ height:'100%' }}>
      <TotalTimeTable totalTimes={totalTimes} />

      <div style={{ display: 'inline-flex', marginTop: '20px', width: '100%' }}>
        <LogTable logs={logs} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} />
        <FlightDetails planePic={planePic} />
      </div>

    </div>
  )
}


export default LogbookPage