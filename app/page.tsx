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
} from '@mui/material'
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

const Home = () => {
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

    // const styles = {
    //     buttonBase: {
    //         my: 2,
    //         mx: 3,
    //         display: 'block',
    //         color: mode === 'dark' ? 'white' : 'black',
    //         '&:hover': {
    //             backgroundColor: 'rgba(255,255,255,0.2)',
    //         },
    //     },
    //     active: {
    //         backgroundColor: 'rgba(255,0,0,0.2)',
    //     },
    // }

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
                    paddingTop: 2,
                    paddingBottom: 10,
                }}
            >
                <Typography variant="h4">
                    Where were the Romans in Scotland?
                </Typography>
            </Box>
            <Grid
                spacing={2}
                container
                sx={{ height: '90%', justifyContent: 'center' }}
            >
                <Grid item sm={4} xs={12}>
                    <Link href="/map" style={{ textDecoration: 'none' }}>
                        <Card
                            sx={{
                                py: 2,
                                px: 2,
                                display: 'block',
                                '&:hover': {
                                    backgroundColor: 'rgba(110, 114, 117, 0.8)',
                                },
                            }}
                        >
                            <Typography variant="h4" color="text.secondary">
                                View via Client Side Rendering
                            </Typography>
                        </Card>
                    </Link>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Link href="/map-static" style={{ textDecoration: 'none' }}>
                        <Card
                            sx={{
                                py: 2,
                                px: 2,
                                display: 'block',
                                '&:hover': {
                                    backgroundColor: 'rgba(110, 114, 117, 0.8)',
                                },
                            }}
                        >
                            <Typography variant="h4" color="text.secondary">
                                View via Static Site Generation
                            </Typography>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home
