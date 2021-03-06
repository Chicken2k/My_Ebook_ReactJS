import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";

import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import { Tab, Tabs } from "react-bootstrap";
import "../stylesheet/admin.css";
//logout
import { useSelector } from "react-redux";
import { FaBars, FaCartPlus, FaUser } from "react-icons/fa";
function Admin2() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [books, setBooks] = useState([]);

  const [book, setBook] = useState({
    name: "",
    pdfURL: "",
    imageURL: "",
    category: "",
  });

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [addBookPdf, setAddBookPdf] = useState(false);

  // console.log(add)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseBook = () => setShowBook(false);
  const handleShowBook = () => setShowBook(true);
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState([]);
  //product
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  //book
  useEffect(() => {
    getBookData();
  }, []);

  async function getBookData() {
    try {
      setLoading(true);
      const bookFree = await getDocs(collection(fireDB, "books"));
      const booksArray = [];
      bookFree.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        booksArray.push(obj);
        setLoading(false);
      });
      setBooks(booksArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //Order
  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });

      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  //payment
  useEffect(() => {
    getPaymentData();
  }, []);

  async function getPaymentData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "payment"));
      const paymentArray = [];
      result.forEach((doc) => {
        paymentArray.push(doc.data());
        setLoading(false);
      });

      setPayment(paymentArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //product
  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      handleClose();
      toast.success("product updated successfully");
     
    } catch (error) {
      toast.error("product updated failed");
      setLoading(false);
    }
  };
  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose();
      toast.success("product add successfully");
    
    } catch (error) {
      toast.error("product add failed");
      setLoading(false);
    }
  };
  const addHandler = () => {
    setAdd(true);
    handleShow();
  };
  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("product deteted successfully");
      getData();
    } catch (error) {
      toast.failed("product delete failed");
      setLoading(false);
    }
  };
  //book
  const editHandlerBook = (item) => {
    setBook(item);
    setShowBook(true);
  };
  const updateBook = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "books", book.id), book);
      handleCloseBook();
      toast.success("book updated successfully");
     
    } catch (error) {
      toast.error("book updated failed");
      setLoading(false);
    }
  };
  const addBook = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "books"), book);
      handleCloseBook();
      toast.success("books add successfully");
   
    } catch (error) {
      toast.error("books add failed");
      setLoading(false);
    }
  };
  const addHandlerBook = () => {
    setAddBookPdf(true);
    handleShowBook();
    // console.log(Math.random())
  };
  const deleteBook = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "books", item.id));
      toast.success("books deteted successfully");
      getData();
    } catch (error) {
      toast.failed("books delete failed");
      setLoading(false);
    }
  };
  //logout

  //admin1
  const adminUser = {
    email: "admin@gmail.com",
    password: "123456",
  };
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const Login = (details) => {
    console.log(details);
    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      setLoading(false);
      toast.success("?????ng Nh???p th??nh c??ng");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      toast.error("????ng nh???p th???t b???i");
      setLoading(false);
    }
  };
  const Logout = () => {
    setUser({ name: "", email: "" });
  };
  return (
    <div className="Admin2">
      {user.email != "" ? (
        <div loading={loading}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className=" navbar-brand" to="/admin">
                Admin
              </Link>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className=" text-navbar nav-item">
                    <Link
                      className=" nav-link active"
                      aria-current="page"
                      to="/admin"
                    >
                      <FaUser />{" "}
                      {user.email.substring(0, user.email.length - 10)}
                    </Link>
                  </li>

                  <li className=" text-navbar nav-item  ">
                    <button onClick={Logout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Tabs
            defaultActiveKey="products"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="products" title="S???n ph???m">
              <div className="d-flex justify-content-between">
                <h3>Products List</h3>
                <button onClick={addHandler}> ADD PRODUCT</button>
              </div>
              <table className="table mt-3  ">
                <thead className="textAdmin">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img src={item.imageURL} height="80" width="80" />{" "}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>
                          <FaTrash
                            color="red"
                            size={20}
                            onClick={() => deleteProduct(item)}
                          />
                          <FaEdit
                            onClick={() => editHandler(item)}
                            color="blue"
                            size={20}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {add === true ? "Add a product" : "Edit product"}
                    {console.log(add)}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {" "}
                  <div className="register-form">
                    <input
                      type="text"
                      value={product.name}
                      className="form-control"
                      placeholder="name"
                      onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={product.imageURL}
                      className="form-control"
                      placeholder="img URL"
                      onChange={(e) =>
                        setProduct({ ...product, imageURL: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      value={product.price}
                      className="form-control"
                      placeholder="price"
                      onChange={(e) =>
                        setProduct({ ...product, price: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={product.category}
                      className="form-control"
                      placeholder="category"
                      onChange={(e) =>
                        setProduct({ ...product, category: e.target.value })
                      }
                    />

                    <div className="col-md-12">
                      <label for="comments" className="form-label"></label>
                      <textarea
                        id="comments"
                        className="form-control"
                        rows={5}
                        type="text"
                        value={product.description}
                        placeholder="description"
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <input
                      type="text"
                      value={product.company}
                      className="form-control"
                      placeholder="C??ng ty ph??t h??nh"
                      onChange={(e) =>
                        setProduct({ ...product, company: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={product.day}
                      className="form-control"
                      placeholder="Ng??y xu???t b???n"
                      onChange={(e) =>
                        setProduct({ ...product, day: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={product.version}
                      className="form-control"
                      placeholder="Phi??n b???n"
                      onChange={(e) =>
                        setProduct({ ...product, version: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={product.paper}
                      className="form-control"
                      placeholder="Lo???i b??a"
                      onChange={(e) =>
                        setProduct({ ...product, paper: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={product.numberPages}
                      className="form-control"
                      placeholder="S??? trang"
                      onChange={(e) =>
                        setProduct({ ...product, numberPages: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={product.publishing}
                      className="form-control"
                      placeholder="Nh?? xu???t b???n"
                      onChange={(e) =>
                        setProduct({ ...product, publishing: e.target.value })
                      }
                    />

                    <hr />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button>Close</button>
                  {add ? (
                    <button onClick={addProduct}>SAVE</button>
                  ) : (
                    <button onClick={updateProduct}>SAVE</button>
                  )}
                </Modal.Footer>
              </Modal>
            </Tab>
            <Tab eventKey="books" title="S??ch">
              <div className="d-flex justify-content-between">
                <h3>BOOK LIST</h3>
                <button onClick={addHandlerBook}> ADD book</button>
              </div>
              <table className="table mt-3">
                <thead className="textAdmin">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img src={item.imageURL} height="80" width="80" />{" "}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>
                          <FaTrash
                            color="red"
                            size={20}
                            onClick={() => deleteBook(item)}
                          />
                          <FaEdit
                            onClick={() => editHandlerBook(item)}
                            color="blue"
                            size={20}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Modal show={showBook} onHide={handleCloseBook}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {addBookPdf === true ? "Add a Book" : "Edit Book"}
                    {console.log(addBookPdf)}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {" "}
                  <div className="register-form">
                    <input
                      type="text"
                      value={book.name}
                      className="form-control"
                      placeholder="name"
                      onChange={(e) =>
                        setBook({ ...book, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={book.imageURL}
                      className="form-control"
                      placeholder="img URL"
                      onChange={(e) =>
                        setBook({ ...book, imageURL: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={book.pdfURL}
                      className="form-control"
                      placeholder="pdfURL"
                      onChange={(e) =>
                        setBook({ ...book, pdfURL: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={book.category}
                      className="form-control"
                      placeholder="category"
                      onChange={(e) =>
                        setBook({ ...book, category: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={book.description}
                      className="form-control"
                      placeholder="description"
                      onChange={(e) =>
                        setBook({ ...book, description: e.target.value })
                      }
                    />
                    <hr />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button>Close</button>
                  {addBookPdf ? (
                    <button onClick={addBook}>SAVE</button>
                  ) : (
                    <button onClick={updateBook}>SAVE</button>
                  )}
                </Modal.Footer>
              </Modal>
            </Tab>
            <Tab eventKey="orders" title="?????t h??ng ">
              {orders.map((order) => {
                return (
                  <table className="table mt-3 order">
                    <thead className="textAdmin">
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>

                        <th></th>
                        <th>Th??ng tin ng?????i mua</th>
                        <th> Tr???ng th??i</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item) => {
                        return (
                          <tr>
                            <td>
                              <img src={item.imageURL} height="80" width="80" />{" "}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.address}</td>
                            {Object.keys(order.addressInfo).map((key) => {
                              return (
                                <tr>
                                  <td>{order.addressInfo[key]}</td>
                                </tr>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}
            </Tab>
            <Tab eventKey="payment" title="S???n ph???m thanh to??n">
              {payment.map((pay) => {
                return (
                  <table className="table mt-3 order">
                    <thead className="textAdmin">
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>

                        <th></th>
                        <th>Th??ng tin ng?????i mua</th>
                        <th> Tr???ng th??i</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pay.cartItems.map((item) => {
                        return (
                          <tr>
                            <td>
                              <img src={item.imageURL} height="80" width="80" />{" "}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.address}</td>
                            {Object.keys(pay.addressInfo).map((key) => {
                              return (
                                <tr>
                                  <td>{pay.addressInfo[key]}</td>
                                </tr>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}
            </Tab>
            <Tab eventKey="contact" title="Ng?????i d??ng" disabled></Tab>
            <Tab eventKey="topbook" title="S???n ph???m b??n ch???y" disabled></Tab>
            <Tab eventKey="cmt" title="????nh gi?? ng?????i d??ng " disabled></Tab>
            <Tab eventKey="mg" title="quan li nguoi dung" disabled></Tab>
          </Tabs>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} to="/book" />
      )}
    </div>
  );
}
export default Admin2;
