import React from "react";
// import { IndividualData } from "./IndividualData";

export const ReportData = ({ excelData }) => {
  return (
    <div className="viewer">
      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <tbody>
            {excelData.map((items, index) => (
              <tr key={index}>
                {items.map((subItems, sIndex) => (
                  <>
                    {index == 0 ? (
                      <th scope="col">{subItems}</th>
                    ) : (
                      <td
                        className={
                          typeof subItems == "string" &&
                          subItems.indexOf("->") > -1
                            ? "differ"
                            : ""
                        }
                      >
                        {subItems}
                      </td>
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportData;
