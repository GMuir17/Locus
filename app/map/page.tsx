'use client'
import { useCallback, useState } from 'react'
import {
    Container,
    Box,
    Typography,
    Card,
    CardActions,
    CardContent,
    Button,
    Grid,
    IconButton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
    Map,
    NavigationControl,
    GeolocateControl,
    FullscreenControl,
    Source,
    Layer,
} from 'react-map-gl'
import { useQuery } from 'react-query'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { FillLayer } from 'react-map-gl'
import Link from 'next/link'

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
        <Container
            maxWidth={false}
            sx={{
                height: '100vh',
                py: 4,
                px: 4,
                backgroundImage: `url(/lotsofdots.webp)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 2,
                }}
            >
                <Link href="/">
                    <IconButton>
                        <ArrowBackIcon />
                    </IconButton>
                </Link>

                <Typography variant="h4">
                    Where were the Romans in Scotland?
                </Typography>
            </Box>
            <Grid spacing={2} container sx={{ height: '90%' }}>
                <Grid item sm={8} xs={12}>
                    <Map
                        initialViewState={{
                            longitude: -4.25,
                            latitude: 55.860916,
                            zoom: 7.5,
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                        onMouseEnter={onHover}
                        interactiveLayerIds={['roman-data']}
                        style={{
                            borderRadius: '10px',
                            height: '100%',
                            width: '100%',
                            boxShadow:
                                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                        }}
                    >
                        <NavigationControl />
                        <FullscreenControl />
                        <GeolocateControl />

                        {data && (
                            <Source
                                id="roman-data"
                                type="geojson"
                                data={data.sites}
                            >
                                <Layer {...dataLayer} />
                            </Source>
                        )}
                    </Map>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Card
                        sx={{ width: '100%', px: 2, py: 2, minHeight: '50vh' }}
                    >
                        <CardContent>
                            <Typography variant="h4" color="text.secondary">
                                Hover over a purple site to see more information
                            </Typography>
                        </CardContent>
                        {hoverInfo && (
                            <>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 20 }}
                                        color="text.secondary"
                                    >
                                        Class
                                    </Typography>

                                    <Typography
                                        sx={{ mb: 2, fontSize: 20 }}
                                        color="text.primary"
                                    >
                                        {hoverInfo.feature.properties.class}
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: 20 }}
                                        color="text.secondary"
                                    >
                                        Type
                                    </Typography>

                                    <Typography
                                        sx={{ mb: 2, fontSize: 20 }}
                                        color="text.primary"
                                    >
                                        {hoverInfo.feature.properties.type}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        href={hoverInfo.feature.properties.link}
                                        target="_blank"
                                    >
                                        Go to source
                                    </Button>
                                </CardActions>
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MapPage
