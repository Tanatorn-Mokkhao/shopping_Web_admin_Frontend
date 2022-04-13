import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Pagination } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProduct,
  PatchProductStatus,
  CreateProduct,
  ClearError,
  UpdateProduct,
} from "../../action/product/productAction";
import { GetCategory } from "../../action/category/categoryAction";
import DateIsotoString from "../../component/dateIsotoString/dateIsotoString";
import Switch from "@mui/material/Switch";
import Loader from "../../component/loader/loader";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  FloatButton,
  PreviewImage,
  listTableBody,
  listTableBodyAction,
  useStyles,
  ProductTypeSelect,
} from "./product.style";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Grid, Box, TextField, MenuItem } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { HandleUploadImage, HandleUploadOneImage } from "../../thirdparty/s3";
import { numberRegex } from "../../utils/regex";
import { APP_BAD_REQUEST } from "../../service-share/const/bad-request.const";
import AlertToast from "../../component/alertToast/alertToast";
import ProductPickType from "./productPickType";
import ConfirmAlert from "../../component/confirmAlert/confirmAlert";
import EditProductType from "./editProductPickType";
import ProductTypeTable from "./productTypeTable";

// import Loader from "../../component/loader/loader";
// import { APP_BAD_REQUEST } from "../../service-share/const/bad-request.const";
// import AlertToast from "../../component/alertToast/alertToast";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";

