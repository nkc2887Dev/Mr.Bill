import React, { useEffect, useState } from "react";
import ProductsTable from "./ProductsTable";

const Products = () => {
  const [products, setProducts] = useState<{ name: string; price: string }[]>([]);
  const [product, setProduct] = useState({ name: "", price: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleAddOrUpdate = () => {
    if (product.name && product.price) {
      const updatedProducts = editIndex !== null ? products.map((p, i) => (i === editIndex ? product : p)) : [...products, product];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProduct({ name: "", price: "" });
      setEditIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleEdit = (index: number) => {
    const productToEdit = products[index];
    setProduct(productToEdit);
    setEditIndex(index);
  };

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-4">{editIndex !== null ? "Edit" : "Add New"} Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrUpdate();
          }}
        >
          <div className="form-row">
            <div className="form-group col-lg-5">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                placeholder="Enter your product name"
                value={product.name}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-lg-5">
              <label htmlFor="productPrice">Price</label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-lg-2 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <ProductsTable
        products={products}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default Products;
