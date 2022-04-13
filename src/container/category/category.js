import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, { useTreeItem } from "@mui/lab/TreeItem";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearError,
  GetCategory,
  UpdateCategory,
  CreateCategory,
  DeleteCategory
} from "../../action/category/categoryAction";
import Layout from "../../component/layout/layout";
import { FloatButton, TreeStyles } from "./category.style";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Grid, Box, TextField, MenuItem } from "@mui/material";
import Loader from "../../component/loader/loader";
import { APP_BAD_REQUEST } from "../../service-share/const/bad-request.const";
import AlertToast from "../../component/alertToast/alertToast";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function Category() {
  const classes = TreeStyles();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [dataDialog, setDatadialog] = useState("");
  const [dialogEdit, setDialogEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editParent, setEditParent] = useState("");
  const [creatDialog, setCreateDialog] = useState(false);
  const [addName, setAddName] = useState("");
  const [AddParent, setAddParent] = useState({});

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(GetCategory());
    }
  }, []);

  const handleOnSelectMenu = (e) => {
    const categoryList = renderOption(category.categories);
    const parentCategory = categoryList.find(
      (cat) => cat.name === e.target.value
    );

    if (parentCategory !== undefined) {
      setEditParent(parentCategory);
    } else {
      setEditParent({});
    }
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

  const renderOption = (category, currentCategory, option = []) => {
    for (let cat of category) {
      if (cat.id !== currentCategory) {
        option.push({
          id: cat.id,
          name: cat.name,
          parentCategory: cat.parentCategory.id,
        });
      }
      if (cat.children.length > 0) {
        renderOption(cat.children, currentCategory, option);
      }
    }
    return option;
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

  const handleDialogOpen = () => {
    setEditName(dataDialog.name);
    setEditParent(dataDialog.parentCategory);
    setDialogEdit(true);
  };

  const handleDialogClose = () => {
    setDialogEdit(false);
    dispatch(ClearError());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(ClearError());
    setOpen(false);
    setDialogEdit(false);
  };

  const handleSave = () => {
    let payload;
    if (dataDialog.name === editName) {
      payload = {
        parentCategory: editParent,
      };
    } else {
      payload = {
        name: editName,
        parentCategory: editParent,
      };
    }
    dispatch(UpdateCategory(dataDialog.id, payload)).then((err) => {
      if (!err) {
        setOpen(false);
        setDialogEdit(false);
      }
    });
    // setOpen(false);
    // setDialogEdit(false);
  };


  const handleSaveCreate = () => {
    let payload;
    payload = {
      name: addName,
      parentCategory: AddParent,
    };
    console.log(payload)
    dispatch(CreateCategory(payload)).then((err) => {
      if (!err) {
        handleCloseCreateDialog(false);
      }
    });
  };

  const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event) => {
      preventSelection(event);
    };

    const handleExpansionClick = (event) => {
      handleExpansion(event);
    };

    const handleSelectionClick = (event) => {
      setDatadialog(props.onClick);
      handleClickOpen();
      handleSelection(event);
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  });

  CustomContent.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * className applied to the root element.
     */
    className: PropTypes.string,
    /**
     * The icon to display next to the tree node's label. Either a parent or end icon.
     */
    displayIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label. Either an expansion or collapse icon.
     */
    expansionIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label.
     */
    icon: PropTypes.node,
    /**
     * The tree node label.
     */
    label: PropTypes.node,
    /**
     * The id of the node.
     */
    nodeId: PropTypes.string.isRequired,
  };

  const handleCloseCreateDialog = () => {
    dispatch(ClearError())
    setAddParent({})
    setAddName("")
    setCreateDialog(false);
  };

  const handleDelete = () => {
    dispatch(DeleteCategory(dataDialog.id)).then((err) => {
      if (!err) {
        setOpen(false);
        setDialogEdit(false);
      }
    })
  }

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={nodes}
      ContentComponent={CustomContent}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Layout sidebarClick={"category"} >
      <Loader />
      {category.errors.code ? (
        <AlertToast
          type="show"
          message={APP_BAD_REQUEST[category.errors.code]}
        />
      ) : null}
      <TreeView
        className={classes.root}
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {category.categories.map((category) => renderTree(category))}
      </TreeView>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        style={{ zIndex: "998" }}
      >
        <DialogTitle id="alert-dialog-title">Category</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ marginTop: "5px" }}>
                {!dialogEdit ? (
                  <>
                    <p>ชื่อประเภท</p>
                    <p>{dataDialog.name}</p>
                  </>
                ) : (
                  <TextField
                    error={category.errors.code === 40101 ? true : false}
                    label="ประเภท"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    helperText={
                      category.errors.code === 40101
                        ? `${APP_BAD_REQUEST[category.errors.code]}`
                        : null
                    }
                  />
                )}
              </Grid>
              <Grid item xs={6} style={{ marginTop: "5px" }}>
                {!dialogEdit ? (
                  <>
                    <p>ชื่อประเภทตัวหลัก</p>
                    <p>
                      {dataDialog.parentCategory?.name
                        ? dataDialog.parentCategory?.name
                        : "ตัวหลัก"}
                    </p>
                  </>
                ) : (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    onChange={handleOnSelectMenu}
                    value={editParent.name || "none"}
                    helperText="Please select your category"
                  >
                    <MenuItem key={null} value={"none"}>
                      ตัวหลัก
                    </MenuItem>
                    {renderOption(category.categories, dataDialog.id).map(
                      (option, index) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          {!dialogEdit ? (
            <Button onClick={handleDialogOpen}>Edit</Button>
          ) : (
            <>
                <Button onClick={handleDialogClose}>cancleEdit</Button>
                <Button onClick={handleDelete}>delete</Button>
              <Button onClick={handleSave} autoFocus>
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        style={FloatButton}
        onClick={() => setCreateDialog(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={creatDialog}
        onClose={handleCloseCreateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        style={{ zIndex: "998" }}
      >
        <DialogTitle id="alert-dialog-title">เพิ่ม ประเภท</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ marginTop: "5px" }}>
                <TextField
                  error={category.errors.code === 40101 ? true : false}
                  label="ประเภท"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  helperText={
                    category.errors.code === 40101
                      ? `${APP_BAD_REQUEST[category.errors.code]}`
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: "5px" }}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  onChange={handleOnSelectMenuCreate}
                  value={AddParent.name || "none"}
                  helperText="Please select your category"
                >
                  <MenuItem key={null} value={"none"}>
                    ตัวหลัก
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
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Disagree</Button>
          <Button onClick={handleSaveCreate} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default Category;
