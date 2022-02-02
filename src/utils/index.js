const mapProductsModel = (products) => ([
  {
    category: "Fruit and Vegetables",
    items: products
      .filter((product) => product.category.toLowerCase() === "fruit and vegetables")
      .map((product) => ({ _id: product._id, name: product.name })),
  },
  {
    category: "Meat and Fish",
    items: products
      .filter((product) => product.category.toLowerCase() === "meat and fish")
      .map((product) => ({ _id: product._id, name: product.name })),
  },
  {
    category: "Beverages",
    items: products
      .filter((product) => product.category.toLowerCase() === "beverages")
      .map((product) => ({ _id: product._id, name: product.name })),
  },
]);

module.exports = { mapProductsModel }