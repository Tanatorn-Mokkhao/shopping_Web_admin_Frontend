import React, { useState } from "react";
import Layout from "../../component/layout/layout";
import { Box, Grid } from "@mui/material";
import HeaderState from "./headerState";
import OrderTable from "./orderTable";
import Loader from "../../component/loader/loader";

function Order(props) {
  const search = props.location.search;

  const [searchBar, setSearchBar] = useState(
    new URLSearchParams(search).get("search") || ""
  );

  const handleSearchBar = () => {
    const state = new URLSearchParams(search).get("state");
    const orderBy = new URLSearchParams(search).get("orderBy");

    props.history.push({
      pathname: "/order",
      search: `limit=10&page=1&orderBy=${orderBy}&search=${searchBar}&state=${state}`,
    });
  };

  const handleSearchBarEnterPress = (e) => {
    const state = new URLSearchParams(search).get("state");
    const orderBy = new URLSearchParams(search).get("orderBy");

    if (e.key === "Enter") {
      props.history.push({
        pathname: "/order",
        search: `limit=10&page=1&orderBy=${orderBy}&search=${searchBar}&state=${state}`,
      });
    }
  };

  return (
    <Layout
      sidebarClick={"order"}
      searchBar
      value={searchBar}
      onChange={(e) => setSearchBar(e.target.value)}
      onClick={handleSearchBar}
      onKeyPress={handleSearchBarEnterPress}
    >
      <Loader />
      <Box sx={{ width: "100%", height: "90vh" }}>
        <HeaderState {...props} />
        <OrderTable {...props} />
      </Box>
    </Layout>
  );
}

export default Order;