function Product(props) {
  const classes = useStyles();
  const search = props.location.search;
  const category = useSelector((state) => state.category);
  const [order, setOrder] = useState(
    new URLSearchParams(search).get("orderBy") || "desc"
  );
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [searchBar, setSearchBar] = useState(
    new URLSearchParams(search).get("search") || ""
  );
  const [createDialog, setCreateDialog] = useState(false);
  const [AddParent, setAddParent] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);
  const [preViewImg, setPreViewImg] = useState([]);
  const [errorValidate, setErrorValidate] = useState({});
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const [detailProduct, setDetailProduct] = useState({});
  const [editProduct, setEditProduct] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editPicture, setEditPicture] = useState([]);
  const [productTypeDialog, setProductTypeDialog] = useState(false);
  const [productPickType, setProductPickType] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const [editProductType, setEditProductType] = useState({});
  const [editProductTypeDialog, setEditProductTypeDialog] = useState(false);

  useEffect(() => {
    PageHandle();
    dispatch(GetCategory());
  }, [props]);

  let error = {};
  let formIsValid = true;

  const HandleValidation = () => {
    if (!productName) {
      error = !error?.productName ? { ...error, productName: "ระบุ" } : error;
      formIsValid = false;
    }
    if (selectedFile?.length === 0) {
      error = !error?.selectedFile
        ? { ...error, selectedFile: "เลือก 1 รูป" }
        : error;
      formIsValid = false;
    }
    if (!AddParent?.name) {
      error = !error?.category ? { ...error, category: "เลือกประเภท" } : error;
      formIsValid = false;
    }
    if (!productPrice) {
      error = !error?.price ? { ...error, price: "ระบุ" } : error;
      formIsValid = false;
    }
    if (!numberRegex.test(productPrice)) {
      error = !error?.price ? { ...error, price: "ตัวเลข" } : error;
      formIsValid = false;
    }
    if (!productQuantity) {
      error = !error?.quantity ? { ...error, quantity: "ระบุ" } : error;
      formIsValid = false;
    }
    if (!numberRegex.test(productQuantity)) {
      error = !error?.quantity ? { ...error, quantity: "ตัวเลข" } : error;
      formIsValid = false;
    }
    setErrorValidate(error);
  };

  const HandleValidationEdit = () => {
    if (!editName) {
      error = !error?.productName ? { ...error, productName: "ระบุ" } : error;
      formIsValid = false;
    }
    if (selectedFile?.length === 0 && editPicture?.length === 0) {
      error = !error?.selectedFile
        ? { ...error, selectedFile: "เลือก 1 รูป" }
        : error;
      formIsValid = false;
    }
    if (!editCategory?.name) {
      error = !error?.category ? { ...error, category: "เลือกประเภท" } : error;
      formIsValid = false;
    }
    if (!editPrice) {
      error = !error?.price ? { ...error, price: "ระบุ" } : error;
      formIsValid = false;
    }
    if (!numberRegex.test(editPrice)) {
      error = !error?.price ? { ...error, price: "ตัวเลข" } : error;
      formIsValid = false;
    }
    if (!editQuantity) {
      error = !error?.quantity ? { ...error, quantity: "ระบุ" } : error;
      formIsValid = false;
    }
    if (!numberRegex.test(editQuantity)) {
      error = !error?.quantity ? { ...error, quantity: "ตัวเลข" } : error;
      formIsValid = false;
    }

    setErrorValidate(error);
  };

  const PageHandle = () => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(parseInt(page));
    dispatch(GetProduct(page, order, searchBar));
  };

  const handleRequestSort = () => {
    const sortOrder = order === "desc" ? "asc" : "desc";
    setOrder(sortOrder);
    props.history.push({
      pathname: "/product",
      search: `limit=10&page=1&orderBy=${sortOrder}&search=${searchBar}`,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.history.push({
      pathname: "/product",
      search: `limit=10&page=${newPage}&orderBy=${order}&search=${searchBar}`,
    });
  };

  const handleChangeSwichProduct = (e) => {
    const { id, checked } = e;
    const status = checked ? "active" : "inactive";
    dispatch(PatchProductStatus(id, { statusProduct: status }));
  };

  const handleSwichProduct = (product) => {
    return (
      <Switch
        id={product.id}
        checked={product.statusProduct === "active" ? true : false}
        onChange={(e) => handleChangeSwichProduct(e.target)}
      />
    );
  };

  const handleRunNumber = (number) => {
    return (product.filters.page - 1) * product.filters.limit + number + 1;
  };

  const handleSearchBar = () => {
    const sortOrder = order === "desc" ? "asc" : "desc";

    props.history.push({
      pathname: "/product",
      search: `limit=10&page=1&orderBy=${sortOrder}&search=${searchBar}`,
    });
  };

  const handleSearchBarEnterPress = (e) => {
    const sortOrder = order === "desc" ? "asc" : "desc";

    if (e.key === "Enter") {
      props.history.push({
        pathname: "/product",
        search: `limit=10&page=1&orderBy=${sortOrder}&search=${searchBar}`,
      });
    }
  };

  const handleCloseCreateDialog = () => {
    setCreateDialog(false);
    setPreViewImg([]);
    setSelectedFile([]);
    setErrorValidate({});
    setProductQuantity("");
    setAddParent({});
    setProductPrice("");
    setProductName("");
    setProductPickType({});
    dispatch(ClearError());
  };

  const handleCloseOpenDialogProduct = () => {
    setOpenDialogProduct(false);
    setEditProduct(false);
    setPreViewImg([]);
    setSelectedFile([]);
    dispatch(ClearError());
  };

  const handleOpenDialogProduct = (product) => {
    setOpenDialogProduct(true);
    setDetailProduct(product);
  };

  const renderCreateOption = (category, option = []) => {
    for (let cat of category) {
      option.push({
        id: cat.id,
        name: cat.name,
        parentCategory: cat.parentCategory.id,
      });
      if (cat.children.length > 0) {
        renderCreateOption(cat.children, option);
      }
    }
    return option;
  };

  const handleOnSelectMenuCreate = (e) => {
    const categoryList = renderCreateOption(category.categories);
    const parentCategory = categoryList.find(
      (cat) => cat.name === e.target.value
    );

    if (parentCategory !== undefined) {
      setAddParent(parentCategory);
    } else {
      setAddParent({});
    }
  };

  const handleOnSelectMenuEdit = (e) => {
    const categoryList = renderCreateOption(category.categories);
    const parentCategory = categoryList.find(
      (cat) => cat.name === e.target.value
    );

    if (parentCategory !== undefined) {
      setEditCategory(parentCategory);
    } else {
      setEditCategory({});
    }
  };

  const handleFileInput = async (e) => {
    const fileImage = [...e.target.files];
    setSelectedFile([...selectedFile, ...fileImage]);

    const imageUrls = [];
    fileImage.forEach((image) => imageUrls.push(URL.createObjectURL(image)));
    setPreViewImg([...preViewImg, ...imageUrls]);
  };

  const handleFileInputEdit = async (e) => {
    const fileImage = [...e.target.files];
    setSelectedFile([...selectedFile, ...fileImage]);

    const imageUrls = [];
    fileImage.forEach((image) => imageUrls.push(URL.createObjectURL(image)));
    setPreViewImg([...preViewImg, ...imageUrls]);
  };

  const handleCreateSave = async () => {
    HandleValidation();
    if (formIsValid) {
      const imageUrls = await HandleUploadImage(selectedFile);
      let buildProductType = {};

      if (productPickType.productTypes) {
        const newProductPickType = { ...productPickType };
        buildProductType = {
          ...newProductPickType,
          productTypes: await Promise.all(
            newProductPickType.productTypes.map(async (productType) => {
              if (!productType.picture.upload) {
                return;
              }
              const imageUrls = await HandleUploadOneImage(
                productType.picture.upload
              );

              return { ...productType, picture: imageUrls };
            })
          ),
        };
      }

      const playload = {
        name: productName,
        category: AddParent,
        price: productPrice,
        quantity: productQuantity,
        picture: imageUrls,
        productPickType: buildProductType,
      };
      dispatch(CreateProduct(playload)).then((err) => {
        if (!err) {
          handleCloseCreateDialog();
        }
      });
      console.log(playload);
    }
  };

  const handleDeleteImage = (position) => {
    const delePreviewImage = preViewImg.filter(
      (image, index) => index !== position
    );
    const deleSelectedFile = selectedFile.filter(
      (image, index) => index !== position
    );
    setPreViewImg([...delePreviewImage]);
    setSelectedFile([...deleSelectedFile]);
  };

  const handleDeleteImageEdit = (position) => {
    const delePreviewImage = editPicture.filter(
      (image, index) => index !== position
    );
    setEditPicture([...delePreviewImage]);
  };

  const handleEditOpend = () => {
    setEditProduct(true);
    setEditName(detailProduct.name);
    setEditCategory(detailProduct.category);
    setEditPrice(detailProduct.price);
    setEditQuantity(detailProduct.quantity);
    setEditPicture(detailProduct.picture);
    setEditProductType(detailProduct.productPickType);
    console.log(editProductType);
  };

  const handleDialogCloseEdit = () => {
    dispatch(ClearError());
    setEditProduct(false);
    setPreViewImg([]);
    setSelectedFile([]);
    setErrorValidate({});
  };

  const handleSaveEdit = async () => {
    HandleValidationEdit();
    if (formIsValid) {
      let buildProductType = {};
      if (editProductType.productTypes) {
        const newProductPickType = { ...editProductType };
        buildProductType = {
          ...newProductPickType,
          productTypes: await Promise.all(
            newProductPickType.productTypes.map(async (productType) => {
              if (!productType.picture.upload && productType.picture.src) {
                return productType;
              }
              const imageUrls = await HandleUploadOneImage(
                productType.picture.upload
              );

              return { ...productType, picture: imageUrls };
            })
          ),
        };
      }

      let payload;
      if (selectedFile.length > 0) {
        const imageUrls = await HandleUploadImage(selectedFile);
        payload = {
          category: editCategory,
          price: editPrice,
          quantity: editQuantity,
          picture: [...editPicture, ...imageUrls],
          productPickType: buildProductType,
        };
      } else {
        payload = {
          category: editCategory,
          price: editPrice,
          quantity: editQuantity,
          picture: [...editPicture],
          productPickType: buildProductType,
        };
        if (detailProduct.name !== editName) {
          payload.name = editName;
        }
      }

      dispatch(UpdateProduct(detailProduct.id, payload)).then((err) => {
        if (!err) {
          handleCloseOpenDialogProduct();
        }
      });
    }
  };

  return (
    <Layout
      sidebarClick={"product"}
      searchBar
      value={searchBar}
      onChange={(e) => setSearchBar(e.target.value)}
      onClick={handleSearchBar}
      onKeyPress={handleSearchBarEnterPress}
    >
      <Loader />
      <ConfirmAlert
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {product.errors.code ? (
        <AlertToast
          type="show"
          message={APP_BAD_REQUEST[product.errors.code]}
        />
      ) : null}
      <Box sx={{ width: "100%", height: "90vh" }}>
        <Paper
          sx={{ width: "99%", mb: 2, height: "90vh" }}
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
                    รหัสสินค้า
                  </TableCell>
                  <TableCell align={"left"} padding={"normal"}>
                    <TableSortLabel
                      active={true}
                      direction={order}
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
                  <TableCell align={"left"} padding={"normal"}>
                    ประเภท
                  </TableCell>
                  <TableCell align={"left"} padding={"normal"}>
                    ปิด/เปิด
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflowY: "scroll" }}>
                {product.products.map((product, index) => {
                  return (
                    <TableRow key={product.code} className={classes.tableRow}>
                      <TableCell align="left" style={listTableBody}>
                        {handleRunNumber(index)}
                      </TableCell>
                      <TableCell align="left" style={listTableBody}>
                        {product.code}
                      </TableCell>
                      <TableCell align="left" style={listTableBody}>
                        {DateIsotoString(product.createdAt)}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={listTableBodyAction}
                        onClick={() => handleOpenDialogProduct(product)}
                      >
                        {product.name}
                      </TableCell>
                      <TableCell align="left" style={listTableBody}>
                        {product.quantity}
                      </TableCell>
                      <TableCell align="left" style={listTableBody}>
                        {product.price}
                      </TableCell>
                      <TableCell align="left" style={listTableBody}>
                        {product.category.name}
                      </TableCell>
                      <TableCell align="left">
                        {handleSwichProduct(product)}
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
              count={product.filters.totalPages}
              page={page}
              onChange={handleChangePage}
              style={{ float: "right", marginTop: "8px" }}
              size="large"
            />
          </TableContainer>
        </Paper>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        style={FloatButton}
        onClick={() => setCreateDialog(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={createDialog}
        onClose={handleCloseCreateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        style={{ zIndex: "998" }}
      >
        <DialogTitle id="alert-dialog-title">เพิ่มสินค้า</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                <TextField
                  error={
                    errorValidate?.productName || product.errors.code === 40103
                      ? true
                      : false
                  }
                  label="ชื่อสินค้า"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  helperText={
                    errorValidate?.productName
                      ? errorValidate?.productName
                      : product.errors.code === 40103
                      ? `${APP_BAD_REQUEST[product.errors.code]}`
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                <TextField
                  error={errorValidate?.category ? true : false}
                  id="outlined-select-currency"
                  select
                  label="Select"
                  onChange={handleOnSelectMenuCreate}
                  value={AddParent.name || "none"}
                  helperText="Please select your category"
                >
                  <MenuItem key={null} value={"none"}>
                    เลือกประเภทสินค้า
                  </MenuItem>
                  {renderCreateOption(category.categories).map(
                    (option, index) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                <TextField
                  error={errorValidate?.price ? true : false}
                  label="ราคา"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  helperText={
                    errorValidate?.price ? errorValidate?.price : null
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                <TextField
                  error={errorValidate?.quantity ? true : false}
                  label="จำนวน"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  helperText={
                    errorValidate?.quantity ? errorValidate?.quantity : null
                  }
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "5px" }}>
                <Grid item>
                  <label htmlFor="file-input">
                    <img src="/icon/imgInput.png" style={{ width: "120px" }} />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileInput}
                    multiple="multiple"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </Grid>
                <Grid item style={{ color: "red", marginLeft: "25px" }}>
                  {errorValidate?.selectedFile
                    ? errorValidate?.selectedFile
                    : null}
                </Grid>
              </Grid>

              {preViewImg.length > 0
                ? preViewImg.map((img, index) => {
                    return (
                      <Grid item xs={12} md={6} lg={3} key={index}>
                        <PreviewImage>
                          <AiOutlineClose
                            className="deleteIcon"
                            size={20}
                            onClick={() => handleDeleteImage(index)}
                            style={{ marginLeft: "100px" }}
                          />
                          <img
                            src={img}
                            style={{ width: "120px", height: 120 }}
                          />
                        </PreviewImage>
                      </Grid>
                    );
                  })
                : null}
              {/* type pick */}
            </Grid>
            {Object.keys(productPickType).length > 0 ? (
              <Grid container spacing={2} style={{ marginTop: "5px" }}>
                <Grid
                  item
                  xs={4}
                  style={{ marginTop: "5px" }}
                  className={classes.ProductPickType}
                  onClick={() => setEditProductTypeDialog(true)}
                >
                  แก้ไขตัวเลือกสินค้า
                </Grid>
                <Grid
                  item
                  xs={8}
                  style={{ marginTop: "5px" }}
                  className={classes.ProductPickType}
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: "คุณต้องการลบหรือไม่",
                      onConfirm: () => {
                        setProductPickType({});
                      },
                    })
                  }
                >
                  ลบตัวเลือกสินค้า
                </Grid>
              </Grid>
            ) : (
              <Grid
                item
                xs={4}
                style={{ marginTop: "5px" }}
                className={classes.ProductPickType}
                onClick={() => setProductTypeDialog(true)}
              >
                เพิ่มตัวเลือกสินค้า
              </Grid>
            )}
            <ProductPickType
              productTypeDialog={productTypeDialog}
              setProductTypeDialog={setProductTypeDialog}
              productPickType={productPickType}
              setProductPickType={setProductPickType}
            />
            <EditProductType
              setEditProductTypeDialog={setEditProductTypeDialog}
              editProductTypeDialog={editProductTypeDialog}
              productPickType={productPickType}
              setProductPickType={setProductPickType}
            />
            {productPickType?.nameType &&
            !productPickType?.productTypes[0]?.subType ? (
              <Grid container spacing={2} style={{ marginTop: "5px" }}>
                <Grid item xs={3} style={{ marginTop: "30px" }}>
                  ตัวเลือกที่ 1
                </Grid>
                {/* <Grid item xs={9} style={{ marginTop: "30px" }}> */}
                <Grid
                  container={true}
                  item
                  xs={9}
                  style={{ marginTop: "30px" }}
                >
                  <Grid item xs={3}>
                    {productPickType?.nameType} :
                  </Grid>
                  {productPickType.productTypes.map((productType, index) => (
                    <Grid item xs={3} key={index}>
                      {productType.nameType}
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12} style={{ marginTop: "30px" }}>
                  <ProductTypeTable productType={productPickType} />
                </Grid>
                <Grid item xs={2} style={{ marginTop: "70px" }}>
                  {productPickType?.nameType}
                </Grid>
                <Grid item xs={10} style={{ marginTop: "30px" }}>
                  <Grid container>
                    {productPickType?.productTypes?.map(
                      (productType, index) => (
                        <Grid xs={4} item key={index}>
                          <div>
                            <img
                              src={productType.picture.preview}
                              style={{
                                width: "120px",
                                height: "120px",
                              }}
                            />
                          </div>
                          <div style={{ marginLeft: "30px" }}>
                            {productType.nameType}
                          </div>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ) : productPickType?.nameType &&
              productPickType?.productTypes[0]?.subType ? (
              <Grid container spacing={2} style={{ marginTop: "5px" }}>
                <Grid item xs={3} style={{ marginTop: "30px" }}>
                  ตัวเลือกที่ 1
                </Grid>
                <Grid
                  container={true}
                  item
                  xs={9}
                  style={{ marginTop: "30px" }}
                >
                  <Grid item xs={3}>
                    {productPickType?.nameType} :
                  </Grid>
                  {productPickType.productTypes.map((productType, index) => (
                    <Grid item xs={3} key={index}>
                      {productType.nameType}
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={3} style={{ marginTop: "30px" }}>
                  ตัวเลือกที่ 2
                </Grid>
                <Grid
                  container={true}
                  item
                  xs={9}
                  style={{ marginTop: "30px" }}
                >
                  <Grid item xs={3}>
                    {productPickType.productTypes[0].subType?.nameSubType} :
                  </Grid>
                  {productPickType.productTypes[0].subType.productSubTypes.map(
                    (productSubType, index) => (
                      <Grid item xs={3} key={index}>
                        {productSubType.nameType}
                      </Grid>
                    )
                  )}
                </Grid>
                <Grid item xs={12} style={{ marginTop: "30px" }}>
                  <ProductTypeTable productType={productPickType} />
                </Grid>
                <Grid item xs={10} style={{ marginTop: "30px" }}>
                  <Grid container>
                    {productPickType?.productTypes?.map(
                      (productType, index) => (
                        <Grid xs={4} item key={index}>
                          <div>
                            <img
                              src={productType.picture.preview}
                              style={{
                                width: "120px",
                                height: "120px",
                              }}
                            />
                          </div>
                          <div style={{ marginLeft: "30px" }}>
                            {productType.nameType}
                          </div>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Disagree</Button>
          <Button autoFocus onClick={handleCreateSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogProduct}
        onClose={handleCloseOpenDialogProduct}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
        style={{ zIndex: "998" }}
      >
        <DialogTitle id="alert-dialog-title">รายละเอียดสินค้า</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                {!editProduct ? (
                  <>
                    <p style={{ fontWeight: "bold" }}>ชื่อสินค้า</p>
                    <p>{detailProduct.name}</p>
                  </>
                ) : (
                  <TextField
                    error={
                      errorValidate?.productName ||
                      product.errors.code === 40103
                        ? true
                        : false
                    }
                    label="ชื่อสินค้า"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    helperText={
                      errorValidate?.productName
                        ? errorValidate?.productName
                        : product.errors.code === 40103
                        ? `${APP_BAD_REQUEST[product.errors.code]}`
                        : null
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                {!editProduct ? (
                  <>
                    <p style={{ fontWeight: "bold" }}>ประเภทสินค้า</p>
                    <p> {detailProduct.category?.name}</p>
                  </>
                ) : (
                  <TextField
                    // error={errorValidate?.category ? true : false}
                    id="outlined-select-currency"
                    select
                    label="Select"
                    onChange={handleOnSelectMenuEdit}
                    value={editCategory.name}
                    helperText="Please select your category"
                  >
                    {renderCreateOption(category.categories).map(
                      (option, index) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                )}
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                {!editProduct ? (
                  <>
                    <p style={{ fontWeight: "bold" }}>ราคา</p>
                    <p> {detailProduct.price}</p>
                  </>
                ) : (
                  <TextField
                    error={errorValidate?.price ? true : false}
                    label="ราคา"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    helperText={
                      errorValidate?.price ? errorValidate?.price : null
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
                {!editProduct ? (
                  <>
                    <p style={{ fontWeight: "bold" }}>จำนวน</p>
                    <p>{detailProduct.quantity}</p>
                  </>
                ) : (
                  <TextField
                    error={errorValidate?.quantity ? true : false}
                    label="จำนวน"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    helperText={
                      errorValidate?.quantity ? errorValidate?.quantity : null
                    }
                  />
                )}
              </Grid>
              {/* <Grid item xs={12} md={6} style={{ marginTop: "5px" }}> */}
              {editProduct ? (
                <Grid item xs={12} style={{ marginTop: "5px" }}>
                  <Grid item>
                    <label htmlFor="file-input">
                      <img
                        src="/icon/imgInput.png"
                        style={{ width: "120px" }}
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileInputEdit}
                      multiple="multiple"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </Grid>
                  <Grid item style={{ color: "red", marginLeft: "25px" }}>
                    {errorValidate?.selectedFile
                      ? errorValidate?.selectedFile
                      : null}
                  </Grid>
                </Grid>
              ) : null}
              {!editProduct ? (
                <>
                  {detailProduct.picture
                    ? detailProduct.picture.map((img, index) => (
                        <Grid item xs={12} md={6} lg={3} key={index}>
                          <img
                            key={index}
                            src={img.src}
                            style={{ width: "120px", height: "120px" }}
                          />{" "}
                        </Grid>
                      ))
                    : null}
                </>
              ) : (
                <>
                  {editPicture
                    ? editPicture.map((img, index) => (
                        <Grid item xs={12} md={6} lg={3} key={index}>
                          <PreviewImage>
                            <AiOutlineClose
                              className="deleteIcon"
                              size={20}
                              onClick={() => handleDeleteImageEdit(index)}
                              style={{ marginLeft: "100px" }}
                            />
                            <img
                              src={img.src}
                              style={{ width: "120px", height: "120px" }}
                            />
                          </PreviewImage>
                        </Grid>
                      ))
                    : null}
                  {preViewImg.length > 0
                    ? preViewImg.map((img, index) => {
                        return (
                          <Grid item xs={12} md={6} lg={3} key={index}>
                            <PreviewImage>
                              <AiOutlineClose
                                className="deleteIcon"
                                size={20}
                                onClick={() => handleDeleteImage(index)}
                                style={{ marginLeft: "100px" }}
                              />
                              <img
                                src={img}
                                style={{ width: "120px", height: "120px" }}
                              />
                            </PreviewImage>
                          </Grid>
                        );
                      })
                    : null}
                </>
              )}
              <Grid item xs={12} style={{ marginTop: "5px" }}>
                {editProduct ? (
                  <Grid container spacing={2} style={{ marginTop: "5px" }}>
                    {editProductType?.productTypes?.length > 0 ? (
                      <Grid container spacing={2} style={{ marginTop: "5px" }}>
                        <Grid
                          item
                          xs={4}
                          style={{ marginTop: "5px" }}
                          className={classes.ProductPickType}
                          onClick={() => setEditProductTypeDialog(true)}
                        >
                          แก้ไขตัวเลือกสินค้า
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          style={{ marginTop: "5px" }}
                          className={classes.ProductPickType}
                          onClick={() =>
                            setConfirmDialog({
                              isOpen: true,
                              title: "คุณต้องการลบหรือไม่",
                              onConfirm: () => {
                                setEditProductType({});
                              },
                            })
                          }
                        >
                          ลบตัวเลือกสินค้า
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Grid
                          item
                          xs={4}
                          style={{ marginTop: "5px" }}
                          className={classes.ProductPickType}
                          onClick={() => setProductTypeDialog(true)}
                        >
                          เพิ่มตัวเลือกสินค้า
                        </Grid>
                        <ProductPickType
                          productTypeDialog={productTypeDialog}
                          setProductTypeDialog={setProductTypeDialog}
                          productPickType={editProductType}
                          setProductPickType={setEditProductType}
                        />
                      </>
                    )}
                    <Grid item xs={12}>
                      {editProductType?.nameType &&
                      !editProductType?.productTypes[0]?.subType ? (
                        <Grid
                          container
                          spacing={2}
                          style={{ marginTop: "5px" }}
                        >
                          <Grid item xs={3} style={{ marginTop: "30px" }}>
                            ตัวเลือกที่ 1
                          </Grid>
                          {/* <Grid item xs={9} style={{ marginTop: "30px" }}> */}
                          <Grid
                            container={true}
                            item
                            xs={9}
                            style={{ marginTop: "30px" }}
                          >
                            <Grid item xs={3}>
                              {editProductType?.nameType} :
                            </Grid>
                            {editProductType.productTypes.map(
                              (productType, index) => (
                                <Grid item xs={3} key={index}>
                                  {productType.nameType}
                                </Grid>
                              )
                            )}
                          </Grid>
                          <Grid item xs={12} style={{ marginTop: "30px" }}>
                            <ProductTypeTable productType={editProductType} />
                          </Grid>
                          <Grid item xs={10} style={{ marginTop: "30px" }}>
                            <Grid container>
                              {editProductType?.productTypes?.map(
                                (productType, index) => (
                                  <Grid xs={4} item key={index}>
                                    <div>
                                      <img
                                        src={
                                          productType.picture.src ||
                                          productType.picture.preview
                                        }
                                        style={{
                                          width: "120px",
                                          height: "120px",
                                        }}
                                      />
                                    </div>
                                    <div style={{ marginLeft: "30px" }}>
                                      {productType.nameType}
                                    </div>
                                  </Grid>
                                )
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : editProductType?.nameType &&
                        editProductType?.productTypes[0]?.subType ? (
                        <Grid
                          container
                          spacing={2}
                          style={{ marginTop: "5px" }}
                        >
                          <Grid item xs={3} style={{ marginTop: "30px" }}>
                            ตัวเลือกที่ 1
                          </Grid>
                          <Grid
                            container={true}
                            item
                            xs={9}
                            style={{ marginTop: "30px" }}
                          >
                            <Grid item xs={3}>
                              {editProductType?.nameType} :
                            </Grid>
                            {editProductType.productTypes.map(
                              (productType, index) => (
                                <Grid item xs={3} key={index}>
                                  {productType.nameType}
                                </Grid>
                              )
                            )}
                          </Grid>
                          <Grid item xs={3} style={{ marginTop: "30px" }}>
                            ตัวเลือกที่ 2
                          </Grid>
                          <Grid
                            container={true}
                            item
                            xs={9}
                            style={{ marginTop: "30px" }}
                          >
                            <Grid item xs={3}>
                              {
                                editProductType.productTypes[0].subType
                                  ?.nameSubType
                              }
                              :
                            </Grid>
                            {editProductType.productTypes[0].subType.productSubTypes.map(
                              (productSubType, index) => (
                                <Grid item xs={3} key={index}>
                                  {productSubType.nameType}
                                </Grid>
                              )
                            )}
                          </Grid>
                          <Grid item xs={12} style={{ marginTop: "30px" }}>
                            <ProductTypeTable productType={editProductType} />
                          </Grid>
                          <Grid item xs={10} style={{ marginTop: "30px" }}>
                            <Grid container>
                              {editProductType?.productTypes?.map(
                                (productType, index) => (
                                  <Grid xs={4} item key={index}>
                                    <div>
                                      <img
                                        src={
                                          productType.picture.src ||
                                          productType.picture.preview
                                        }
                                        style={{
                                          width: "120px",
                                          height: "120px",
                                        }}
                                      />
                                    </div>
                                    <div style={{ marginLeft: "30px" }}>
                                      {productType.nameType}
                                    </div>
                                  </Grid>
                                )
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                    <EditProductType
                      setEditProductTypeDialog={setEditProductTypeDialog}
                      editProductTypeDialog={editProductTypeDialog}
                      productPickType={editProductType}
                      setProductPickType={setEditProductType}
                    />
                  </Grid>
                ) : (
                  <>
                    {detailProduct.productPickType?.nameType &&
                    !detailProduct.productPickType?.productTypes[0]?.subType ? (
                      <Grid container spacing={2} style={{ marginTop: "5px" }}>
                        <Grid item xs={3} style={{ marginTop: "30px" }}>
                          ตัวเลือกที่ 1
                        </Grid>
                        {/* <Grid item xs={9} style={{ marginTop: "30px" }}> */}
                        <Grid
                          container={true}
                          item
                          xs={9}
                          style={{ marginTop: "30px" }}
                        >
                          <Grid item xs={3}>
                            {detailProduct.productPickType?.nameType} :
                          </Grid>
                          {detailProduct.productPickType.productTypes.map(
                            (productType, index) => (
                              <Grid item xs={3} key={index}>
                                {productType.nameType}
                              </Grid>
                            )
                          )}
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "30px" }}>
                          <ProductTypeTable
                            productType={detailProduct.productPickType}
                          />
                        </Grid>
                        <Grid item xs={10} style={{ marginTop: "30px" }}>
                          <Grid container>
                            {detailProduct?.productPickType?.productTypes?.map(
                              (productType, index) => (
                                <Grid xs={4} item key={index}>
                                  <div>
                                    <img
                                      src={productType.picture.src}
                                      style={{
                                        width: "120px",
                                        height: "120px",
                                      }}
                                    />
                                  </div>
                                  <div style={{ marginLeft: "30px" }}>
                                    {productType.nameType}
                                  </div>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : detailProduct.productPickType?.nameType &&
                      detailProduct.productPickType?.productTypes[0]
                        ?.subType ? (
                      <Grid container spacing={2} style={{ marginTop: "5px" }}>
                        <Grid item xs={3} style={{ marginTop: "30px" }}>
                          ตัวเลือกที่ 1
                        </Grid>
                        <Grid
                          container={true}
                          item
                          xs={9}
                          style={{ marginTop: "30px" }}
                        >
                          <Grid item xs={3}>
                            {detailProduct.productPickType?.nameType} :
                          </Grid>
                          {detailProduct.productPickType.productTypes.map(
                            (productType, index) => (
                              <Grid item xs={3} key={index}>
                                {productType.nameType}
                              </Grid>
                            )
                          )}
                        </Grid>
                        <Grid item xs={3} style={{ marginTop: "30px" }}>
                          ตัวเลือกที่ 2
                        </Grid>
                        <Grid
                          container={true}
                          item
                          xs={9}
                          style={{ marginTop: "30px" }}
                        >
                          <Grid item xs={3}>
                            {
                              detailProduct.productPickType.productTypes[0]
                                .subType?.nameSubType
                            }
                            :
                          </Grid>
                          {detailProduct.productPickType.productTypes[0].subType.productSubTypes.map(
                            (productSubType, index) => (
                              <Grid item xs={3} key={index}>
                                {productSubType.nameType}
                              </Grid>
                            )
                          )}
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "30px" }}>
                          <ProductTypeTable
                            productType={detailProduct.productPickType}
                          />
                        </Grid>
                        <Grid item xs={10} style={{ marginTop: "30px" }}>
                          <Grid container>
                            {detailProduct?.productPickType?.productTypes?.map(
                              (productType, index) => (
                                <Grid xs={4} item key={index}>
                                  <div>
                                    <img
                                      src={productType.picture.src}
                                      style={{
                                        width: "120px",
                                        height: "120px",
                                      }}
                                    />
                                  </div>
                                  <div style={{ marginLeft: "30px" }}>
                                    {productType.nameType}
                                  </div>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOpenDialogProduct}>Close</Button>
          {!editProduct ? (
            <Button onClick={handleEditOpend}>Edit</Button>
          ) : (
            <>
              <Button onClick={handleDialogCloseEdit}>CancleEdit</Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default Product;
