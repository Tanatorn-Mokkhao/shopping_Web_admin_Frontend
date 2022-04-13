import styled from "styled-components";


export const BodyBackGround = styled.div`
  display: block;
  position: fixed;
  background-color: rgb(255,255,255);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(0, 0, 0,.5), rgba(0, 0, 0, .5));
  background: -webkit-radial-gradient(rgba(0, 0, 0,.5), rgba(0, 0, 0, .5));
  z-index: 999;

`;


export const BoxContainer = styled.div`
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 999;
`;


export const LoaderScreen = styled.div`
    width: 500px;
    height: 300px;
    background-color: rgb(255,255,255);
    -webkit-box-shadow: 0 0 1px #000;
    box-shadow: 0 0 1px #000;
    display: inline-grid;
    place-items: center;
    z-index: 999;
    
`;