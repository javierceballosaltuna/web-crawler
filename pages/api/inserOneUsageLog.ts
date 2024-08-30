import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
