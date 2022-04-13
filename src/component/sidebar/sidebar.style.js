import styled from "styled-components";

export const SideBar = styled.div`
  display: grid;
  grid-template-columns: minmax(20vh, auto) minmax(200px, 1fr);
  grid-template-rows: minmax(92vh, auto);
  margin-top: 75px;
`;

export const SideBarCol1 = styled.div`
  position: fixed; // See link
  /* top: 6vh; //to make it stick to the top of the screen */
  /* top: 8vh; */
  height: 100vh; // make the height equal to 100 view height
  width: auto;
  min-width: 20vh;
  background-color: white;
  box-shadow: 0px 2px 10px #aaaaaa;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(auto, 50px);
  gap: 30px;
  a {
    color: black;
    text-decoration: none;
  }
  .menu {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: 30px;
    /* place-items: center; */
    cursor: pointer;
    border-radius: 8px;
  }
  .menu:hover {
    background-color: lightgray;
    height: 80%;
  }
  .active {
    background-color: lightgray;
    height: 80%;
  }
  .menu .col1 {
    /* background-color: red; */

    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
    }
  }
  .menu .col2 {
    text-align: start;
    display: inline-grid;
    align-items: center;
    /* background-color: blue; */
  }

  @media screen and (max-width: 680px) {
    display: none;
  }
  @media screen and (max-height: 410px) {
    overflow-y: scroll;
  }
`;

export const SideBarCol2 = styled.div`
  grid-column-start: 2;

  @media screen and (max-width: 680px) {
    grid-column: 1/3;
  }
`;
