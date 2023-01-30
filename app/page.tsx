'use client'
import { Container, Box, Typography, Card, Grid } from '@mui/material'
import Link from 'next/link'

const Home = () => {
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
