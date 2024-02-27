import express from "express";
import router from "./routes/product.mjs";
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
import {
  addJsonData,
  getProducts,
  newProduct,
  updateProduct,
  deleteProduct,
  patchProducts,
} from "./json/json.js";



app.listen(PORT, () => {
  console.log(`The port is running on :${PORT}`);
});

addJsonData();

