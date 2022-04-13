import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const MuiTableCell = makeStyles({
  table: {
    minHeight: 650,
  },
  tableContainer: {
    maxWidth: "100%",
    margin: "8px 8px",
  },
  TableCell: {
    maxHeight: "10px",
  },
  footer: {
    height: "30vh",
    //   backgroundColor: "grey",
  },
});

// export const useStyles = makeStyles((theme) => ({
//   tableRow: {
//       "&:hover": {
//         backgroundColor: "rgb(238,238,238)"
//       }
//     }
//   }));

export const useStyles = makeStyles({
  tableRow: {
    "&:hover": {
      backgroundColor: "rgb(238,238,238) !important",
    },
  },
  headerType: {
    // "&:hover": {
    //   backgroundColor: "rgb(238,238,238) !important",
    // },
    display: "flex",
    justifyContent: "space-between",
  },
  editType: {
    "& span": {
      paddingLeft: "10px",
    },
  },
  ProductPickType: {
    cursor: "pointer",
    fontWeight: "bold",
  },
  addTypeButton: {
    color: "rgb(32,107,167)",
    marginTop: "10px",
    width: "250px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed",
    cursor: "pointer",
    "& p": {
      marginLeft: "2px",
    },
  },
  addPickeType2Button: {
    color: "rgb(32,107,167)",
    marginTop: "15px",
    width: "250px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed",
    cursor: "pointer",
    "& p": {
      marginLeft: "2px",
    },
  },
  TablePickType: {
    "& table, th ,td": {
      border: "1px groove",
      borderCollapse: "collapse",
      padding: "10px 30px",
      fontWeight: "normal",
    },
    "& th": {
      backgroundColor: "rgb(224, 221, 224)",
    },
    "& input": {
      width: "100%",
      border: "0",
      textAlign: "center",
    },
  },
});

export const FloatButton = {
  margin: 0,
  top: "82%",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

export const PreviewImage = styled.div`
  position: relative;

  .deleteIcon {
    position: absolute;
    cursor: pointer;
    /* right: 10px;
    top: 5px; */
    color: red;
  }
`;

export const listTableBody = {
  fontSize: "18px",
};

export const listTableBodyAction = {
  fontSize: "18px",
  color: "rgb(32,107,167)",
  fontWeight: "bold",
  cursor: "pointer",
};

export const ProductTypeTableStyle = styled.div`
  table,
  th,
  td {
    border: 1px groove;
    border-collapse: collapse;
    padding: 10px 30px;
    font-weight: normal;
  }
  th {
    background-color: rgb(224, 221, 224);
  }
`;

export const TableInput = styled.div`
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
