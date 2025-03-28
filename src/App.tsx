import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

function App() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (mapRef.current) return // initialize map only once

    mapboxgl.accessToken = 'pk.eyJ1IjoieGVyYWNvbiIsImEiOiJjbThrams2b3Qwc2pnMmtzMzRvZGVjMjN0In0.aI0u4u4pKMQ3ut7ubrWYGQ'

    if (!mapboxgl.supported()) {
      setMapError("Your browser does not support Mapbox GL")
      return
    }
    if (mapContainerRef.current) {
      try {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [24.7536, 59.4370], // Tallinn coordinates
          zoom: 12
        })

        mapRef.current.on('load', () => {
          console.log('Map loaded successfully')
        })

        mapRef.current.on('error', (e) => {
          console.error('Mapbox error:', e)
          setMapError(`An error occurred: ${e.error.message || 'Unknown error'}`)
        })
      } catch (error) {
        console.error('Error initializing map:', error)
        setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  return (
    <>      
      {mapError ? (
        <div className="error-message">{mapError}</div>
      ) : (
        <div id='map-container' ref={mapContainerRef}/>
      )}
    </>
  )
}

export default App
