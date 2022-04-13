import React, { useState } from "react";
import { SideBar, SideBarCol1, SideBarCol2 } from "./sidebar.style";
import { Link } from "react-router-dom";
function Sidebar(props) {
  // const [sidebarClick, setSidebarClick] = useState("");
  console.log(props);
  return (
    <SideBar>
      <SideBarCol1>
        <Link to="/">
          <div
            className={props.sidebarClick === "home" ? "menu active" : "menu"}
          >
            <span className="col1">
              <img src="/icon/dashboard.png" />
            </span>
            <span className="col2">Dashboard</span>
          </div>
        </Link>
        <Link to="/category">
          <div
            className={
              props.sidebarClick === "category" ? "menu active" : "menu"
            }
          >
            <span className="col1">
              <img src="/icon/category.png" />
            </span>
            <span className="col2">Category</span>
          </div>
        </Link>
        <Link to="/product?limit=10&page=1&orderBy=desc&search=">
          <div
            className={
              props.sidebarClick === "product" ? "menu active" : "menu"
            }
          >
            <span className="col1">
              <img src="/icon/product.png" />
            </span>
            <span className="col2">Product</span>
          </div>
        </Link>
        <Link to="/order?limit=10&page=1&orderBy=desc&search=&state=pending">
          <div
            className={props.sidebarClick === "order" ? "menu active" : "menu"}
          >
            <span className="col1">
              <img src="/icon/order.png" />
            </span>
            <span className="col2">Order</span>
          </div>
        </Link>
        <Link to="/test">
          <div
            className={props.sidebarClick === "test" ? "menu active" : "menu"}
          >
            <span className="col1">
              <img src="/icon/dashboard.png" />
            </span>
            <span className="col2">Test</span>
          </div>
        </Link>
      </SideBarCol1>
      <SideBarCol2>{props.children}</SideBarCol2>
    </SideBar>
  );
}

export default Sidebar;
