import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../myebook-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import applebtn from "../img/apple_btn.png";
import googlebtn from "../img/google_btn.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
function Homepage() {
  const [products, setProducts] = useState([]);
  //useSelector : selector co the dung nhiu noi, nhiu component khac nhau
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  // dispath di duoc action len redux-store
  const dispatch = useDispatch();
  //  dung` useNavigate dieu huong trang
  const navigate = useNavigate();
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
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  //them vao gio hang
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Layout loading={loading}>
     {/* COVER */}
     <div className="cover">
        <div className="cover__content">
          <h1>Đọc sách Online</h1>
          <p>
            Mua sách thật chính là bạn đã ủng hộ cho tác giả và nhà xuất bản{" "}
          </p>
        </div>
      </div>
      <div className="intro">
        <div className="intro__content">
          <div className="row">
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-bullseye"></i>
                </div>
                <div className="intro__details">
                  <p>1.000 cuốn sách</p>
                  <p>Khám phá nhiều chủ đề mới</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-spinner"></i>
                </div>
                <div className="intro__details">
                  <p>Cuốn sách phù hợp</p>
                  <p>Mọi chủ đề đều dành cho bạn</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-sync-alt"></i>
                </div>
                <div className="intro__details">
                  <p> Sách miễn phí</p>
                  <p>Đọc mọi lúc mọi nơi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* view ra ngoai */}
      <div className="container">
        {/* Sap xep */}
        <div className="d-flex w-50 align-items-center my-3 justify-content-center">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search items"
          />
          <select
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value=""> ALL</option>
            <option value="book">Electronics</option>
            <option value="kinhdi">kinh di</option>
            <option value="hai">hai</option>
          </select>
        </div>
        <div className="row">
          {/* Sap xep */}
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p className="productNameBook">{product.name}</p>
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="product-actions">
                      <h2>{product.price} $</h2>
                      <div className="d-flex">
                        <button
                          className="button--red mx-2"
                          onClick={() => addToCart(product)}
                        >
                          ADD TO CART
                        </button>
                        <button className="button--red"
                          onClick={() => {
                            // chuyen toi trong Productinfo
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          ViEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="banner">
        <div className="container">
          <h2>Đọc mọi lúc mọi nơi</h2>
          <p>Tham gia các ứng dụng trên bất kỳ thiết bị nào của bạn</p>
          <p>Hãy thử thách bản thân mình , vượt qua mọi giới hạn</p>
          <button className="button--red">Sign Up For Free</button>
          <div className="row">
            <div className="col-6 text-right">
              <img src={googlebtn} alt="google btn" />
            </div>
            <div className="col-6 text-left">
              <img src={applebtn} alt="apple btn" />
            </div>
          </div>
        </div>
      </div>
      <OwlCarousel className="owl-theme" loop margin={10} nav>
      <div className="students">
        <div className="students__content">
            <h2>What our students have to say</h2>
            <div className="owl-carousel owl-theme students__carousel">
                <div className="card card--feedback">
                    <div className="card-body">
                        <div className="card__top">
                            <div className="card__avatar">
                                <img src="../img/s1.jpg" alt="student 1"/>
                            </div>
                            <div>
                                <p className="card__name">Oscar Javier</p>
                                <div className="card__stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half"></i>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">
                            I had a couple of months of experience trading without consistent
                            results. After taking this
                            course I'm pretty confident that I'll be a better trader and know better when to enter a
                            trade, how to put my stop
                            loss and take profit, how many lots to trade and much more.
                        </p>
                    </div>
                </div>
                <div className="card card--feedback">
                    <div className="card-body">
                        <div className="card__top">
                            <div className="card__avatar">
                                <img src="../img/s2.jpg" alt="student 2"/>
                            </div>
                            <div>
                                <p className="card__name">Estelle</p>
                                <div className="card__stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half"></i>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">
                            My first complete Photoshop for Designing t-shirts course done! I am
                            not a designer at all, but
                            after taking this course I really felt like a professional with enough confidence to now
                            go out and design for the
                            real world. Learned SO much! thank you!
                        </p>
                    </div>
                </div>
                <div className="card card--feedback">
                    <div className="card-body">
                        <div className="card__top">
                            <div className="card__avatar">
                                <img src="../img/s3.jpg" alt="student 3"/>
                            </div>
                            <div>
                                <p className="card__name">Mrinal</p>
                                <div className="card__stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half"></i>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">
                            Great course for beginners as well as working professionals. I'm
                            working as a UI developer for
                            last 2 years and worked on different javascript frameworks but the clarity of concepts
                            which I got after taking
                            this course is exceptional which I was not having previously.
                        </p>
                    </div>
                </div>
                <div className="card card--feedback">
                    <div className="card-body">
                        <div className="card__top">
                            <div className="card__avatar">
                                <img src="../img/s4.jpg" alt="student 4"/>
                            </div>
                            <div>
                                <p className="card__name">Flávio</p>
                                <div className="card__stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half"></i>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">
                            Very explained even for a short course. It's not for full
                            understanding, but it works perfectly as
                            an introduction for the subject. And you can really build a robot after taking this
                            course.
                        </p>
                    </div>
                </div>
                <div className="card card--feedback">
                    <div className="card-body">
                        <div className="card__top">
                            <div className="card__avatar">
                                <img src="../img/s5.jpg" alt="student 5"/>
                            </div>
                            <div>
                                <p className="card__name">Angeles</p>
                                <div className="card__stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half"></i>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">
                            I didn't know anything at all about FB ads for this course and have a
                            client that is wanting to
                            start using them. After taking this course i feel like I can help them and so much more
                            confident in coming up with
                            a strategy.
                        </p>
                    </div>
                </div>
                <div className="card card--feedback">
                    <div className="card-body">
                        <div className="card__top">
                            <div className="card__avatar">
                                <img src="../img/s6.jpg" alt="student 6"/>
                            </div>
                            <div>
                                <p className="card__name">Carol</p>
                                <div className="card__stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half"></i>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">
                            After studying German for about six months my spelling and grammar is
                            good, but I was having
                            trouble with some pronunciation. After taking this course it has really helped me
                            pronounce certain words I was
                            having trouble with and also have better listening skill of German speakers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </OwlCarousel>
      ;
    </Layout>
  );
}
export default Homepage;
