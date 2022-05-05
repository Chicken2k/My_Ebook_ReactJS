import PaypalCheckoutButton from "./PaypalCheckoutButton";

const Checkout=()=>{
const product ={
  description:"design + code react hooke ",
  price:19
};

  return(
    <div className="checkout">
    <h1>PayPal Checkkout </h1>
    <p>design + code react hooke </p>
    <p>learn how to build a website with react hooks</p>
    <h1>19$</h1>
    <p>buy</p>
   <hr />
   <p>QR,pay with paypal</p>
   <PaypalCheckoutButton product={product} />
    </div>
  )
}
export default Checkout;