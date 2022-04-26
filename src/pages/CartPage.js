import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

function CartPage() {
  //useSelector : selector co the dung nhiu noi, nhiu component khac nhau
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { addressInfo } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  // dispath di duoc action len redux-store
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + (Number(cartItems.price)*1000);
    });
  
    setTotalAmount(temp.toLocaleString('vi-VN'));
    console.log(temp)
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
  }, [addressInfo]);
  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };
  
  // Order
  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };

    console.log(addressInfo);
    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("Order placed successfully");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };
  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead className="textAdmin">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" />{" "}
                </td>
                <td>{item.name}</td>
                <td>{item.price} đ</td>
                <td>
                  <FaTrash
                    onClick={() => {
                      deleteFromCart(item);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Tổng {totalAmount} đ</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>Đặt Hàng </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              className="form-control"
              rows={3}
              type="text"
              className="form-control"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            {/* <input
              className="form-control"
              placeholder="pincode"
              type="number"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            /> */}
            <input
              type="number"
              className="form-control"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>ORDER</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
export default CartPage;
