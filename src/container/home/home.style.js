import styled from "styled-components";


export const BoxContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

`;


export const Formtest = styled.div`

    background-color: blue;
    display: grid;
        grid-template-columns: 1fr 1fr;
    .FromInput{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        grid-row-gap: 20px;
    }
    .FromInput .test{
        grid-column: 1/3;
    }
    .FromInput input{
        border: 2px solid;
        width: 60%;
        font-size: 20px;
        padding: 15px;
        min-width: 200px;
    }
`;