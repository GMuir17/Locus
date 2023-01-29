'use client'
import { useCallback, useState } from 'react'
import { Container, Box } from '@mui/material'
import {
    Map,
    NavigationControl,
    useControl,
    FullscreenControl,
    Source,
    Layer,
    MapRef,
} from 'react-map-gl'
import { useQuery } from 'react-query'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { FillLayer } from 'react-map-gl'

const dataLayer: FillLayer = {
    id: 'roman-data',
    type: 'fill',
    paint: {
        'fill-color': '#7851a9',
        'fill-opacity': 0.8,
    },
}

const MapPage = () => {
    const [hoverInfo, setHoverInfo] = useState<any>(null)

    const { data } = useQuery(['roman-sites'], async () => {
        const res = await axios.get(`/api/sites`)
        return res.data
    })

    const onHover = useCallback((event: any) => {
        const { features } = event
        const hoveredFeature = features && features[0]
        setHoverInfo(hoveredFeature && { feature: hoveredFeature })
    }, [])

    return (
        <Container maxWidth={false} sx={{ height: '100vh', py: 4, px: 4 }}>
            <Box sx={{ height: '15%' }}>A nice bit of explainer</Box>
            <Box sx={{ display: 'flex', height: '70%' }}>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {data?.sites && (
                        <Map
                            initialViewState={{
                                longitude: -4.25,
                                latitude: 55.860916,
                                zoom: 7,
                            }}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxAccessToken={
                                process.env.NEXT_PUBLIC_MAPBOX_TOKEN
                            }
                            onMouseEnter={onHover}
                            interactiveLayerIds={['roman-data']}
                        >
                            <Source
                                id="roman-data"
                                type="geojson"
                                data={data.sites}
                            >
                                <Layer {...dataLayer} />
                            </Source>
                        </Map>
                    )}
                </Box>
                <Box sx={{ width: '30%' }}>
                    {hoverInfo && (
                        <>
                            <div>
                                Class: {hoverInfo.feature.properties.class}
                            </div>
                            <div>Type: {hoverInfo.feature.properties.type}</div>
                            <div>link: {hoverInfo.feature.properties.link}</div>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default MapPage
