import React, { useEffect, useState } from 'react'
import 'ol/ol.css'
import {Map, View, Feature} from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import OSM from 'ol/source/OSM'
import superagent from 'superagent'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import { Icon, Style } from 'ol/style'

import airportIcon from '../data/airportIcon.svg'



const VisitedAirports = () => {
  const [ map, setMap ] = useState()

  const [ loaded, setLoaded ] = useState(false)
  const [ visitedAirports, setVisitedAirports ] = useState([])



  const loadAirports = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/visited-airports`)
    const airportData = JSON.parse(response.text)

    console.log(airportData)

    setLoaded(true)
    setVisitedAirports(airportData)
  }


  useEffect(() => {
    if (!loaded) {
      loadAirports()
    }
  })

  // Set up map
  useEffect(() => {
    if (!map && visitedAirports.length > 0) {
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 450],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 0.1,
          src: airportIcon
        })
      })


      const vS = new VectorSource()
      visitedAirports.map(x => {
        console.log(x)

        const airportFeature = new Feature({
          geometry: new Point([x.lat, x.long]),
          name: x.name,
          // population: 4000,
          // rainfall: 500
        })

        airportFeature.setStyle(iconStyle)

        vS.addFeature(airportFeature)
      })


      const view = new View({
        center: [0, 0],
        zoom: 0
      })

      const newMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          new VectorLayer({
            source: vS,
          }),
        ],
        view
      })

      view.fit(vS.getExtent(), { padding: [ 70, 70, 70, 70 ] })

      setMap(newMap)
    }
  })


  return (
    <div style={{ height: '100%' }}>
      <div id="map" />
    </div>
  )
}

export default VisitedAirports