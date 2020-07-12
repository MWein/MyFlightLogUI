import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import ImageViewer from './ImageViewer'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'

import 'ol/ol.css'
import {Map, View, Feature} from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'


import uniq from 'lodash/uniq'


const FlightDetails = ({ foreflightTrack, geoLocation, planePic, pictures }) => {
  const latlong2Meters = (lat, lon) => {
    var x = lon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return [x, y]
  }


  const [ map, setMap ] = useState()
  const [ vectorSource, setVectorSource ] = useState()
  const [ view, setView ] = useState()

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



  useEffect(() => {
    // No need for a conditional beyond this because state is not changed
    if (vectorSource) {
      const convertedPositions = geoLocation.map(x => latlong2Meters(x[0], x[1]))
      vectorSource.clear()

      // Single Point
      if (uniq(convertedPositions.map(x => JSON.stringify(x))).length === 1) {
        const firstPoint = convertedPositions[0]
        vectorSource.addFeature(new Feature(new Point(firstPoint)))

        const feature = vectorSource.getFeatures()[0]
        const point = feature.getGeometry()
        const size = map.getSize()

        view.centerOn(point.getCoordinates(), size, [size[0] / 2, size[1] / 2])
        view.setZoom(12)
      } else {
        // Add polygon
        vectorSource.addFeature(new Feature(new LineString(convertedPositions)))

        // Add points, stringify to remove duplicates
        uniq(convertedPositions.map(x => JSON.stringify(x))).map(x => JSON.parse(x)).map(x => {
          vectorSource.addFeature(new Feature(new Point(x)))
        })
  
        const feature = vectorSource.getFeatures()[0]
        const polygon = feature.getGeometry()
        view.fit(polygon, { padding: [ 40, 40, 40, 40 ] })
      }
    }
  })



  useEffect(() => {
    if (!map) {
      const startingPosition = latlong2Meters(38.92969894, -90.43000031)
      const vS = new VectorSource()

      const newView = new View({
        center: startingPosition,
        zoom: 13
      })

      const newMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          new VectorLayer({
            source: vS,
          })
        ],
        view: newView
      })

      setMap(newMap)
      setView(newView)
      setVectorSource(vS)
    }
  })



  return (
    <Paper style={{ height: 'min-content', width: '265px', marginLeft: '20px', padding: '10px' }}>
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


      <div id='map' style={{ background: 'green', height: '200px' }} />
      <ImageViewer images={[ planePic ]} onClick={img => initiateModal(img, [ planePic ])} />
      <ImageViewer images={pictures} onClick={img => initiateModal(img, pictures)} />
    </Paper>
  )
}

export default FlightDetails