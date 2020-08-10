import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'
import PropTypes from 'prop-types'


const ImageViewer = ({ images = [], onClick, style = {} }) => {
  // To handle edge case where planePic is null
  const initialImages = images.filter(x => x)

  const [ showNavButtons, setShowNavButtons ] = useState(false)
  const [ displayImages, setDisplayImages ] = useState(initialImages)
  const [ selectedImg, setSelectedImg ] = useState(0)


  useEffect(() => {
    // To handle event when images from props no longer match state
    if (initialImages.join(',') != displayImages.join(',')) {
      setDisplayImages(initialImages)
      setSelectedImg(0)
    }
  })


  const cycleImage = newSelection => {
    if (newSelection < 0) {
      setSelectedImg(0)
    } else if (newSelection >= displayImages.length) {
      setSelectedImg(displayImages.length - 1)
    } else {
      setSelectedImg(newSelection)
    }
  }


  const leftNavButtonVisibility = () => {
    if (!showNavButtons) {
      return 'hidden'
    }

    return selectedImg === 0 || displayImages.length === 0 ? 'hidden' : 'visible'
  }

  const rightNavButtonVisibility = () => {
    if (!showNavButtons) {
      return 'hidden'
    }

    return selectedImg === displayImages.length - 1 || displayImages.length === 0 ? 'hidden' : 'visible'
  }



  return (
    <Paper onMouseEnter={() => setShowNavButtons(true)} onMouseLeave={() => setShowNavButtons(false)} style={{ ...style, position: 'relative', height: '200px', display: 'flex', alignItems: 'center' }}>
      {
        displayImages && displayImages.length > 0 ?
          <img onClick={() => onClick(selectedImg)} src={displayImages[selectedImg]} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} /> :
          <div style={{ textAlign: 'center', width: '100%' }}>- No Images -</div>
      }

      <div onClick={() => cycleImage(selectedImg - 1)} style={{ visibility: leftNavButtonVisibility(), borderRadius: '4px', opacity: 0.7, background: 'black', position: 'absolute', width: '20px', height: '200px', display: 'flex', alignItems: 'center' }}>
        <NavigateBefore style={{ fill: 'white' }} />
      </div>

      <div onClick={() => cycleImage(selectedImg + 1)} style={{ visibility: rightNavButtonVisibility(), borderRadius: '4px', right: '0px', opacity: 0.7, background: 'black', position: 'absolute', width: '20px', height: '200px', display: 'flex', alignItems: 'center' }}>
        <NavigateNext style={{ fill: 'white' }} />
      </div>

    </Paper>
  )
}


ImageViewer.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
  style: PropTypes.object,
}


export default ImageViewer