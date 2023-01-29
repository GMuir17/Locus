'use client'
import { useEffect } from 'react'
import { Container, Box, Button } from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'
import Link from 'next/link'

const Home = () => {
    const { data } = useQuery(['roman-sites'], async () => {
        const res = await axios.get(`/api/sites`)
        return res.data
    })

    useEffect(() => {
        console.log('banana data', { data })
    }, [data])

    return (
        <Container maxWidth={false} sx={{ height: '100vh', py: 4, px: 4 }}>
            <Box sx={{ height: '15%' }}>
                <Button>
                    <Link href="/map">Go to map</Link>
                </Button>
            </Box>
        </Container>
    )
}

export default Home
