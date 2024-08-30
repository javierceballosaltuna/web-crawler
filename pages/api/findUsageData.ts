import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ServerApiVersion } from "mongodb";

// Please ask me for username and password so you can connect to my mongodb (your user is already created)
const uri =
  "mongodb+srv://<username>:<password>@clusterfj.lkwpogu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFJ";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const findUsageData = async (req?: NextApiRequest, res?: NextApiResponse) => {
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

export default findUsageData;
