import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./container/signin/signin";
import Signup from "./container/signup/signup";
import Home from "./container/home/home";
import Category from "./container/category/category";
import PrivateRoute from "./component/privateRoute/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isLogged } from "./action/auth/authAction";
import LoaderTempleate from "./component/loader/loader.template";
import Product from "./container/product/product";
import Paginate from "./component/paginate/paginate";
import BasePageNotfound from "./container/basePageNotfound/basePageNotfound";
import Test from "./container/test/test.jsx";
import ConfirmAlert from "./component/confirmAlert/confirmAlert";
import ProductTypeTable from "./container/product/productTypeTable"
import Order from "./container/order/order"
// import OrderPrint from "./component/print/orderPrint";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isLogged());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          {/* <Route path="/print" component={ OrderPrint } /> */}
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/product" component={Product} />
          <PrivateRoute path="/order" component={Order} />
          <Route path="/loader" component={LoaderTempleate} />
          <Route path="/paginate" component={Paginate} />
          <Route path="/test" component={Test} />
          <Route path="/confirm" component={ConfirmAlert} />
          <Route path="*" component={BasePageNotfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
