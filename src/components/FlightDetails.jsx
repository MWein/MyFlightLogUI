import React from 'react'
import Paper from '@material-ui/core/Paper'
import ImageViewer from './ImageViewer'


const FlightDetails = ({ planePic, pictures }) => {


  return (
    <Paper style={{ width: '300px', marginLeft: '20px', padding: '10px' }}>
      <div style={{ background: 'green', height: '200px' }}>
        Map View
      </div>


      {/* <Paper style={{ height: '200px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
        {
          planePic ?
            <img src={planePic} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', maxHeight: '200px' }} /> :
            <div style={{ textAlign: 'center', width: '100%' }}>- No Image -</div>
        }
      </Paper> */}


      <ImageViewer images={[ planePic ]} />

      <ImageViewer images={pictures} />

    </Paper>
  )
}

export default FlightDetails