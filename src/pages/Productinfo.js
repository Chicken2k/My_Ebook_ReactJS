import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function ProductInfo() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch =useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  // useParams dung de lay thong tin
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true)
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      //productTemp.data() hien thi san pham view
      setProduct(productTemp.data());
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div className="card_products">
                <p>
                  <b className="textProducts">{product.name}</b>
                </p>
                <img src={product.imageURL} className="product-info-img" />
                <hr />
                <p className="textLMD">Lời mở đầu</p>
                <p className="textDT">{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button className="button--red" onClick={()=>addToCart(product)}>ADD TO CART</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default ProductInfo;
