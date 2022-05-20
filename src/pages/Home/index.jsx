import { Link } from "react-router-dom";
import "./index.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircularSplit } from "spinners-react"

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState(``);
  const [error, seterror] = useState(true);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true)
    const response = await axios.get(`https://fullstack-mern-yogi.herokuapp.com/api/v4/product`);
    if (!response) {
      setLoading(false)
      seterror(true);
    } else {
      seterror(false);
      setLoading(false)
      setProduct(response.data);
    }
  };

  const deleteProduct = async (id) => {
    if ( window.confirm(`Yakin ingin menghapus data ? `) ){
      const response = await axios.delete(`https://fullstack-mern-yogi.herokuapp.com/api/v4/product/${id}`);
      if (response.status === 200){
        alert(`berhasil delete data dengan id : ${id}`);
        getProduct();
      } 
    }
  };

  useEffect(() => {
    if(search === '') {
      getProduct()
    } else {
      axios.get(`https://fullstack-mern-yogi.herokuapp.com/api/v4/product/query/${search}`)
      .then(res => {
        const products = res.data
        setProduct(products)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
  }, [search])


  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Masukan kata kunci..."
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {error ? (
            <tr>
              <td colSpan={12}>
                <center>Data Not Response</center>
              </td>
            </tr>
          ) : (``)}
          { loading ? (<SpinnerCircularSplit className="spinner" size={48} thickness={180} speed={100} color="rgba(172, 57, 59, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />) 
           :( 
            product.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td> {user.name} </td>
                <td className="text-center"> {user.price} </td>
                <td className="text-center"> {user.stock} </td>
                <td className="text-center"> {user.status ? "Available" : "Not Available"} </td>
                <td className="text-center">
                  <Link
                    to={`/detail/${user._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/edit/${user._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <Link
                    to="#"
                    onClick={() => deleteProduct(user._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
              ))
           )}

        </tbody>
      </table>
    </div>
  );
};

export default Home;
