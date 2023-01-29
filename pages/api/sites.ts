import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                try {
                    const tempUrl = new URL(`${process.env.LAMBDA_ROOT}/sites`)

                    // tempUrl.searchParams.set('startdate', startDate as string)

                    const config = {
                        headers: { 'X-API-Key': process.env.AWS_API_KEY },
                    }

                    const sitesRequest = await axios.get(
                        tempUrl.toString(),
                        config
                    )
                    const sites = sitesRequest.data.body

                    res.status(200).send({ sites })
                    break
                } catch (err) {
                    res.status(403).send(err)
                }
                break
            default:
                res.setHeader('Allow', ['GET'])
                res.status(405).end(`Method ${req.method} Not Allowed`)
                break
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

export default handler
