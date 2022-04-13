import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import { OrderContent } from "./order.style";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import { OrderPrint } from "../../component/print/orderPrint";
import InputMoneyDialog from "./inputMoneyDialog";
import { useDispatch } from "react-redux";
import { PatchOrderState, PatchCancleOrderAccept } from "../../action/order/orderAction";

function OrderDialog({ orderDetailStatus, setOrderDetailStatus, orderDetail }) {
  const componentRef = useRef();
  const [inputMonneyDialog, setInputMonneyDialog] = useState({ status: false });
  const dispatch = useDispatch();

  const handleCloseOrderDialog = () => {
    setOrderDetailStatus(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    debug: true,
  });

  const handlePatchState = (data) => {
    const payload = {
      id: orderDetail.id,
      receiveMoney: data,
    };

    dispatch(PatchOrderState(payload));
    setOrderDetailStatus(false);
    setInputMonneyDialog({ status: false });
  };

  const handleSetOpenInputMoneyDialog = () => {
    setInputMonneyDialog({
      status: true,
      nextFunction: (data) => handlePatchState(data),
    });
  };

  const handleAcceptCancleOrder = () => { 
    setOrderDetailStatus(false);
    const payload = {
      id: orderDetail.id
    }
    dispatch(PatchCancleOrderAccept(payload))
  }

  return (
    <div>
      <Dialog
        open={orderDetailStatus}
        onClose={handleCloseOrderDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
        style={{ zIndex: "998" }}
      >
        <DialogTitle id="alert-dialog-title">รายละเอียดการสั่งจอง</DialogTitle>
        <DialogContent>
          <OrderContent>
            <div className="code-order">
              <div className="code-order-head">code&ensp;:</div>
              <div className="code-order-content">{orderDetail.code}</div>
            </div>
            <div className="product-order-head">สินค้า</div>

            {orderDetail.orderItems?.map((orderItem, index) => (
              <div className="product-order-detail" key={index}>
                <div className="product-order-code">
                  <div>รหัสสินค้า&ensp;: </div>
                  <div>{orderItem.code}</div>
                </div>
                <div className="product-order-name">
                  <div>ชื่อสินค้า&ensp;:</div>
                  <div>{orderItem.name}</div>
                </div>
                <div className="product-order-type">
                  <div>ชนิดสินค้า&ensp;:</div>
                  {orderItem?.productPickType ? (
                    <div>
                      {orderItem?.productPickType?.mainType}
                      {orderItem?.productPickType?.subType ? (
                        <>,{orderItem?.productPickType?.subType}</>
                      ) : null}
                    </div>
                  ) : (
                    <div>-</div>
                  )}
                </div>
                <div className="product-order-img">
                  <div>
                    <img src={orderItem?.picture?.src} />
                  </div>
                  <div className="product-order-price">
                    <div>ราคา&ensp;:</div> <div>{orderItem.price}</div>
                  </div>
                </div>
                <div className="product-order-booking">
                  <div>วันที่จอง&ensp;:</div>
                  <div>
                    {format(new Date(orderItem.bookingDates[0]), "dd/MM/yyyy")}
                    {orderItem.bookingDates.length > 1 ? (
                      <>
                        -
                        {format(
                          new Date(
                            orderItem.bookingDates[
                              orderItem.bookingDates.length - 1
                            ]
                          ),
                          "dd/MM/yyyy"
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="product-order-qty">
                  <div>จำนวน&ensp;:</div>
                  <div>{orderItem?.quantity}</div>
                </div>
              </div>
            ))}
            <div className="product-order-total-summary">
              <div className="total-qty">
                <div>จำนวนทั้งหมด&ensp;:</div>
                <div>{orderDetail?.totalItem}</div>
              </div>
              <div className="total-price">
                <div>ราคารวม&ensp;:</div>
                <div>{orderDetail?.totalPrice}</div>
              </div>
              <div className="recieve-money">
                <div>รับเงินมา&ensp;: </div>
                <div>{orderDetail?.receiveMoney}</div>
              </div>
              <div className="recieve-money">
                <div>เงินทอน&ensp;:</div>
                <div>{orderDetail?.changeMoney}</div>
              </div>
            </div>
          </OrderContent>
        </DialogContent>
        <DialogActions>
          {orderDetail?.orderStatus === "success" ? (
            <Button onClick={handlePrint}>Print</Button>
          ) : null}
          <Button onClick={handleCloseOrderDialog}>Disagree</Button>
          {orderDetail?.orderStatus === "pending" ? (
            <Button autoFocus onClick={handleSetOpenInputMoneyDialog}>
              Save
            </Button>
          ) : null}
          {orderDetail?.orderStatus === "cancle_pending" ? (
            <Button autoFocus onClick={handleAcceptCancleOrder}>
              Accept
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
      <OrderPrint ref={componentRef} orderDetail={orderDetail} />
      <InputMoneyDialog
        inputMonneyDialog={inputMonneyDialog}
        setInputMonneyDialog={setInputMonneyDialog}
      />
    </div>
  );
}

export default OrderDialog;
