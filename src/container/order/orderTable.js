import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/layout";
import { Box, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Pagination } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { listTableBody, useStyles, listTableBodyAction } from "./order.style";
import HeaderState from "./headerState";
import { useDispatch, useSelector } from "react-redux";
import { GetOrder } from "../../action/order/orderAction";
import DateIsotoString from "../../component/dateIsotoString/dateIsotoString";
import OrderDialog from "./orderDialog";

function OrderTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const search = props.location.search;
  const order = useSelector((state) => state.order);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState(
    new URLSearchParams(search).get("orderBy") || "desc"
  );
  const [searchBar, setSearchBar] = useState(
    new URLSearchParams(search).get("search") || ""
  );
  const [orderState, setOrderState] = useState(
    new URLSearchParams(search).get("state") || "pending"
  );
  const [orderDetailStatus, setOrderDetailStatus] = useState(false);
  const [orderDetail, setOrderDetail] = useState("");

  useEffect(() => {
    pageHandle();
  }, [props.history]);

  const pageHandle = () => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(parseInt(page));
    dispatch(GetOrder(page, orderBy, searchBar, orderState));
  };

  const handleRunNumber = (number) => {
    return (order.filters.page - 1) * order.filters.limit + number + 1;
  };

  const handleRequestSort = () => {
    const sortOrder = orderBy === "desc" ? "asc" : "desc";
    const state = new URLSearchParams(search).get("state");
    setOrderBy(sortOrder);
    props.history.push({
      pathname: "/order",
      search: `limit=10&page=1&orderBy=${sortOrder}&search=${searchBar}&state=${state}`,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.history.push({
      pathname: "/order",
      search: `limit=10&page=${newPage}&orderBy=${orderBy}&search=${searchBar}&state=${orderState}`,
    });
  };

  const handleOpenDialogOrder = (order) => {
    setOrderDetailStatus(true);
    setOrderDetail(order);
  };

  return (
    <>
      <Paper
        sx={{ width: "99%", mb: 2, height: "81.2vh" }}
        style={{ margin: "8px 8px" }}
      >
        <TableContainer sx={{ height: "90%" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell align={"left"} padding={"normal"}>
                  No.
                </TableCell>
                <TableCell align={"left"} padding={"normal"}>
                  รหัสออเดอร์
                </TableCell>
                <TableCell align={"left"} padding={"normal"}>
                  <TableSortLabel
                    active={true}
                    direction={orderBy}
                    onClick={handleRequestSort}
                  >
                    วัน - เวลาที่สร้าง
                  </TableSortLabel>
                </TableCell>
                <TableCell align={"left"} padding={"normal"}>
                  ชื่อ
                </TableCell>
                <TableCell align={"left"} padding={"normal"}>
                  จำนวน
                </TableCell>
                <TableCell align={"left"} padding={"normal"}>
                  ราคา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ overflowY: "scroll" }}>
              {order.orders.map((order, index) => {
                return (
                  <TableRow className={classes.tableRow} key={order.id}>
                    <TableCell align="left" style={listTableBody}>
                      {handleRunNumber(index)}
                    </TableCell>
                    <TableCell align="left" style={listTableBody}>
                      {order.code}
                    </TableCell>
                    <TableCell align="left" style={listTableBody}>
                      {DateIsotoString(order.createdAt)}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={listTableBodyAction}
                      onClick={() => handleOpenDialogOrder(order)}
                    >
                      {order?.orderItems.map((orderItem, index) => (
                        <div key={index}>{orderItem.name}</div>
                      ))}
                    </TableCell>
                    <TableCell align="left" style={listTableBody}>
                      {order.totalItem}
                    </TableCell>
                    <TableCell align="left" style={listTableBody}>
                      {order.totalPrice}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer
          sx={{ height: "10%" }}
          style={{ borderTop: "thin groove" }}
        >
          <Pagination
            color="primary"
            count={order.filters.totalPages}
            page={page}
            onChange={handleChangePage}
            style={{ float: "right", marginTop: "8px" }}
            size="large"
          />
        </TableContainer>
      </Paper>
      <OrderDialog
        setOrderDetailStatus={setOrderDetailStatus}
        orderDetailStatus={orderDetailStatus}
        orderDetail={orderDetail}
      />
    </>
  );
}

export default OrderTable;
