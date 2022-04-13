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
import { listTableBody, useStyles } from "./order.style";

function HeaderState(props) {
  const classes = useStyles();
  const search = props.location.search;
  const [orderState, setOrderState] = useState("");

  useEffect(() => {
    hanleHeaderActive();
  }, [props.history]);

  const hanleHeaderActive = () => {
    const state = new URLSearchParams(search).get("state") || "pending";
    setOrderState(state);
  };

  const handleChangeState = (state) => {
    props.history.push({
      pathname: "/order",
      search: `limit=10&page=1&orderBy=desc&search=&state=${state}`,
    });
  };

  return (
    <Paper
      sx={{ width: "99%", mb: 2, height: "8vh" }}
      style={{ margin: "8px 8px" }}
    >
      <Box className={classes.headerBox}>
        <Grid container>
          <Grid
            item
            // xs={4}
            // md={2}
            className={
              orderState === "pending"
                ? classes.headerOrderStatusActive
                : classes.headerOrderStatus
            }
            onClick={() => handleChangeState("pending")}
          >
            กำลังดำเนินการ
          </Grid>
          <Grid
            item
            // xs={4}
            // md={2}
            className={
              orderState === "success"
                ? classes.headerOrderStatusActive
                : classes.headerOrderStatus
            }
            onClick={() => handleChangeState("success")}
          >
            สำเร็จ
          </Grid>
          <Grid
            item
            // xs={4}
            // md={2}
            className={
              orderState === "cancle_pending"
                ? classes.headerOrderStatusActive
                : classes.headerOrderStatus
            }
            onClick={() => handleChangeState("cancle_pending")}
          >
            รอดำเนินการยกเลิก
          </Grid>
          <Grid
            item
            // xs={4}
            // md={2}
            className={
              orderState === "cancle"
                ? classes.headerOrderStatusActive
                : classes.headerOrderStatus
            }
            onClick={() => handleChangeState("cancle")}
          >
            ยกเลิก
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default HeaderState;
