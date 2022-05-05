import {useState} from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
const PaypalCheckoutButton = (props) => {
  const { product } = props;
  const [paidFor,setPaidFor]=useState(false);
  const [error,setError]=useState(null);
  const handleApprove =(orderId)=>{
  setPaidFor(true);
  }
  if(paidFor){
    toast.paidFor("Thanh toán thành công")
  }
  if(error){
    toast.error("Thanh toán thất bại")
  }
  return (
    <PayPalButtons
      style={{
        color: "black",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      onClick={(data,actions)=>{
        const hasAlreadyBoughtCourse= false;
        if(hasAlreadyBoughtCourse){
          setError(
          "you already bought this course ..........."
          );
          return actions.reject()
        }else {
          return actions.resolve()
        }
      }}
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
      onApprove={async(data,actions)=>{
       const order = await actions.order.capture();
       console.log("order",order);
       handleApprove(data.orderID);
      }}
      onCancel={()=>{
      
      }}
      onError={(err)=>{
      setError(err);
      console.log("Paypal checkout onError",err);
      }}
    />
  );
};
export default PaypalCheckoutButton;
