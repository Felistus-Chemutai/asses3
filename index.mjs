import express from "express"
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
import { addJsonData, getProducts, newProduct , updateProduct, deleteProduct} from "./json/json.js";
// GET method
app.get("/products", async (req, res) => {
  const items = await getProducts();
  if (items) {
    res.status(200).json(items).end();
  } else {
    res.status(400).send("not found").end();
  }
});

// POST method
app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    await newProduct(product);
    res.status(200).send(product).end();
  } catch (error) {
    res.status(404).send(error);
  }
});

// PUT method
app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
    const result = await updateProduct(productId, updatedProduct);

    if (result) {
      res.status(200).json(result).end();
    } else {
      res.status(404).send("Product not found").end();
    }
  } catch (error) {
    res.status(500).send("Internal Server Error").end();
  }
});
// DELETE method
app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await deleteProduct(productId);

    if (result) {
      res.status(200).send("Product deleted successfully").end();
    } else {
      res.status(404).send("Product not found").end();
    }
  } catch (error) {
    res.status(500).send("Internal Server Error").end();
  }
});

app.listen(PORT, () => {
  console.log(`The port is running on :${PORT}`);
});

addJsonData();
