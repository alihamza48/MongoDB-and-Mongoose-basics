const MongoClient = require("mongodb").MongoClient;
const { ServerApiVersion } = require("mongodb");
const url =
  "mongodb+srv://alihamza:Theblues04@cluster0.pnjuo7i.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }
  await client.close();
  res.json(newProduct);
};

const getProduct = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
    res.json({ message: "Got data." });
  } catch (error) {
    return res.json({ message: "Could not get data." });
  }
  await client.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;
