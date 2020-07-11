import React from 'react'
import Paper from '@material-ui/core/Paper'


const FlightDetails = ({ planePic }) => {



  return (
    <Paper style={{ width: '300px', marginLeft: '20px', padding: '10px' }}>
      <div style={{ background: 'green', height: '200px' }}>
        Map View
      </div>


      <Paper style={{ overflow: 'hidden', height: '200px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          {
            planePic ?
              <center>
                <img src={planePic} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </center> :
              <div style={{ textAlign: 'center', width: '100%' }}>- No Image -</div>
          }
      </Paper>


      <div style={{ background: 'green', height: '200px', marginTop: '10px' }}>
        Pictures if any
      </div>
    </Paper>
  )
}

export default FlightDetails