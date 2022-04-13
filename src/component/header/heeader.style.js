import styled from "styled-components"

export const NevbarHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 350px;
    grid-auto-rows: 75px;
    z-index: 998;
    /* minmax(6vh, auto); */
    /* background-color: #0652DD; */
    background-image: linear-gradient( 109.6deg,  rgba(11,133,234,1) 11.2%, rgba(34,63,201,1) 91.1% );

    box-shadow: 0px 2px 10px #aaaaaa;
    /* position: sticky; // See link
    top: 0; //to make it stick to the top of the screen */
    position: fixed;
    left:0;
    right:0;
    top:0;
    @media screen and (max-width: 680px) {
        grid-auto-rows: 50px;
        grid-template-columns: 1fr 4fr 1fr;
    }
`;

export const NevbarCol1 = styled.div`
     /* align-items: center;
    justify-content: center; */
    display: inline-grid;
    place-items: center;

`;
export const NevbarCol2 = styled.div`
    /* align-items: center;
    justify-content: center; */
    display: inline-grid;
    place-items: center;

`;
export const NevbarCol3 = styled.div`
    /* align-items: center;
    justify-content: center; */
    display: inline-grid;
    place-items: center;
    .header_username_hidden{
        display: none;
    }
   
    .header_username {
        padding: 2% 5%;
        background-color: #123c8c;
        border-radius: 10px;
        color: rgb(255,255,255);
        cursor: pointer;
        width: minmax(auto,70%);
        display: flex;
        .col1{
        overflow: hidden;
        
        }
        .col2{
            display: inline-grid;
             place-items: center;
             margin-left:5px;
             
        }
    }
    .pop_user_option {
        position: absolute;
        /* position: fixed;
        margin-top: 35px;
        margin-left: -20px;
        width: 300px;
        height: 100px; */
        right: 25px;
        top:70px;
        width: 300px;
        height: 100px;
        background-color: rgb(255,255,255);
        -webkit-box-shadow: 0 0 1px #000;
        box-shadow: 0 0 1px #000;
        color: black;
        /* border: solid #000;
        border-width:1px; */
        display: grid;
        grid-template-columns: 1fr;
        .menu{
            padding: 1px;
        }
        .menu:hover {
            background-color: lightgray;
            
        }
    }
    .pop_user_option::before{
        content:"";
            position: absolute;
            height: 0px;
            left:150px;
            top:-30px;
            border-width: 15px;
            border-color: transparent transparent  white;
            border-style: solid;
        }
    @media screen and (max-width: 680px) {
        .header_username{
            display:none;
        }
        .header_username_hidden{
            display: inline-grid;
            place-items: center;
            color: rgb(255,255,255);
            .hidden_user_option_hide{
                transform: translateX(-100%);
                transition: all 0.2s ease;
                position: fixed;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgb(255,255,255);
                display: grid;
                grid-template-columns: 1fr;
                grid-auto-rows: 50px;
                .header{
                    display: inline-grid;
                    place-items: center end;
                    background-image: linear-gradient( 109.6deg,  rgba(11,133,234,1) 11.2%, rgba(34,63,201,1) 91.1% );
                }
                .content{
                    color: black;
                }
            }
            .hidden_user_option{
                transition: all 0.2s ease;
                position: fixed;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgb(255,255,255);
                display: grid;
                grid-template-columns: 1fr;
                grid-auto-rows: 50px;
                .header{
                    display: inline-grid;
                    place-items: center end;
                    background-image: linear-gradient( 109.6deg,  rgba(11,133,234,1) 11.2%, rgba(34,63,201,1) 91.1% );
                }
                .content{
                    color: black;
                }
            }
        }
    }
`;