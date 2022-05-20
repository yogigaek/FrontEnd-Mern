import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import axios from "axios";

const Detail = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      detailProduct(id);
    }
  },[id]);

  const detailProduct = async (id) => {
    const response = await axios.get(`https://yogi-mern.herokuapp.com/api/v4/product/${id}`);
      if (response.status === 200){
        setProduct(response.data);
      }
  };

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
      <br />
      <br />

      <table className="table">
        <>
        <tbody>
          <tr>
            <td> <strong>ID</strong> </td>
            <td>: {id} </td>
          </tr>
          <tr>
            <td><strong>Name</strong> </td>
            <td>: {product.name} </td>
          </tr>
          <tr>
            <td> <strong>Price</strong> </td>
            <td>: {product.price} </td>
          </tr>
          <tr>
            <td> <strong>Stock</strong> </td>
            <td>: {product.stock} </td>
          </tr>
        </tbody>
        </>
      </table>
      
    </div>
  );
};

export default Detail;
