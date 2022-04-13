import React from "react";
import { ProductTypeTableStyle } from "./product.style";

function ProductTypeTable(props) {
  const { productType } = props;
  return (
    <>
      {productType?.nameType &&
      productType?.productTypes?.length > 0 &&
      !productType?.productTypes[0]?.subType ? (
        <ProductTypeTableStyle>
          <table>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>{productType?.nameType}</th>
                <th style={{ width: "100px" }}>ราคา</th>
                <th style={{ width: "100px" }}>คลัง</th>
              </tr>
            </thead>
            <tbody>
              {productType.productTypes.map((productType, index) => (
                <tr key={index}>
                  <td>{productType.nameType}</td>
                  <td>{productType.price}</td>
                  <td>{productType.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProductTypeTableStyle>
      ) : productType?.nameType &&
        productType?.productTypes?.length > 0 &&
        productType?.productTypes[0]?.subType ? (
        <ProductTypeTableStyle>
          <table>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>{productType?.nameType}</th>
                <th style={{ width: "80px" }}>
                  {productType?.productTypes[0]?.subType?.nameSubType}
                </th>
                <th style={{ width: "100px" }}>ราคา</th>
                <th style={{ width: "100px" }}>คลัง</th>
              </tr>
            </thead>
            <tbody>
              {productType.productTypes.map((productType, index) => (
                <tr key={index}>
                  <td>{productType.nameType}</td>
                  <td>
                    {productType.subType.productSubTypes.map(
                      (productSubType, index1) => (
                        <div key={index1}>{productSubType.nameType}</div>
                      )
                    )}
                  </td>
                  <td>
                    {productType.subType.productSubTypes.map(
                      (productSubType, index2) => (
                        <div key={index2}>{productSubType.price}</div>
                      )
                    )}
                  </td>
                  <td>
                    {productType.subType.productSubTypes.map(
                      (productSubType, index2) => (
                        <div key={index2}>{productSubType.quantity}</div>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProductTypeTableStyle>
      ) : null}
    </>
  );
}

export default ProductTypeTable;

