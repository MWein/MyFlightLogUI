import React, { useEffect, useState } from 'react'
import 'ol/ol.css'
import {Map, View, Feature} from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import OSM from 'ol/source/OSM'
import superagent from 'superagent'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import { Icon, Style } from 'ol/style'
import Overlay from 'ol/Overlay'
import airportIcon from '../data/airportIcon.svg'


// For sectional chart layer
// import ImageLayer from 'ol/layer/Image'
// import ImageWMS from 'ol/source/ImageWMS'



const VisitedAirports = () => {
  const [ map, setMap ] = useState(null)

  const [ loaded, setLoaded ] = useState(false)
  const [ visitedAirports, setVisitedAirports ] = useState([])



  const loadAirports = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/visited-airports`)
    const airportData = JSON.parse(response.text)

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
        const airportFeature = new Feature({
          geometry: new Point([x.lat, x.long]),
          ident: x.ident,
          name: x.name,
          lastVisited: x.lastVisited
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
          // new ImageLayer({
          //   source: new ImageWMS({
          //     url: 'http://wms.chartbundle.com/wms',
          //     params: {'LAYERS': 'sec'},
          //   })
          // }),
          new VectorLayer({
            source: vS,
          }),
        ],
        view
      })

      view.fit(vS.getExtent(), { padding: [ 170, 170, 170, 170 ] })


      const element = document.getElementById('popup')
      const popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      })
      newMap.addOverlay(popup)


      newMap.on('singleclick', event => {
        const feature = newMap.forEachFeatureAtPixel(event.pixel, feature => feature)
        if (feature) {
          const content = document.getElementById('popup-content')

          content.innerHTML = `<div>${feature.get('ident')} - ${feature.get('name')}</div><div style="margin-top: 5px;">Last Visited: ${feature.get('lastVisited')}</div>`

          popup.setPosition(feature.getGeometry().getCoordinates())
        } else {
          popup.setPosition(undefined)
        }
      })


      newMap.on('pointermove', event => {
        const pixel = newMap.getEventPixel(event.originalEvent)
        const hit = newMap.hasFeatureAtPixel(pixel)
        document.getElementById('map').style.cursor = hit ? 'pointer' : null
      })


      setMap(newMap)
    }
  })


  return (
    <div style={{ height: 'calc(100% - 75px)' }}>
      <div id="map" />
      <div id='popup' style={{ whiteSpace: 'nowrap', position: 'absolute', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', padding: '15px', borderRadius: '10px', border: '1px solid #cccccc', bottom: '12px', left: '-50px' }}>
        <div id="popup-content"></div>
      </div>
    </div>
  )
}

export default VisitedAirports