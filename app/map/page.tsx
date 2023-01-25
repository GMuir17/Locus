'use client'
import { Container, Box } from '@mui/material'
import Map, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { exampleData } from './exampleData.ts'

const MAPBOX_TOKEN =
    'pk.eyJ1IjoiZ2FyeW11aXIxNyIsImEiOiJjbGRhcGY2YnUwMnJpM25ucG9hbHhiNm55In0.z201qPKYa8T4KHQEFUMT3A' // Set your mapbox token here

const layerStyle = {
    id: 'example-data',
    type: 'fill',
    paint: {
        'fill-color': '#ff2bff',
        'fill-opacity': 0.8,
    },
}

const MapPage = () => {
    console.log('banana exampleData', { exampleData })
    return (
        <Container maxWidth={false} sx={{ height: '100vh', py: 4, px: 4 }}>
            <Box sx={{ height: '15%' }}>A nice bit of explainer</Box>
            <Box sx={{ display: 'flex', height: '70%' }}>
                <Box sx={{ height: '100%', width: '100%' }}>
                    <Map
                        initialViewState={{
                            longitude: -4.25,
                            latitude: 55.860916,
                            zoom: 5.6,
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={MAPBOX_TOKEN}
                    >
                        <Source
                            id="my-data"
                            type="geojson"
                            data={exampleData.polygons}
                        >
                            <Layer {...layerStyle} />
                        </Source>
                    </Map>
                </Box>
                <Box sx={{ width: '30%' }}>More details about selected</Box>
            </Box>
        </Container>
    )
}

export default MapPage
