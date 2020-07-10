import React, { useEffect, useState } from 'react'
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


const MapPage = () => {
  const [ text, setText ] = useState('Hi')
  const [ map, setMap ] = useState()

  console.log('You shouldnt fucking see me')


  useEffect(() => {
    if (!map) {
      const newMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 0
        })
      })

      setMap(newMap)
    }
  })


  const handleChange = value => {
    setText(value)
  }


  return (
    <div style={{ height: '500px' }}>
      <div id="map" />

      <input type="text" value={text} onChange={event => handleChange(event.target.value)} />
    </div>
  )
}

export default MapPage