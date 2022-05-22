import React from "react";
import "../stylesheet/footer.css";
import Chat from "./Chat";
import Mess from "./Mess";
function Footer() {
  return (
    <div>
      <div className=" footer">
        <div className="row section">
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <h3>MIỄN PHÍ GIAO HÀNG</h3>
            <ul>
              <li>
                <a href="#">FreeShip trong nội thành</a>
              </li>
              <li>
                <a href="#">Phương thức vận chuyển</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <h3>HỖ TRỢ KHÁCH HÀNG</h3>
            <ul>
              <li>
                <a href="#">Hương dẫn đặt hàng</a>
              </li>
              <li>
                <a href="#">Phương thức thanh toán </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <h3>HỖ TRỢ</h3>
            <ul>
              <li>
                <a href="#">Liên hệ</a>
              </li>
              <li>
                <a href="#">Bảo mật</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__copyright">
          <p>MyEbook</p>
        </div>
        {/* <Mess /> */}
      </div>
    </div>
  );
}
export default Footer;
