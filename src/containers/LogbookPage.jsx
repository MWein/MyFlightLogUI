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
      stops: [ 'KSET', 'KJOT', 'KSET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 0.4,
      pic: 0,
      total: 0.4,
      remarks: 'Intro Lesson',
      planePic: 'http://www.stcharlesflyingservice.com/wp-content/uploads/2012/06/N55256-ext-300x224.jpg',
      pictures: [
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/87019324_10217223521447341_1969988429366165504_n.jpg?_nc_cat=101&_nc_sid=8bfeb9&_nc_oc=AQmX-FJKk5SA8IISY9x6OGPEcpOsrSpKJkxGmO67llBzXH8wOnen4tzPuP98eaKDnS3oiXhcz6DvXq6c6ToZvm6B&_nc_ht=scontent-ort2-1.xx&oh=c512cb6395d60acdc2150a1188817134&oe=5F2E66A5',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/87189619_10217223521687347_7695177829184438272_n.jpg?_nc_cat=106&_nc_sid=8bfeb9&_nc_oc=AQnsXl1wRNdrp0dckTeDIZr463mvGPJVaQ76t5Twa_53F-KnHcQECKGNKyKWD0v4Dg_5weSqh4-qdIwJjvGlr6Ul&_nc_ht=scontent-ort2-1.xx&oh=f5661715e24ed7f357b7c5bde1c077e9&oe=5F2E8FFE',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/86864338_10217223521087332_698999429138481152_n.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_oc=AQnvX0BsXTDdghSzHax0QDCwbCOIC_Ydugq8YvmTOB8VE6d2QHGPHtEttkJKF99diNUwPgEDGWDePvLMiFvLiAFr&_nc_ht=scontent-ort2-1.xx&oh=ab8e462e00d9090685438a4cebd39031&oe=5F2D0D73'
      ],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 41.51779938, -88.17549896 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 1,
      date: '9-20-2019',
      type: 'C172',
      ident: '6343D',
      stops: [ 'KSET', 'KALN', 'KSET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 0.7,
      pic: 0,
      total: 0.7,
      remarks: '1st Lesson, taxi, takeoff, climbing turns and decents',
      planePic: 'https://qph.fs.quoracdn.net/main-qimg-4aa46167d516a2a3d13659337a316cd2',
      pictures: [
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/87889394_10217303989618995_7188407933485449216_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_oc=AQnvzaMsfGUQV728D1L4nX6UI-eGxkGMLm-V8JbJgEPAMaaxsaPbHHOhdnb4kSEMC4wt9TlW5r_4Ytjedpso871S&_nc_ht=scontent-ort2-1.xx&oh=4a072b5b56abe2ceaebe0f777c3d0d30&oe=5F2F2F8C'
      ],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.89030075, -90.04599762 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 2,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'KSET', 'KMYJ', 'KIJX', 'KSET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Long cross country!',
      planePic: 'http://www.stcharlesflyingservice.com/wp-content/uploads/2017/02/n65191-ext-1-1024x576.jpg',
      pictures: [
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/79192548_10216675178379107_7891289665167163392_o.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_oc=AQnSJtn0Ynk7TbD8f2uzUK5plKyR-ZN_o-N_Jr4wMKCcR2hzxe6-XqVxFF6YFpqmVGGPM1MkMnqyf7_2hUMtZvYK&_nc_ht=scontent-ort2-1.xx&oh=3f6a268c7bcc05b55e57a6070fdc81d9&oe=5F2F0EDF'
      ],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 39.15750122, -91.81829834 ],
        [ 39.77460098, -90.23829651 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 3,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 4,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: true
    },
    {
      id: 5,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 6,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: true
    },
    {
      id: 7,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 8,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 9,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 10,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 11,
      date: '12-13-2019',
      type: 'C172',
      ident: '63612',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 0,
      pic: 0.5,
      total: 0.5,
      remarks: 'First Solo!!!',
      planePic: 'http://www.stcharlesflyingservice.com/wp-content/uploads/2018/11/N63612-Skyhawk.jpg',
      pictures: [
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/79192548_10216675178379107_7891289665167163392_o.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_oc=AQnSJtn0Ynk7TbD8f2uzUK5plKyR-ZN_o-N_Jr4wMKCcR2hzxe6-XqVxFF6YFpqmVGGPM1MkMnqyf7_2hUMtZvYK&_nc_ht=scontent-ort2-1.xx&oh=3f6a268c7bcc05b55e57a6070fdc81d9&oe=5F2F0EDF'
      ],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 12,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 13,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 14,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 15,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 16,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 17,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 18,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
    },
    {
      id: 19,
      date: '6-15-2020',
      type: 'C172',
      ident: '65191',
      stops: [ 'SET', 'SET' ],
      night: 0,
      instrument: 0,
      simInstrument: 0,
      crossCountry: 0,
      dual: 1.5,
      pic: 0,
      total: 1.5,
      remarks: 'Slow flight, steep turns, S-turns, Power on/off stalls, soft field takeoff and landing, emergency decent',
      planePic: null,
      pictures: [],
      geolocation: [
        [ 38.92969894, -90.43000031 ],
        [ 38.92969894, -90.43000031 ],
      ],
      hasForeflightTrack: false
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
      setSelectedFlight(5)
    }
  })



  const geoLocation = selectedFlight != -1 ? logs.find(x => x.id === selectedFlight).geolocation : []
  const planePic = selectedFlight != -1 ? logs.find(x => x.id === selectedFlight).planePic : null
  const pictures = selectedFlight != -1 ? logs.find(x => x.id === selectedFlight).pictures: []



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