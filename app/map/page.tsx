'use client'
import { useEffect, useCallback, useState } from 'react'
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

export const dataLayer: FillLayer = {
    id: 'roman-data',
    type: 'fill',
    paint: {
        'fill-color': '#7851a9',
        'fill-opacity': 0.8,
    },
}

const MapPage = () => {
    const [hoverInfo, setHoverInfo] = useState(null)

    const { data } = useQuery(['roman-sites'], async () => {
        const res = await axios.get(`/api/sites`)
        return res.data
    })

    useEffect(() => {
        console.log('banana data', { data: data?.sites })
    }, [data])

    const onHover = useCallback((event) => {
        const example = {
            feature: {
                type: 'Feature',
                properties: {
                    class: 'DEFENCE',
                    type: 'TEMPORARY CAMP(S) (ROMAN)',
                    link: 'https://canmore.org.uk/site/46972/',
                    area: '266987.3933018324',
                },
            },
            x: 568.9070170278131,
            y: 209.9656829100892,
        }
        // console.log('banana event', { event })
        const { features, x, y } = event
        const hoveredFeature = features && features[0]
        hoveredFeature &&
            console.log('banana hover', { event, feature: features[0] })
        // prettier-ignore
        setHoverInfo(hoveredFeature && {feature: hoveredFeature});
    }, [])

    useEffect(() => {
        console.log('banana hoverInfo', { hoverInfo })
    }, [hoverInfo])

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
