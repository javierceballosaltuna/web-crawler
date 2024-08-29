import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.NEXT_PUBLIC_MONGOURI;
const client = new MongoClient(uri ?? '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const InsertOneUsageLog = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const connection = await client.connect();
    const db = connection.db("StackBuilders");

    const result = await db.collection("UsageData").insertOne(req.body);
    res.send(result);
  } catch (e) {
    console.error(e, "ERROR ENDPOINT");
    client.close();
  } finally {
    client.close();
  }
//   return { data, error };
};

export default InsertOneUsageLog;
