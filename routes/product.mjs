import { Router } from "express";
const router = Router()
router.get("/products", async (req, res) => {
    const items = await getProducts();
    if (items) {
      res.status(200).json(items).end();
    } else {
      res.status(400).send("not found").end();
    }
  });
  
  // POST method
  router.post("/products", async (req, res) => {
    try {
      const product = req.body;
      await newProduct(product);
      res.status(200).send(product).end();
    } catch (error) {
      res.status(404).send(error);
    }
  });
  
  // PUT method
  router.put("/products/:id", async (req, res) => {
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
  
  // PATCH method
  router.patch("/products/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const patchedProduct = req.body;
      const result = await updateProduct(productId, patchedProduct);
  
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
  router.delete("/products/:id", async (req, res) => {
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
  export default router