import styled from 'styled-components'
// import { createGlobalStyle } from 'styled-components'

// export const GlobalStyle = createGlobalStyle`
//   body {
//     background-color: ${props => (props.color === 1 ? 'rgb(224, 221, 224)' : 'white')};
//   }
// `;

export const BoxContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  @media screen and (max-width: 850px) {
    top:0;
    left:0;
    transform:none;
    height: auto;
    width: auto;
    position:relative;
  }
`;
export const SigninContainer = styled.div`
    display: grid;
    grid-template-columns: 400px minmax(500px, 1fr);
    grid-auto-rows: minmax(700px, auto);

    @media screen and (max-width: 850px) {
        grid-template-columns: 1fr;
        height: 100vh;
    }
    @media screen and (max-height: 850px) {
        grid-auto-rows: minmax(650px, auto);
    }
    @media screen and (max-height: 750px) {
        grid-auto-rows: minmax(520px, auto);
    }
`;

export const SigninContainerLeft = styled.div`
    background-color: black;
    box-shadow: 0px 5px 50px #aaaaaa;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    @media screen and (max-width: 850px) {
        display: none;
    }
`;

export const SigninContainerRight = styled.div`
  box-shadow: 0px 5px 50px #aaaaaa;
  border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: white;
    ul {
        list-style: none;
        padding: 0;
    }
    ul li{
        padding: 10px 10px;
    }
    .input-field input{
        border: 2px solid;
        width: 60%;
        font-size: 20px;
        padding: 15px;
        min-width: 200px;
    }
    .input-field input:focus{
        outline: none;  
    }
    .submit input {
        padding: 30px 10%;
        line-height: 5px;
        border: none;
         height: 15px;
        cursor: pointer;
        background-color: #3f37c9;
        color: white;
        font-size: 150%;
        font-weight: bold;
        min-width: 200px;
        -webkit-appearance: none;
    }

    @media screen and (max-width: 850px) {
        grid-column: 1/3;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`;

// export const VideoBackGroiund = styled.video`
//   position: fixed;
//     width: 100%;
//     left: 50%;
//     top:50%;
//     height: 100%;
//     object-fit: cover;
//     transform: translate(-50%, -50%);
//     z-index: -1;
// `;