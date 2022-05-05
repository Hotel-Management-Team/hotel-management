import React from "react";
import BackStackButton from "../../../components/common/BackStackButton";
import Table from "react-bootstrap/Table";
import { useContext, useState, useEffect } from "react";
import { InvoiceContext } from "../../../contexts/InvoiceContext";
import { RoomTypeContext } from "../../../contexts/RoomTypeContext";

const Profit = () => {
  const {
    invoiceState: { invoices },
    getInvoicesPaid,
  } = useContext(InvoiceContext);

  const {
    roomTypeState: { roomTypes },
    getRoomTypes,
  } = useContext(RoomTypeContext);

  useEffect(() => {
    getInvoicesPaid();
    getRoomTypes();
  }, []);

  const [profit, setProfit] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState({});

  //   console.log(profit);

  return (
    <>
      <BackStackButton />
      <div className="mt-3 mx-5 text-center">
        <h2>
          <strong>BÁO CÁO DANH THU THEO LOẠI PHÒNG</strong>
        </h2>
        <div className="mt-3 d-flex justify-content-between ">
          <input
            type="month"
            style={{ width: "300px" }}
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              const invoiceChange = invoices.filter((invoice) => {
                return (
                  new Date(invoice.ticket.arrivalDate).getMonth() ===
                    new Date(e.target.value).getMonth() &&
                  new Date(invoice.ticket.arrivalDate).getFullYear() ===
                    new Date(e.target.value).getFullYear()
                );
              });
              setProfit(
                roomTypes.map((roomType) => {
                  let profit = 0;
                  let count = 0;
                  invoiceChange.map((invoice) => {
                    if (invoice.room.roomtype === roomType._id) {
                      profit += invoice.total;
                    }
                  });
                  return {
                    roomType: roomType.name,
                    profit: profit,
                  };
                })
              );
            }}
          />
          <h4>
            {selectedMonth !== "" ? (
              <strong>
                Tháng: {new Date(selectedMonth).getMonth() + 1} ,Năm:{" "}
                {new Date(selectedMonth).getFullYear()}
              </strong>
            ) : (
              <strong>Tháng:_______, Năm:_______</strong>
            )}
          </h4>
        </div>
        <Table responsive bordered hover className="mt-3">
          <thead className="text-primary bg-light border border-info">
            <tr>
              <th>STT</th>
              <th>Loại phòng</th>
              <th>Doanh thu</th>
              <th>Tỷ lệ</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {profit.map((_profit, index) => (
              <tr key={_profit.roomType}>
                <td>{index + 1}</td>
                <td>{_profit.roomType}</td>
                <td>{_profit.profit}</td>
                <td>
                  {(
                    _profit.profit /
                    profit.reduce((total, profit) => total + profit.profit, 0)
                  ).toFixed(2) * 100}{" "}
                  %
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="2">Tổng </th>
              <th>
                {profit.reduce((total, profit) => total + profit.profit, 0)}
              </th>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
};

export default Profit;
