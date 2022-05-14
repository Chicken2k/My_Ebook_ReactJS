import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";

const PaypalCheckoutButton = (props) => {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const handleApprove = (orderId) => {
    setPaidFor(true);
  };
  if (paidFor) {
    toast.paidFor("Thanh toán thành công");
  }
  if (error) {
    toast.error("Thanh toán thất bại");
  }
  // //khac
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [pincode, setPincode] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [loading, setLoading] = useState(false);
  // // thanh toan
  //   //useSelector : selector co the dung nhiu noi, nhiu component khac nhau
  //   const { cartItems } = useSelector((state) => state.cartReducer);
  //   const { addressInfo } = useSelector((state) => state.cartReducer);
  //   const [totalAmount, setTotalAmount] = useState(0);
  //    // dispath di duoc action len redux-store
  // const dispatch = useDispatch();
  // const [showPay, setShowPay] = useState(false);
  // const handleClosePay = () => setShowPay(false);
  // const handleShowPay = () => setShowPay(true);
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);
  // useEffect(() => {
  //   localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
  // }, [addressInfo]);
  // //payment
  // const placePay = async () => {
  //   const addressInfo = {
  //     name,
  //     address,
  //     phoneNumber,
  //   };

  //   const PayInfo = {
  //     cartItems,
  //     addressInfo,
  //     email: JSON.parse(localStorage.getItem("currentUser")).user.email,
  //     userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
  //   };
  //   try {
  //     setLoading(true);
  //     const result = await addDoc(collection(fireDB, "payment"), PayInfo);
  //     setLoading(false);
  //     toast.success("payment placed successfully");
  //     handleClosePay();
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("payment failed");
  //   }
  // };
  //useSelector : selector co the dung nhiu noi, nhiu component khac nhau
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { addressInfo } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  // dispath di duoc action len redux-store
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const handleClosePay = () => setShowPay(false);
  const handleShowPay = () => setShowPay(true);

  const [name, setName1] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + Number(cartItems.price) * 1000;
    });

    setTotalAmount(temp.toLocaleString("vi-VN"));
    console.log(temp);
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
  //payment
  const placePay = async () => {
    const addressInfo = {
      name,
      address,
      phoneNumber,
    };

    const PayInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "payment"), PayInfo);
      setLoading(false);
      toast.success("payment placed successfully");
      handleClosePay();
    } catch (error) {
      setLoading(false);
      toast.error("payment failed");
    }
  };

  return (
    <div className="register-form" loading={loading}>
      <h2>Đặt hàng</h2>
      <hr />
      <input
        type="text"
        className="form-control"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setName1(e.target.value);
        }}
      />
      {console.log({ name })}
      {console.log({ address })}
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
      <PayPalButtons
        style={{
          color: "black",
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "pill",
        }}
        onClick={(data, actions) => {
          const hasAlreadyBoughtCourse = false;
          if (hasAlreadyBoughtCourse) {
            setError("you already bought this course ...........");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        onClick={placePay}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("order", order);
          handleApprove(data.orderID);
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err);
          console.log("Paypal checkout onError", err);
        }}
      />{" "}
    </div>
  );
};
export default PaypalCheckoutButton;
