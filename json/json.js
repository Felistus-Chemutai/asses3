import express from "express";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

const uniquieId = uuid(); // Fix the typo in uniqueId declaration

const addJsonData = async () => {
  try {
    const filePath = path.join("productsData.json");

    if (!fs.existsSync(filePath)) {
      await fsPromises.writeFile(filePath, "[]", { encoding: "utf8" });
      console.log("file created successfully");
    } else {
      console.log(`file exists`);
    }
  } catch (error) {
    console.log(`Error creating the folder: ${error.message}`);
  }
};

function getProducts() {
  const fileContent = fs.readFileSync(path.join("productsData.json"), {
    encoding: "utf8",
  });

  const products = JSON.parse(fileContent);
  return products;
}

/**
 *
 * @param {{price: number, name: string, description: string}} product
 */
async function newProduct(product) {
  const products = getProducts();
  product.id = uuid();
  products.push(product);

  try {
    await fsPromises.writeFile(
      path.join("productsData.json"),
      JSON.stringify(products),
      { encoding: "utf8" }
    );
  } catch (error) {
    console.error(`Error writing to file: ${error.message}`);
  }
}

/**
 *
 * @param {string} productId
 */
async function updateProduct(productId, updatedProduct) {
  const products = getProducts();
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    try {
      await fsPromises.writeFile(
        path.join("productsData.json"),
        JSON.stringify(products),
        { encoding: "utf8" }
      );

      return products[productIndex];
    } catch (error) {
      console.error(`Error writing to file: ${error.message}`);
    }
  }

  return null;
}
async function deleteProduct(productId) {
  const products = getProducts();
  const updatedProducts = products.filter((product) => product.id !== productId);

  try {
    await fsPromises.writeFile(
      path.join("productsData.json"),
      JSON.stringify(updatedProducts),
      { encoding: "utf8" }
    );

    return true;
  } catch (error) {
    console.error(`Error writing to file: ${error.message}`);
    return false;
  }
}

const patchProducts = async(product)=>{
  const products = getProducts();
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...product };

    try {
      await fsPromises.writeFile(
        path.join("productsData.json"),
        JSON.stringify(products),
        { encoding: "utf8" }
      );

      return products[productIndex];
    } catch (error) {
      console.error(`Error writing to file: ${error.message}`);
    }
  }

  return null;
}

export { addJsonData, getProducts, newProduct, updateProduct, deleteProduct,patchProducts};
