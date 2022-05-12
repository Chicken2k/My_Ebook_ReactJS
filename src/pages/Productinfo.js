import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalf } from "react-icons/fa";

function ProductInfo() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { addressInfo } = useSelector((state) => state.cartReducer);
  // useParams dung de lay thong tin
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      //productTemp.data() hien thi san pham view
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
  }, [addressInfo]);
  return (
    <Layout loading={loading}>
      <div className="container productinfo">
        <div className="row card_products justify-content-center">
          <div className="col-7 col-sm-8 col-md-8 col-lg-5 ">
            {product && (
              <div className="card_products_img body_cart">
                <img src={product.imageURL} className="product-info-img" />
              </div>
            )}
          </div>
          <div className="card_products_name body_cart col-5 col-sm-4 col-md-4 col-lg-7 ">
            <p>
              <b className="textProducts">{product.name}</b>
            </p>
            <div className="Productinfo_price">
              <p>{product.price} đ</p>
            </div>

            <span className="iStar">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </span>
            <span className="card__rate">4.6</span>
            <span className="card__total">(11.597 Đánh giá)</span>
            <p>
              {" "}
              <button
                className="button--red"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
            </p>
          </div>
        </div>
        <div>
          <hr />
          <div className="productinfo_thongtin body_cart">
            <div className="container">
              <h5 className="textLMD  ">Thông tin chi tiết</h5>
              <table className="table-fill textDT ">
                <tbody className="table-hover table-body">
                  <tr>
                    <td className="text-left">Công ty phát hành </td>
                    <td className="text-left">{product.company}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Ngày xuất bản</td>
                    <td className="text-left">{product.day}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Phiên bản</td>
                    <td className="text-left">{product.version}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Loại bìa </td>
                    <td className="text-left">{product.paper}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Số trang</td>
                    <td className="text-left">{product.numberPages}</td>
                  </tr>
                  <tr>
                    <td className="text-left">Nhà xuất bản </td>
                    <td className="text-left">{product.publishing}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="body_cart">
            <h5 className="textLMD mtsp">Mô tả sản phẩm</h5>
            <p className="textDT">{product.description}</p>
            <div className="d-flex justify-content-end my-3"></div>
          </div>
        </div>
        {/* cmt */}
        <div className="comment-thread">
          <div className="textLMD">
            <h5>HỎI , ĐÁP VỀ SẢN PHẨM</h5>
          </div>
          <hr />
          <details open className="comment" id="comment-1">
            <a href="#comment-1" className="comment-border-link">
              <span className="sr-only">Jump to comment-1</span>
            </a>

            <summary>
              <div className="comment-heading">
                <div className="comment-info">
                  <a href="#" className="comment-author">
                    Prue Nguyễn
                  </a>
                  <p className="m-0"> &bull; 4 days ago</p>
                </div>
              </div>
            </summary>

            <div className="comment-body">
              <p>
                Sách lúc nhận hình thức rất ổn, không cong vênh xước gãy. Về
                phần nội dung, mình đọc liên tục 4 tiếng, nửa đầu vừa vui vừa
                giận, đôi khi tức tối nhưng lại dịu ngay bởi những hành động ấm
                áp của cậu bé dành cho những người thương yêu. Nửa sau tan vỡ,
                dằn xé, tiếc nuối, xót xa, phẫn nộ...đủ cả. Một cuốn sách day
                dứt và khiến người ta hoài niệm, về tuổi thơbcủa mình, và thật
                sự nuối tiếc,
              </p>
              <button
                type="button"
                data-toggle="reply-form"
                data-target="comment-1-reply-form"
              >
                Reply
              </button>
              <button type="button">Flag</button>

              <form
                method="POST"
                className="reply-form d-none"
                id="comment-1-reply-form"
              >
                <textarea placeholder="Reply to comment" rows="4"></textarea>
                <button type="submit">Submit</button>
                <button
                  type="button"
                  data-toggle="reply-form"
                  data-target="comment-1-reply-form"
                >
                  Cancel
                </button>
              </form>
            </div>

            <div className="replies">
              <details open className="comment" id="comment-2">
                <a href="#comment-2" className="comment-border-link">
                  <span className="sr-only">Jump to comment-2</span>
                </a>
                <summary>
                  <div className="comment-heading">
                    <div className="comment-info">
                      <a href="#" className="comment-author">
                        Ngo Van Hanh
                      </a>
                      <p className="m-0"> &bull; 3 days ago</p>
                    </div>
                  </div>
                </summary>

                <div className="comment-body">
                  <p>Sách hay</p>
                  <button
                    type="button"
                    data-toggle="reply-form"
                    data-target="comment-2-reply-form"
                  >
                    Reply
                  </button>
                  <button type="button">Flag</button>

                  <form
                    method="POST"
                    className="reply-form d-none"
                    id="comment-2-reply-form"
                  >
                    <textarea
                      placeholder="Reply to comment"
                      rows="4"
                    ></textarea>
                    <button type="submit">Submit</button>
                    <button
                      type="button"
                      data-toggle="reply-form"
                      data-target="comment-2-reply-form"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </details>

              <a href="#load-more">Load more replies</a>
            </div>
          </details>

          <div className="row">
            <div >
              {" "}
              <textarea className="col-12" rows="3" name="comment">
                Hãy đặt câu hỏi liên quan đến sản phẩm
              </textarea>
            </div>

            <form action="/action_page.php" id="usrform">
              <div className="text_cmt">
                <input name="usrname" placeholder="Họ và tên" />
                <input
                  className="text_cmt"
                  name="usrname"
                  placeholder="Email của bạn"
                />
              </div>
            </form>
            <div className="col-md-4 submit_cmt ">
              <div>
                <a className="button-green button-block add-comment">
                  <span className="group-icon">
                    <i className="fa fa-send-o"></i>
                  </span>{" "}
                  <span className="group-title">Xác nhận</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default ProductInfo;
