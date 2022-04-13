import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Grid, Box, TextField, MenuItem } from "@mui/material";
import { useStyles } from "./product.style";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PreviewImage, TableInput } from "./product.style";

function ProductPickType(props) {
  const classes = new useStyles();
  const { setProductPickType, productTypeDialog, setProductTypeDialog } = props;
  const [productPickTypeCombine, setProductPickTypeCombine] = useState({});
  const [productPickType1, setProductPickType1] = useState({
    nameType: "",
    productTypes: [""],
  });
  const [openProductPickType2, setOpenProductPickType2] = useState(false);
  const [productPickType2, setProductPickType2] = useState({
    nameType: "",
    productTypes: [""],
  });
  const [errorValidate, setErrorValidate] = useState({});
  const [imgIndex, setImgIndex] = useState("");

  useEffect(() => {
    handleProductPickTypeCombine1();
  }, [productPickType1, productPickType2]);

  let error = {};
  let formIsValid = true;

  const HandleValidation = () => {
    if (!productPickType1.nameType) {
      error = !error?.nameType ? { ...error, nameType1: "ระบุ" } : error;
      formIsValid = false;
    }
    // console.log(selectedFile);
    // const selectedFileCheck = [];
    // selectedFile.map((File) => {
    //   if (!File) {
    //     selectedFileCheck.push({ message: "ใส่รูป", error: true });
    //     formIsValid = false;
    //   } else {
    //     selectedFileCheck.push({ error: false });
    //   }
    //   error = { ...error, selectedFileCheck };
    // });
    const productTypes1 = [];
    productPickType1.productTypes.map((productType) => {
      if (!productType) {
        productTypes1.push({ message: "ระบุ", error: true });
        formIsValid = false;
      } else {
        productTypes1.push({ error: false });
      }

      error = { ...error, productTypes1 };
    });
    if (openProductPickType2) {
      if (!productPickType2.nameType) {
        error = !error?.nameType ? { ...error, nameType2: "ระบุ" } : error;
        formIsValid = false;
      }
      const productTypes2 = [];
      productPickType2.productTypes.map((productType) => {
        if (!productType) {
          productTypes2.push({ message: "ระบุ", error: true });
          formIsValid = false;
        } else {
          productTypes2.push({ error: false });
        }

        error = { ...error, productTypes2 };
      });
    }
    if (
      productPickTypeCombine?.productTypes &&
      !productPickTypeCombine?.productTypes[0]?.subType
    ) {
      const productCombineTypes1 = [];
      const checkPicture = [];
      productPickTypeCombine?.productTypes.map((productType, index) => {
        let BuildError = {};
        if (!productType.price) {
          BuildError = {
            ...BuildError,
            price: { message: "ระบุราคา", error: true },
          };
          formIsValid = false;
          productCombineTypes1.push(BuildError);
        }
        let BuildErrorPicture = {};
        if (!productType.picture.upload) {
          BuildErrorPicture = {
            ...BuildErrorPicture,
            picture: { message: "ใส่รูป", error: true },
          };
          formIsValid = false;
        } else {
          BuildErrorPicture = {
            ...BuildErrorPicture,
            picture: { message: "ใส่รูป", error: false },
          };
        }

        checkPicture.push(BuildErrorPicture);
      });
      error = { ...error, productCombineTypes1, checkPicture };
    }
    if (
      productPickTypeCombine?.productTypes &&
      productPickTypeCombine?.productTypes[0]?.subType
    ) {
      const productCombineTypes1 = [];
      const checkPicture = [];
      productPickTypeCombine?.productTypes.map((productType) => {
        let BuildErrorPicture = {};
        if (!productType.picture.upload) {
          BuildErrorPicture = {
            ...BuildErrorPicture,
            picture: { message: "ใส่รูป", error: true },
          };
          formIsValid = false;
        } else {
          BuildErrorPicture = {
            ...BuildErrorPicture,
            picture: { message: "ใส่รูป", error: false },
          };
        }

        checkPicture.push(BuildErrorPicture);
        productType.subType.productSubTypes.map((productSubType) => {
          let BuildError = {};
          if (!productSubType.price) {
            BuildError = {
              ...BuildError,
              price: { message: "ระบุราคา", error: true },
            };
            formIsValid = false;
            productCombineTypes1.push(BuildError);
          }
        });
      });
      error = { ...error, productCombineTypes1, checkPicture };
    }
    console.log(error);
    setErrorValidate(error);
  };

  const handleProductPickTypeCombine1 = () => {
    let newProductPickType1 = { ...productPickType1 };
    let newProductPickType2 = { ...productPickType2 };

    if (newProductPickType2.nameType) {
      const buildProductType = {
        nameType: newProductPickType1.nameType,
        productTypes: newProductPickType1.productTypes.map(
          (productType, index) => ({
            nameType:
              productPickTypeCombine?.productTypes?.[index]?.nameType !==
              productType
                ? productType
                : productPickTypeCombine?.productTypes?.[index]?.nameType,
            picture: {
              upload:
                productPickTypeCombine?.productTypes?.[index]?.picture.upload ||
                "",
              preview:
                productPickTypeCombine?.productTypes?.[index]?.picture
                  .preview || "",
            },
            subType: {
              nameSubType: newProductPickType2?.nameType,
              productSubTypes: newProductPickType2.productTypes.map(
                (productType2, index2) => ({
                  nameType:
                    productPickTypeCombine?.productTypes?.[index]?.subType
                      ?.productSubTypes[index2]?.nameType !== productType2
                      ? productType2
                      : productPickTypeCombine?.productTypes?.[index]?.subType
                          ?.productSubTypes[index2]?.nameType,
                  price:
                    productPickTypeCombine?.productTypes?.[index]?.subType
                      ?.productSubTypes[index2]?.price || "",
                  quantity:
                    productPickTypeCombine?.productTypes?.[index]?.subType
                      ?.productSubTypes[index2]?.quantity || 0,
                })
              ),
            },
          })
        ),
      };

      setProductPickTypeCombine({ ...buildProductType });
      return;
    }
    const buildProductType = {
      nameType: newProductPickType1.nameType,
      productTypes: newProductPickType1.productTypes.map(
        (productType, index) => ({
          nameType:
            productPickTypeCombine?.productTypes?.[index]?.nameType !==
            productType
              ? productType
              : productPickTypeCombine?.productTypes?.[index]?.nameType,
          price: productPickTypeCombine?.productTypes?.[index]?.price || "",
          quantity:
            productPickTypeCombine?.productTypes?.[index]?.quantity || 0,
          picture: {
            upload:
              productPickTypeCombine?.productTypes?.[index]?.picture.upload ||
              "",
            preview:
              productPickTypeCombine?.productTypes?.[index]?.picture.preview ||
              "",
          },
        })
      ),
    };

    setProductPickTypeCombine({ ...buildProductType });
  };

  const handleCloseDialog = () => {
    setProductTypeDialog(false);
    setProductPickType1({
      nameType: "",
      productTypes: [""],
    });
    setProductPickType2({
      nameType: "",
      productTypes: [""],
    });
    setProductPickTypeCombine({});
    setOpenProductPickType2(false);
    setErrorValidate({});
  };

  const handleAddPickType1 = () => {
    if (productPickType1.productTypes.length < 10) {
      // setSelectedFile([...selectedFile, ""]);
      setProductPickType1({
        ...productPickType1,
        productTypes: [...productPickType1.productTypes, ""],
      });
    }
  };

  const handleDelePickType1 = (position) => {
    if (productPickType1.productTypes.length > 1) {
      const deleteProductPickType1 = {
        ...productPickType1,
        productTypes: productPickType1.productTypes.filter(
          (productType, index) => index !== position
        ),
      };
      setProductPickType1(deleteProductPickType1);
      const deleteErrorValidate = errorValidate.productTypes1?.filter(
        (type, index) => index !== position
      );
      setErrorValidate({
        ...errorValidate,
        productTypes1: deleteErrorValidate,
      });
    }
  };

  const handleCreateType1 = (position) => (e) => {
    let newProductPickType1 = { ...productPickType1 };
    newProductPickType1.productTypes[position] = e.target.value;
    setProductPickType1(newProductPickType1);
  };

  const handleAddPickType2 = () => {
    if (productPickType2.productTypes.length < 10) {
      setProductPickType2({
        ...productPickType2,
        productTypes: [...productPickType2.productTypes, ""],
      });
    }
  };

  const handleDelePickType2 = (position) => {
    if (productPickType2.productTypes.length > 1) {
      const deleteProductPickType2 = {
        ...productPickType2,
        productTypes: productPickType2.productTypes.filter(
          (productType, index) => index !== position
        ),
      };
      setProductPickType2(deleteProductPickType2);
      const deleteErrorValidate = errorValidate.productTypes2?.filter(
        (type, index) => index !== position
      );
      setErrorValidate({
        ...errorValidate,
        productTypes2: deleteErrorValidate,
      });
    }
  };

  const handleCreateType2 = (position) => (e) => {
    let newProductPickType2 = { ...productPickType2 };
    newProductPickType2.productTypes[position] = e.target.value;
    setProductPickType2(newProductPickType2);
  };

  const handleCloseAddPickType2 = () => {
    setOpenProductPickType2(false);
    setProductPickType2({
      nameType: "",
      productTypes: [""],
    });
    const { nameType1, productTypes1 } = { ...errorValidate };
    setErrorValidate({ nameType1, productTypes1 });
  };

  const handleSave = () => {
    // console.log(productPickType1, productPickType2);
    console.log(productPickTypeCombine);
    // console.log(errorValidate);
    HandleValidation();
    if (formIsValid) {
      setProductPickType(productPickTypeCombine);
      setProductTypeDialog(false);
      setProductPickType1({
        nameType: "",
        productTypes: [""],
      });
      setProductPickType2({
        nameType: "",
        productTypes: [""],
      });
      setOpenProductPickType2(false);
      setProductPickTypeCombine({});
      setErrorValidate({});
    }
  };

  const buildTable = () => {
    if (
      productPickTypeCombine?.nameType &&
      productPickTypeCombine?.productTypes?.length > 0 &&
      !productPickTypeCombine?.productTypes[0]?.subType
    ) {
      return (
        <TableInput>
          <table>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>
                  {productPickTypeCombine?.nameType}
                </th>
                <th style={{ width: "100px" }}>ราคา</th>
                <th style={{ width: "100px" }}>คลัง</th>
              </tr>
            </thead>
            <tbody>
              {productPickTypeCombine.productTypes.map((productType, index) => (
                <tr key={index}>
                  <td>{productType.nameType}</td>
                  <td>
                    <input
                      value={productPickTypeCombine.productTypes[index].price}
                      placeholder="0"
                      type="number"
                      onChange={(e) => {
                        let newProductPickTypeCombine = {
                          ...productPickTypeCombine,
                        };
                        newProductPickTypeCombine.productTypes[index].price =
                          e.target.value;
                        setProductPickTypeCombine(newProductPickTypeCombine);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={
                        productPickTypeCombine.productTypes[index].quantity
                      }
                      type="number"
                      placeholder="0"
                      onChange={(e) => {
                        let newProductPickTypeCombine = {
                          ...productPickTypeCombine,
                        };
                        newProductPickTypeCombine.productTypes[index].quantity =
                          e.target.value;
                        setProductPickTypeCombine(newProductPickTypeCombine);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "grid", placeItems: "center", color: "red" }}>
            {errorValidate?.productCombineTypes1?.length > 0
              ? "กรอกราคาให้ครบ"
              : null}
          </div>
        </TableInput>
      );
    } else if (
      productPickTypeCombine?.nameType &&
      productPickTypeCombine?.productTypes?.length > 0 &&
      productPickTypeCombine?.productTypes[0]?.subType
    ) {
      return (
        <TableInput>
          <table>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>
                  {productPickTypeCombine?.nameType}
                </th>
                {productPickTypeCombine?.productTypes[0]?.subType
                  ?.nameSubType ? (
                  <th style={{ width: "80px" }}>
                    {
                      productPickTypeCombine?.productTypes[0]?.subType
                        ?.nameSubType
                    }
                  </th>
                ) : null}
                <th style={{ width: "100px" }}>ราคา</th>
                <th style={{ width: "100px" }}>คลัง</th>
              </tr>
            </thead>
            <tbody>
              {productPickTypeCombine.productTypes.map(
                (productType, index1) => (
                  <tr key={index1}>
                    <td>{productType.nameType}</td>
                    <td>
                      {productType.subType.productSubTypes.map(
                        (productSubType, index) => (
                          <div key={index}>{productSubType.nameType}</div>
                        )
                      )}
                    </td>
                    <td>
                      {productType.subType.productSubTypes.map(
                        (productSubType, index2) => (
                          <div key={index2}>
                            <input
                              type="number"
                              value={
                                productPickTypeCombine?.productTypes?.[index1]
                                  ?.subType?.productSubTypes[index2]?.price
                              }
                              placeholder="0"
                              onChange={(e) => {
                                let newProductPickTypeCombine = {
                                  ...productPickTypeCombine,
                                };
                                newProductPickTypeCombine.productTypes[
                                  index1
                                ].subType.productSubTypes[index2].price =
                                  e.target.value;
                                setProductPickTypeCombine(
                                  newProductPickTypeCombine
                                );
                              }}
                            />
                          </div>
                        )
                      )}
                    </td>
                    <td>
                      {productType.subType.productSubTypes.map(
                        (productSubType, index2) => (
                          <div key={index2}>
                            <input
                              type="number"
                              value={
                                productPickTypeCombine?.productTypes?.[index1]
                                  ?.subType?.productSubTypes[index2]?.quantity
                              }
                              placeholder="0"
                              onChange={(e) => {
                                let newProductPickTypeCombine = {
                                  ...productPickTypeCombine,
                                };
                                newProductPickTypeCombine.productTypes[
                                  index1
                                ].subType.productSubTypes[index2].quantity =
                                  e.target.value;
                                setProductPickTypeCombine(
                                  newProductPickTypeCombine
                                );
                              }}
                            />
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div style={{ display: "grid", placeItems: "center", color: "red" }}>
            {errorValidate?.productCombineTypes1?.length > 0
              ? "กรอกราคาให้ครบ"
              : null}
          </div>
        </TableInput>
      );
    }
  };

  const handleFileInput = (e) => {
    const nweProductPickTypeCombine = { ...productPickTypeCombine };
    nweProductPickTypeCombine.productTypes[imgIndex].picture.upload =
      e.target.files[0];
    nweProductPickTypeCombine.productTypes[
      imgIndex
    ].picture.preview = URL.createObjectURL(e.target.files[0]);
    setProductPickTypeCombine(nweProductPickTypeCombine);
  };

  const handleDeleteImage = (pos) => {
    const deleteProductPicture = { ...productPickTypeCombine };
    deleteProductPicture.productTypes[pos].picture = {
      upload: "",
      preview: "",
    };

    setProductPickTypeCombine(deleteProductPicture);
  };

  return (
    <div>
      <Dialog
        open={productTypeDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        style={{ zIndex: "998" }}
      >
        <DialogTitle id="alert-dialog-title">
          เพิ่มลักษณะเลือกสินค้า
        </DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ marginTop: "5px" }}>
              <Grid item xs={3}>
                ตัวเลือก 1
              </Grid>
              <Grid item xs={9}>
                <TextField
                  error={errorValidate?.nameType1 ? true : false}
                  label="ชื่อตัวเลือกเช่น สี "
                  style={{ width: "250px" }}
                  value={productPickType1.nameType}
                  onChange={(e) =>
                    setProductPickType1({
                      ...productPickType1,
                      nameType: e.target.value,
                    })
                  }
                  helperText={
                    errorValidate?.nameType1 ? errorValidate?.nameType1 : null
                  }
                />

                {productPickType1.productTypes.map((productType, index) => (
                  <div key={index}>
                    <TextField
                      error={
                        errorValidate?.productTypes1?.[index]?.error
                          ? true
                          : false
                      }
                      helperText={
                        errorValidate?.productTypes1?.[index]?.message
                          ? errorValidate?.productTypes1?.[index]?.message
                          : null
                      }
                      value={productType}
                      onChange={handleCreateType1(index)}
                      label="ใส่ข้อมูลตัวเลือกสินค้า"
                      style={{
                        width: "250px",
                        marginTop: "10px",
                        displa: "grid",
                      }}
                    />
                    <AiOutlineDelete
                      size={"20px"}
                      style={{ marginTop: "30px", cursor: "pointer" }}
                      onClick={() => handleDelePickType1(index)}
                    />
                  </div>
                ))}
                <div
                  className={classes.addTypeButton}
                  onClick={handleAddPickType1}
                >
                  <IoAddCircleOutline size={"25px"} />
                  <p>เพิ่มตัวเลือก</p>
                  <p>({productPickType1.productTypes.length}/10)</p>
                </div>
              </Grid>
              <Grid item xs={3} style={{ marginTop: "10px" }}>
                ตัวเลือก 2
              </Grid>
              <Grid item xs={9}>
                {openProductPickType2 ? (
                  <>
                    <TextField
                      error={errorValidate?.nameType2 ? true : false}
                      helperText={
                        errorValidate?.nameType2
                          ? errorValidate?.nameType2
                          : null
                      }
                      label="ชื่อตัวเลือกเช่น สี "
                      style={{ width: "250px" }}
                      value={productPickType2.nameType}
                      onChange={(e) =>
                        setProductPickType2({
                          ...productPickType2,
                          nameType: e.target.value,
                        })
                      }
                    />

                    {productPickType2.productTypes.map((productType, index) => (
                      <div key={index}>
                        <TextField
                          error={
                            errorValidate?.productTypes2?.[index]?.error
                              ? true
                              : false
                          }
                          helperText={
                            errorValidate?.productTypes2?.[index]?.message
                              ? errorValidate?.productTypes2?.[index]?.message
                              : null
                          }
                          value={productType}
                          onChange={handleCreateType2(index)}
                          label="ใส่ข้อมูลตัวเลือกสินค้า"
                          style={{
                            width: "250px",
                            marginTop: "10px",
                            displa: "grid",
                          }}
                        />
                        <AiOutlineDelete
                          size={"20px"}
                          style={{ marginTop: "30px", cursor: "pointer" }}
                          onClick={() => handleDelePickType2(index)}
                        />
                      </div>
                    ))}
                    <div
                      className={classes.addTypeButton}
                      onClick={handleAddPickType2}
                    >
                      <IoAddCircleOutline size={"25px"} />
                      <p>เพิ่มตัวเลือก</p>
                      <p>({productPickType2.productTypes.length}/10)</p>
                    </div>
                    <div
                      className={classes.addTypeButton}
                      onClick={handleCloseAddPickType2}
                    >
                      <p>ยกเลิก</p>
                    </div>
                  </>
                ) : (
                  <div
                    className={classes.addPickeType2Button}
                    onClick={() => {
                      setOpenProductPickType2(true);
                      setErrorValidate({});
                    }}
                  >
                    <IoAddCircleOutline size={"25px"} />
                    <p>เพิ่ม</p>
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.TablePickType}
                style={{ marginTop: "30px" }}
              >
                {buildTable()}
              </Grid>
              {productPickTypeCombine?.nameType ? (
                <Grid item xs={2} style={{ marginTop: "70px" }}>
                  {productPickTypeCombine?.nameType}
                </Grid>
              ) : (
                <Grid item xs={2} style={{ marginTop: "70px" }}>
                  รูป
                </Grid>
              )}
              <Grid item xs={10} style={{ marginTop: "30px" }}>
                <Grid container>
                  {productPickTypeCombine?.productTypes?.map(
                    (productType, index) => (
                      <Grid xs={4} item key={index}>
                        {productType?.picture?.preview ? (
                          <>
                            <PreviewImage>
                              <AiOutlineClose
                                className="deleteIcon"
                                size={20}
                                onClick={() => handleDeleteImage(index)}
                                style={{ marginLeft: "100px" }}
                              />
                              <img
                                src={productType.picture.preview}
                                style={{
                                  width: "120px",
                                  height: "120px",
                                }}
                              />
                            </PreviewImage>
                            <div style={{ marginLeft: "30px" }}>
                              {productType.nameType}
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <label htmlFor="file-input-type">
                                <img
                                  src="/icon/imgInput.png"
                                  style={{
                                    width: "120px",
                                    height: "120px",
                                  }}
                                  onClick={() => setImgIndex(index)}
                                />
                              </label>
                              <input
                                id="file-input-type"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileInput}
                                accept="image/png, image/gif, image/jpeg"
                              />
                              {errorValidate?.checkPicture?.[index]?.picture
                                .error ? (
                                <div
                                  style={{ marginLeft: "35px", color: "red" }}
                                >
                                  {
                                    errorValidate?.checkPicture?.[index].picture
                                      .message
                                  }
                                </div>
                              ) : null}
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                              {productType.nameType}
                            </div>
                          </>
                        )}
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button autoFocus onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductPickType;
