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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar, FaStarHalf } from "react-icons/fa";
import imgs1 from "../img/s1.jpg";
import imgs2 from "../img/s2.jpg";
import imgs3 from "../img/s3.jpg";
import imgs4 from "../img/s4.jpg";
import imgs5 from "../img/s5.jpg";
import imgs6 from "../img/s6.jpg";
import imgs7 from "../img/avata.png";
import ReactPaginate from "react-paginate";

const PER_PAGE = 12;
function Homepage() {
  const [products, setProducts] = useState([]);
  //useSelector : selector co the dung nhiu noi, nhiu component khac nhau
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { addressInfo } = useSelector((state) => state.cartReducer);
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
  useEffect(() => {
    localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
  }, [addressInfo]);
  //them vao gio hang
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  //pagination
  const [currentPage, setcurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    console.log("selectedPage", selectedPage);
    setcurrentPage(selectedPage);
  }
  //0,10,20,30,...
  const offset = currentPage * PER_PAGE;
  //console.log("offset",offset)

  //total pages: 500
  const pageCount = Math.ceil(products.length / PER_PAGE);
  return (
    <Layout loading={loading}>
      {/* COVER */}
      <div className="cover">
        <div className="cover__content">
          <h1>?????c s??ch Online</h1>
          <h5>
            Mua s??ch th???t ch??nh l?? b???n ???? ???ng h??? cho t??c gi??? v?? nh?? xu???t b???n{" "}
          </h5>
        </div>
      </div>
      <div className="intro">
        <div className="intro__content">
          <div className="row">
            <div className="col-4 ">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-bullseye"></i>
                </div>
                <div className="intro__details">
                  <p>1.000 cu???n s??ch</p>
                  <p>Kh??m ph?? nhi???u ch??? ????? m???i</p>
                </div>
              </div>
            </div>
            <div className="col-4 ">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-spinner"></i>
                </div>
                <div className="intro__details">
                  <p>Cu???n s??ch ph?? h???p</p>
                  <p>M???i ch??? ????? ?????u d??nh cho b???n</p>
                </div>
              </div>
            </div>
            <div className="col-4 ">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-sync-alt"></i>
                </div>
                <div className="intro__details">
                  <p> S??ch mi???n ph??</p>
                  <p>?????c m???i l??c m???i n??i</p>
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
            <option value="mentality">T??m L?? - K??? n??ng s???ng</option>
            <option value="economy">Kinh t??? - Qu???n l??</option>
            <option value="literary">V??n h???c Vi???t Nam</option>
            <option value="other">Kh??c</option>
          </select>
        </div>
        <div className="row">
          {/* Sap xep */}
          {products
            .slice(offset, offset + PER_PAGE)
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))

            .map((product) => {
              return (
                <div className="cart col-12 col-sm-6 col-md-4 col-lg-3 body_cart">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                      <p className="productNameBook">{product.name}</p>
                      <div className="card__stars">
                        <span className="iStar">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStarHalf />
                        </span>
                        <span className="card__rate">4.6</span>
                        <span className="card__total">(11.597)</span>
                      </div>
                      <h4 id="product-actions-gia">{product.price} ??</h4>
                    </div>
                    <div className="product-actions">
                      <h2>{product.price} ??</h2>
                      <div className="d-flex">
                        <button
                          className="button--red mx-2"
                          onClick={() => addToCart(product)}
                        >
                          ADD TO CART
                        </button>
                        <button
                          className="button--red"
                          onClick={() => {
                            // chuyen toi trong Productinfo
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <ReactPaginate
          previousLabel={"< previous"}
          nextLabel={"next >"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
      <div className="banner">
        <div className="container">
          <h2>?????c m???i l??c m???i n??i</h2>
          <p>Tham gia c??c ???ng d???ng tr??n b???t k??? thi???t b??? n??o c???a b???n</p>
          <p>H??y th??? th??ch b???n th??n m??nh , v?????t qua m???i gi???i h???n</p>
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
      <OwlCarousel className="owl-theme" margin={10} items="3" autoplay>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs7} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Nguy???n Ng??n</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                ?????u ti??n v??? d???ch v???, m??nh ????nh gi?? 2 t??? th??i: Tuy???t v???i ? ????ng
                g??i c???n th???n, ?????c bi???t l?? trong qu?? tr??nh v???n chuy???n h???p tr??ng
                c?? h??i m??o m?? m???t ch??t nh??ng s??ch b??n trong l???i kh??ng h??? h???n g??,
                g??y s??ch c??ng kh??ng b??? h??, m??o. Duy???t!
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs7} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">M??? Anh</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                Theo m??nh th?? cu???n s??ch n??y kh?? hay. Vi???t v??? cu???n s??ch n??y, t??c
                gi??? kh??ng t?? v??? kh??ng hoa m??? nh??ng di???n t??? ch??n th???t n???i t??m
                nh??n v???t ch??nh. C??? b???i c???nh trong truy???n c??ng th???, t???ng g??c ph???,
                hi???u s??ch hay qu??n cafe c??ng hi???n r?? trong t??m tr?? ng?????i ?????c.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs7} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                S??ch l??c m??nh nh???n h??ng l?? s??ch m???i ho??n to??n, g??y s??ch ch???c
                ch???n, gi???y ?????p, ch???c, v?? ch??? d??? ?????c. V???i m???t ?????a ???? b??? vi???c ?????c
                s??ch nhi???u n??m do cu???c s???ng b???n r???n, quy???n s??ch ?????u ti??n ?????c l???i
                l?? quy???n s??ch n??y gi???ng nh?? kh??i d???y ??am m?? ?????c s??ch .
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs7} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Minh Uy??n</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                theo m??nh c???m nh???n, ????y l?? m???t cu???n s??ch kh?? l?? chill. ?????u ti??n
                l?? n?? k??? v??? qu?? tr??nh ch???a l??nh c???a nh??n v???t ch??nh, song l??ng
                gh??p nh???ng s??? ki???n c?? th??? x???y ra trong cu???c s???ng c???a m???i ng?????i
                v?? c??ch ch??ng ta t???n th????ng sau nh???ng chuy???n ????.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs7} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">????? ??i Linh</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                S??ch b???c c???n th???n, s??ch r???t m???i, ????ng g??i c???n th???n v?? giao h??ng
                nhanh. C??u chuy???n truy???n cho m??nh c???m h???ng v?? ?????ng l???c ????? ?????c
                nhi???u h??n n???a ????? bi???t nhi???u h??n nh???ng c??u chuy???n, hi???u ???????c
                nhi???u c???m x??c. M???t quy???n s??ch ????n gi???n, nh??? nh??ng nh??ng r???t hay.
                Ch???m ??i???m s???n ph???m: 9/10.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs7} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Linh Kh??nh Tr????ng B??i</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                ????y l?? m???t cu???n nh??? nh??ng nh??ng kh?? th?? v??? v???i nh???ng b???n th??ch
                s??ch, b???i c???nh ???????c l???y t??? hi???u s??ch c??? n??n t??c gi??? mi??u t??? m??nh
                c??ng c?? th??? t?????ng t?????ng ??c ra m??i s??ch c?? th??m ntn, r???t ph?? h???p
                ????? th?? gi??n v?? t??m ???????c ?????ng l???c l??m vi???c
              </p>
            </div>
          </div>
        </div>
      </OwlCarousel>
      ;
    </Layout>
  );
}
export default Homepage;
