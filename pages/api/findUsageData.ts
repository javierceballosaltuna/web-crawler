import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGOURI;

const client = new MongoClient(uri ?? "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const useCallForBobinas = async (
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  try {
    const connection = await client.connect();
    const db = connection.db("StackBuilders");

    const dbData = await db.collection("UsageData").find().toArray();

    res?.json(dbData);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};

export default useCallForBobinas;
