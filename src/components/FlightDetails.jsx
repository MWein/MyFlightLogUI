import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import ImageViewer from './ImageViewer'


import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'



const FlightDetails = ({ planePic, pictures }) => {
  const [ modalImages, setModalImages ] = useState([])
  const [ selectedImg, setSelectedImg ] = useState(-1)
  const [ displayModal, setDisplayModal ] = useState(false)



  const initiateModal = (selection, images) => {
    setModalImages(images)
    setSelectedImg(selection)
    setDisplayModal(true)
  }



  return (
    <Paper style={{ width: '300px', marginLeft: '20px', padding: '10px' }}>


      <Modal open={displayModal} onClose={() => setDisplayModal(false)} BackdropComponent={Backdrop} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Fade in={displayModal}>
          <img src={modalImages[selectedImg]} />
        </Fade>
      </Modal>



      <div style={{ background: 'green', height: '200px' }}>
        Map View
      </div>

      <ImageViewer images={[ planePic ]} onClick={img => initiateModal(img, [ planePic ])} />
      <ImageViewer images={pictures} onClick={img => initiateModal(img, pictures)} />
    </Paper>
  )
}

export default FlightDetails