import React from "react";
import Layout from "../../component/layout/layout";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { TableFooter } from "@mui/material";
import { Grid, Pagination } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function Paginate() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <Box sx={{ width: "100%", height: "90vh" }}>
        <Paper
          sx={{ width: "99%", mb: 2, height: "90vh" }}
          style={{ margin: "8px 8px" }}
        >
          <TableContainer sx={{ height: "80%" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              stickyHeader
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody style={{ overflowY: "scroll" }}>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer
            sx={{ height: "20%" }}
            style={{ borderTop: "thin groove" }}
          >
            {/* <TablePagination
              rowsPerPageOptions={[10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{marginTop:'20px'}}
            /> */}
            {/* <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0}>
              <Grid item xs={12} style={{ marginTop: "5px",background:"red" }}> */}
            <Pagination
              color="primary"
              count={10}
              page={page}
              onChange={handleChangePage}
              style={{ float: "right" }}
              size="large"
            />
            {/* </Grid>
              </Grid>
            </Box> */}
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
}

export default Paginate;



// import React, { useEffect } from "react";
// import Layout from "../../component/layout/layout";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import { Pagination } from "@mui/material";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Paper from "@mui/material/Paper";
// import { useDispatch, useSelector } from "react-redux";
// import { GetProduct } from "../../action/product/productAction";
// import DateIsotoString from "../../component/dateIsotoString/dateIsotoString";

// function Product(props) {
//   const [order, setOrder] = React.useState("desc");
//   const [page, setPage] = React.useState(1);
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.product);

//   useEffect(() => {
//     PageHandle();
//   }, [props]);

//   const PageHandle = () => {
//     const search = props.location.search;
//     const page = new URLSearchParams(search).get("page");
//     setPage(parseInt(page));
//     dispatch(GetProduct(page, order));
//   };

//   const handleRequestSort = (event, property) => {
//     const sortOrder = order === "desc" ? "asc" : "desc";
//     setOrder(sortOrder);
//     props.history.push({
//       pathname: "/product",
//       search: `limit=10&page=1&orderBy=${sortOrder}`,
//     });
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     props.history.push({
//       pathname: "/product",
//       search: `limit=10&page=${newPage}&orderBy=${order}`,
//     });
//   };

//   const handleRunNumber = (number) => {
//     return (product.filters.page - 1) * product.filters.limit + number + 1;
//   };
//   return (
//     <Layout>
//       <Box sx={{ width: "100%", height: "90vh" }}>
//         <Paper
//           sx={{ width: "99%", mb: 2, height: "90vh" }}
//           style={{ margin: "8px 8px" }}
//         >
//           <TableContainer sx={{ height: "80%" }}>
//             <Table
//               sx={{ minWidth: 750 }}
//               aria-labelledby="tableTitle"
//               stickyHeader
//             >
//               <TableHead>
//                 <TableRow>
//                   <TableCell align={"left"} padding={"normal"}>
//                     No.
//                   </TableCell>
//                   <TableCell align={"left"} padding={"normal"}>
//                     <TableSortLabel
//                       active={true}
//                       direction={order}
//                       onClick={handleRequestSort}
//                     >
//                       วัน - เวลาที่สร้าง
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell align={"left"} padding={"normal"}>
//                     ชื่อ
//                   </TableCell>
//                   <TableCell align={"left"} padding={"normal"}>
//                     จำนวน
//                   </TableCell>
//                   <TableCell align={"left"} padding={"normal"}>
//                     ราคา
//                   </TableCell>
//                   <TableCell align={"left"} padding={"normal"}>
//                     ประเภท
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody style={{ overflowY: "scroll" }}>
//                 {product.products.map((product, index) => {
//                   const labelId = `enhanced-table-checkbox-${index}`;
//                   return (
//                     <TableRow>
//                       <TableCell align="left">
//                         {handleRunNumber(index)}
//                       </TableCell>
//                       <TableCell
//                         component="th"
//                         id={labelId}
//                         scope="row"
//                         // padding="none"
//                         align="left"
//                       >
//                         {DateIsotoString(product.createdAt)}
//                       </TableCell>
//                       <TableCell align="left">{product.name}</TableCell>
//                       <TableCell align="left">{product.quantity}</TableCell>
//                       <TableCell align="left">{product.price}</TableCell>
//                       <TableCell align="left">
//                         {product.category.name}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TableContainer
//             sx={{ height: "20%" }}
//             style={{ borderTop: "thin groove" }}
//           >
//             <Pagination
//               color="primary"
//               count={product.filters.totalPages}
//               page={page}
//               onChange={handleChangePage}
//               style={{ float: "right" }}
//               size="large"
//             />
//           </TableContainer>
//         </Paper>
//       </Box>
//     </Layout>
//   );
// }

// export default Product;
