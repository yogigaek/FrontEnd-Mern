import Input from "./../../components/Input/index";
import "./index.scss";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tambah = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/v4/product`, {
        name: name,
        price: price,
        stock: stock,
        status: status,
      });
      console.log(name, price, stock, status);
      alert(`berhasil simpan data`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveProduct}>
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
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
