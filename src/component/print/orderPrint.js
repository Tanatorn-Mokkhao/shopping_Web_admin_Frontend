import React, { useRef } from "react";
import { OrderPrintStyle } from "./orderPrint.style";
import IconButton from "@mui/material/IconButton";

export const OrderPrint = React.forwardRef((props, ref) => {
  const { orderDetail } = props;
  return (
    <OrderPrintStyle>
      <div ref={ref}>
        <img
          src="https://upload-image-s3-bucket.s3.ap-southeast-1.amazonaws.com/logo/S__7430148-removebg.png"
          style={{ width: "150px", marginLeft: "15px" }}
        />
        <div style={{ marginLeft: "65px" }}> ใบเสร็จ </div>

        <div style={{ marginLeft: "10px", fontSize: "10px" }}>
          ---------------------------
        </div>
        <div style={{ fontSize: "10px", marginLeft: "20px" }}> รายละเอียด </div>

        {orderDetail?.orderItems?.map((orderItem, index) => (
          <div
            key={index}
            style={{
              fontSize: "6px",
              marginLeft: "20px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <div style={{ width: "80px", paddingBottom: "5px" }}>
              {orderItem.quantity} x {orderItem.name}&ensp;
              {orderItem?.productPickType?.mainType}
              {orderItem?.productPickType?.subType ? (
                <>,{orderItem?.productPickType?.subType}</>
              ) : null}
            </div>
            <div style={{ marginRight: "10px",width: "45px",textAlign:"start" }}>&#3647; {orderItem.price }</div>
          </div>
        ))}
      </div>
    </OrderPrintStyle>
  );
});
