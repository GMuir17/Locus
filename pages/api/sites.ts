import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        try {
          // const tempUrl = new URL(
          //     'https://8jjhtztk91.execute-api.eu-west-2.amazonaws.com/production/lodges'
          // )

          // tempUrl.searchParams.set('startdate', startDate as string)
          // tempUrl.searchParams.set('numbernights', nights as string)
          // tempUrl.searchParams.set('sleeps', guests as string)
          // tempUrl.searchParams.set('features', features as string)
          // tempUrl.searchParams.set('bedrooms', bedrooms as string)
          // tempUrl.searchParams.set('bathrooms', bathrooms as string)
          // tempUrl.searchParams.set('beds', beds as string)

          // const config = {
          //     headers: { 'X-API-Key': process.env.LODGES_API_KEY },
          // }

          // const lodgesRequest = await axios.get(
          //     tempUrl.toString(),
          //     config
          // )
          // const lodges = lodgesRequest.data.body

          res.status(200).send({ message: "hello" });
          break;
        } catch (err) {
          res.status(403).send(err);
        }
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default handler;
