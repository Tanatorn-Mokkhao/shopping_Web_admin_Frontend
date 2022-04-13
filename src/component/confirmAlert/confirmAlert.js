import React from "react";
import {
  BoxContainer,
  BodyBackGround,
  ComfirmScreen,
} from "./comfirmAlert.styled";
import { IoAlertCircleOutline } from "react-icons/io5";

function ConfirmAlert(props) {
  const { confirmDialog, setConfirmDialog } = props;

  const handleConfirmAccept = () => {
    confirmDialog.onConfirm();

    setConfirmDialog({ isOpen: false, title: "" });
  };
  return (
    <>
      {confirmDialog?.isOpen ? (
        <BodyBackGround>
          <BoxContainer>
            <ComfirmScreen>
              <div className="content">
                <div>
                  <IoAlertCircleOutline size={80} />
                </div>
                <div style={{ fontWeight: "bold", marginTop: "10px" }}>
                  {confirmDialog.title}
                </div>
                <div>
                  <button onClick={handleConfirmAccept}>ตกลง</button>
                  <button
                    onClick={() =>
                      setConfirmDialog({ ...confirmDialog, isOpen: false })
                    }
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </ComfirmScreen>
          </BoxContainer>
        </BodyBackGround>
      ) : null}
    </>
  );
}

export default ConfirmAlert;

// import React from "react";
// import {
//   BoxContainer,
//   BodyBackGround,
//   ComfirmScreen,
// } from "./comfirmAlert.styled";
// import { IoAlertCircleOutline } from "react-icons/io5";

// function ConfirmAlert(props) {
//   const { confirmDialog, setConfirmDialog } = props;
//   return (
//     <>
//       {confirmDialog?.isOpen ? (
//         <BodyBackGround>
//           <BoxContainer>
//             <ComfirmScreen>
//               <div className="content">
//                 <div>
//                   <IoAlertCircleOutline size={80} />
//                 </div>
//                 <div style={{ fontWeight: "bold", marginTop: "10px" }}>
//                   {confirmDialog.title }
//                 </div>
//                 <div>
//                   <button onClick={confirmDialog.onConfirm}>ตกลง</button>
//                   <button
//                     onClick={() =>
//                       setConfirmDialog({ ...confirmDialog, isOpen: false })
//                     }
//                   >
//                     ยกเลิก
//                   </button>
//                 </div>
//               </div>
//             </ComfirmScreen>
//           </BoxContainer>
//         </BodyBackGround>
//       ) : null}
//     </>
//   );
// }

// export default ConfirmAlert;
