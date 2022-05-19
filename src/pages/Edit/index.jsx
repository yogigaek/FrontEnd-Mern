import Input from "./../../components/Input/index";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(`http://localhost:5000/api/v4/product/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
      setStock(response.data.stock);
      setStatus(response.data.status);
    };
    getProductById();
  },[id])

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/v4/product/${id}`, {
        name: name,
        price: price,
        stock: stock,
        status: status,
      });
      console.log(name, price, stock, status);
      alert(`berhasil update data`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProduct}>
          <Input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Produk..."
            label="Nama"
          />
          <Input
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga Produk..."
            label="Harga"
          />
          <Input
            name="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock Produk..."
            label="Stock"
          />
          <Input
            name="status"
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            label="Active"
          />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
