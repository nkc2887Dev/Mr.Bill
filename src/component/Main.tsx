import React, { useEffect, useState } from "react";

const Main = () => {
  const [products, setProducts] = useState<{ name: string; price: string; unit: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [addedProducts, setAddedProducts] = useState<{ name: string; price: string; }[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<{ name: string; price: string; unit: string } | null>(null);

  useEffect(() => {
    const storedItems = localStorage.getItem("products");
    const billing = localStorage.getItem("billing");

    if (storedItems) {
      setProducts(JSON.parse(storedItems));
    }

    if (billing) {
      setAddedProducts(JSON.parse(billing));
    }
  }, []);

  useEffect(() => {
    const lowerCasedTerm = searchTerm.toLowerCase();
    const foundProduct = searchTerm
      ? products.find(product => product.name.toLowerCase() === lowerCasedTerm) || null
      : null;

    setFilteredProduct(foundProduct);
  }, [searchTerm, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = (product: { name: string; price: string; }) => {
    if (!addedProducts.find(p => p.name === product.name)) {
      const updatedProducts = [...addedProducts, product];
      setAddedProducts(updatedProducts);
      localStorage.setItem("billing", JSON.stringify(updatedProducts));
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const totalPrice = addedProducts.reduce((acc, val) => acc + parseFloat(val.price), 0);
    setTotal(totalPrice);
  }, [addedProducts]);

  return (
    <div className="container my-5">
      <h2 className="my-4">Search Product Name</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <div className="form-group col-lg-5">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your product name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </form>

      {filteredProduct && (
        <>
          <h2 className="my-4">Matched Product</h2>
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price (Rs)</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{filteredProduct.name}</td>
                <td>{filteredProduct.price}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddProduct(filteredProduct)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <h2 className="my-4">Added Product</h2>
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {addedProducts.length > 0 ? (
            addedProducts.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mr-auto d-flex justify-content-end">
        <h3>Total Price: Rs {total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Main;
