import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../myebook-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar, FaStarHalf } from "react-icons/fa";
import "../stylesheet/book.css";
import ReactPaginate from "react-paginate";
const PER_PAGE = 9;
function Homepage() {
  const [books, setBooks] = useState([]);
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
      const users = await getDocs(collection(fireDB, "books"));
      const booksArray = [];
      users.forEach((doc) => {
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
  const pageCount = Math.ceil(books.length / PER_PAGE);

  return (
    <Layout loading={loading}>
      {/* view ra ngoai */}
      <div className="container book">
        <div className="slogan">
          <h1>Thư viện Ebook Miễn Phí</h1>
          <h3>
            MyEbook được xây dựng nhằm chia sẽ sách miễn phí , lan truyền kiến
            thức rộng rãi đến mọi người{" "}
          </h3>
          <h3>
            Nếu bạn có điều kiện ,Hãy mua sách giấy để ủng hộ Tác giả và nhà
            xuất bản
          </h3>
        </div>
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
            <option value="mentality">Tâm Lý - Kỹ năng sống</option>
            <option value="economy">Kinh tế - Quản lý</option>
            <option value="literary">Văn học Việt Nam</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="row body_cart">
          {/* Sap xep */}
          {books
            .slice(offset, offset + PER_PAGE)
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((book) => {
              return (
                <div className="cart col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <div className="text-center">
                        <img
                          src={book.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                      <p className="productNameBook">{book.name}</p>
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
                    </div>
                    <div className="product-actions">
                      <div className="d-flex">
                        <button
                          className="button--red"
                          onClick={() => {
                            // chuyen toi trong Productinfo
                            navigate(`/bookinfo/${book.id}`);
                          }}
                        >
                          Đọc Sách
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
      ;
    </Layout>
  );
}
export default Homepage;
