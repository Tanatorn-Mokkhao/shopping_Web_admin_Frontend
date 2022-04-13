import React from "react";
import { BoxContainer, BodyBackGround, LoaderScreen } from "./loader.style";
import ReactLoading from "react-loading";

function LoaderTempleate() {
  return (
    <BodyBackGround>
      <BoxContainer>
        <LoaderScreen>
          <ReactLoading
            type={"spin"}
            color={"black"}
            height={"20%"}
            width={"20%"}
          />
          <div style={{ fontWeight: "bold" }}>Loading please wait...</div>
        </LoaderScreen>
      </BoxContainer>
    </BodyBackGround>
  );
}

export default LoaderTempleate;
