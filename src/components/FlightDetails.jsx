import React from 'react'
import Paper from '@material-ui/core/Paper'


const FlightDetails = () => {


  return (
    <Paper style={{ width: '300px', marginLeft: '20px', padding: '10px' }}>
      <div style={{ background: 'green', height: '200px' }}>
        Map View
      </div>


      <div style={{ background: 'green', height: '200px', marginTop: '10px' }}>
        Picture of plane
      </div>


      <div style={{ background: 'green', height: '200px', marginTop: '10px' }}>
        Pictures if any
      </div>
    </Paper>
  )
}

export default FlightDetails