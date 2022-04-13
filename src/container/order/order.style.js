import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  headerBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    marginLeft: "20px",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "rgb(238,238,238) !important",
    },
  },
  headerOrderStatus: {
    fontWeight: "blod",
    fontSize: "20px",
    color: "rgb(0,0,128)",
    opacity: "0.5",
    cursor: "pointer",
    paddingLeft: "12px",
    paddingRight: "12px",
  },
  headerOrderStatusActive: {
    fontWeight: "blod",
    fontSize: "20px",
    color: "rgb(0,0,128)",
    opacity: "1",
    cursor: "pointer",
    paddingLeft: "12px",
    paddingRight: "12px",
  },
});

export const listTableBody = {
  fontSize: "18px",
};

export const listTableBodyAction = {
  fontSize: "18px",
  color: "rgb(32,107,167)",
  fontWeight: "bold",
  cursor: "pointer",
};

export const OrderContent = styled.div`
  .code-order {
    margin-top: 20px;
    display: flex;
  }
  .code-order-head {
    padding: 10px 15px;
  }
  .code-order-content {
    padding: 10px 15px;
  }
  .product-order-head {
    padding: 10px 15px;
  }
  .code-order-head-product {
    padding: 10px 15px;
  }
  .product-order-detail {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px;
    padding: 10px 15px;

    border-bottom: 1px groove;
    gap: 10px;
  }
  .product-order-code {
    display: grid;
    grid-auto-flow: column;
  }
  .product-order-name {
    display: grid;
    /* grid-auto-flow: column; */
    grid-template-columns: 100px 1fr;
  }
  .product-order-type {
    display: grid;
    grid-template-columns: 100px 1fr;
  }
  .product-order-img {
    display: grid;
    /* justify-content: end; */
    grid-template-columns: 1fr 1fr;
    /* margin-left: 150px; */
  }
  .product-order-img img {
    width: 120px;
    height: 150px;
  }
  .product-order-price {
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;
  }
  .product-order-booking {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
  }
  .product-order-qty {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
  }
  .product-order-total-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 50px;
    padding: 10px 15px;
  }
  .total-qty {
    display: grid;
    grid-auto-flow: column;
  }
  .total-price {
    display: grid;
    grid-auto-flow: column;
  }
  .recieve-money {
    margin-top: 40px;
    grid-column: 2/2;
    display: grid;
    grid-auto-flow: column;
  }
`;
