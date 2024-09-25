import React from "react";

interface Product {
  name: string;
  price: string;
}

interface ProductsTableProps {
  products: Product[];
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, handleDelete, handleEdit }) => {
  return (
    <div className="container">
      <h2 className="my-4">Product List</h2>
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
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-3"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center"
              >
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
