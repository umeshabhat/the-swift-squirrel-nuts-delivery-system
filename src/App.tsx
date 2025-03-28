import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoieGVyYWNvbiIsImEiOiJjbThrams2b3Qwc2pnMmtzMzRvZGVjMjN0In0.aI0u4u4pKMQ3ut7ubrWYGQ'

    if (!mapboxgl.supported()) {
      setMapError("Your browser does not support Mapbox GL")
      return
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [24.7536, 59.4370], // Tallinn coordinates
      zoom: 16.2,
      pitch: 75,
      bearing: -170,
      config: {        
        basemap: {          
          show3dObjects: true // Show all of the 3D layers such as landmarks, trees, and 3D extrusions.
        }
      }
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])


  return (
    <>
      <div id='map-container' ref={mapContainerRef} />
    </>
  )
}

export default App
