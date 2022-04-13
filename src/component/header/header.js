import React, { useState, useEffect, useRef } from "react";
import {
  NevbarHeader,
  NevbarCol1,
  NevbarCol2,
  NevbarCol3,
} from "./heeader.style";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { signout } from "../../action/auth/authAction";
import { BsPerson } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Hader(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userOption, setUserOption] = useState(false);
  const [userOption2, setUserOption2] = useState(false);
  let menuUser = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      // console.log(menuUser.current,event.target)
      if (menuUser.current && !menuUser.current.contains(event.target)) {
        // console.log(menuUser.current,event.target)
        setUserOption(false);
      }
    });
  }, []);

  const HandleLogOut = () => {
    dispatch(signout());
  };

  const handleOption2Open = () => {
    setUserOption2(true);
    document.body.style.overflow = "hidden";
  };

  const handleOption2Close = () => {
    setUserOption2(false);
    document.body.style.overflow = "unset";
  };

  return (
    <NevbarHeader>
      <NevbarCol1>1</NevbarCol1>
      <NevbarCol2>
        {props.searchBar ? (
          <Paper
            //   component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              // inputProps={{ "aria-label": "search" }}
              value={props.value}
              onChange={props.onChange}
              onKeyPress={props.onKeyPress}
            />
            <IconButton onClick={props.onClick}>
              <SearchIcon />
            </IconButton>
          </Paper>
        ) : null}
      </NevbarCol2>
      <NevbarCol3>
        <div
          className="header_username"
          ref={menuUser}
          onClick={() => setUserOption(!userOption)}
        >
          <div className="col1">{auth.user.username}</div>
          <div className="col2">
            <MdKeyboardArrowDown />
          </div>
          {userOption ? (
            <div className="pop_user_option">
              <div className="menu">1</div>
              <div className="menu">2</div>
              <div className="menu" onClick={HandleLogOut}>
                ออกจากระบบ
              </div>
            </div>
          ) : null}
        </div>
        <div className="header_username_hidden">
          <BsPerson onClick={handleOption2Open} />
          <div
            className={
              userOption2 ? "hidden_user_option" : "hidden_user_option_hide"
            }
          >
            <div className="header">
              <AiOutlineClose
                onClick={handleOption2Close}
                style={{ marginRight: "5px" }}
              />
            </div>
            <div className="content" onClick={HandleLogOut}>
              ออกจากระบบ
            </div>
          </div>
        </div>
      </NevbarCol3>
    </NevbarHeader>
  );
}

export default Hader;
