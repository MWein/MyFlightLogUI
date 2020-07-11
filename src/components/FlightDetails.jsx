import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import ImageViewer from './ImageViewer'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'



const FlightDetails = ({ planePic, pictures }) => {
  const [ modalImages, setModalImages ] = useState([])
  const [ selectedImg, setSelectedImg ] = useState(-1)
  const [ displayModal, setDisplayModal ] = useState(false)


  const initiateModal = (selection, images) => {
    setModalImages(images)
    setSelectedImg(selection)
    setDisplayModal(true)
  }


  const cycleModalImage = newSelection => {
    if (newSelection < 0) {
      setSelectedImg(0)
    } else if (newSelection >= modalImages.length) {
      setSelectedImg(modalImages.length - 1)
    } else {
      setSelectedImg(newSelection)
    }
  }



  return (
    <Paper style={{ height: '620px', width: '300px', marginLeft: '20px', padding: '10px' }}>
      <Modal open={displayModal} onClose={() => setDisplayModal(false)} BackdropComponent={Backdrop} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Fade in={displayModal}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
              selectedImg != 0 &&
                <div onClick={() => cycleModalImage(selectedImg - 1)} style={{ borderRadius: '4px', left: '-33px', opacity: 0.7, background: 'black', position: 'absolute', width: '25px', height: '200px', display: 'flex', alignItems: 'center' }}>
                  <NavigateBefore style={{ fill: 'white' }} />
                </div>
            }

            <img src={modalImages[selectedImg]} style={{ maxHeight: '800px', maxWidth: '1700px' }} />

            {
              selectedImg != modalImages.length - 1 &&
                <div onClick={() => cycleModalImage(selectedImg + 1)} style={{ borderRadius: '4px', right: '-33px', opacity: 0.7, background: 'black', position: 'absolute', width: '25px', height: '200px', display: 'flex', alignItems: 'center' }}>
                  <NavigateNext style={{ fill: 'white' }} />
                </div>
            }

            {
              modalImages.length > 1 &&
                <div style={{ color: 'white', borderRadius: '4px', bottom: '-33px', right: '0px', opacity: 0.7, background: 'black', position: 'absolute', width: '80px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedImg + 1} / {modalImages.length}
                </div>
            }
          </div>
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