import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { RoomsContext } from "../contexts/RoomsContext";
import Select from "react-select";
import { Table } from "react-bootstrap";

const Dashboard = () => {
  const options = [
    { value: "Waiting", label: "Đang chờ" },
    { value: "Using", label: "Đang sử dụng" },
    { value: "Available", label: "Khả dụng" },
    { value: "NeedClean", label: "Cần dọn" },
  ];

  const {
    roomsState: { rooms },
    getRooms,
  } = useContext(RoomsContext);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    getRooms();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [Filter, setFilter] = useState(rooms);

  const filteredRooms = () => {
    if (selectedOption === null) {
      return [];
    }
    return rooms.filter((room) => {
      const value = selectedOption.map((option) => option.value);
      return value.includes(room.status);
    });
  };

  useEffect(() => {
    setFilter(filteredRooms());
  }, [selectedOption]);

  return (
    <>
      <h1>Dashboard</h1>;
      <div className="mt-5 mx-5 text-center">
        <h3 className="text-center">Trạng thái phòng</h3>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={options}
          placeholder="Select status"
          selectedValue={selectedOption}
          onChange={(selectedOption) => {
            setSelectedOption(selectedOption);
          }}
        />

        {/* create table for room */}
        <Table responsive bordered hover className="mt-3">
          <thead className="text-primary bg-light border border-info">
            <tr>
              <th>#</th>
              <th>Tên phòng</th>
              <th>Loại phòng</th>
              <th>Loại giá</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody className="border border-info">
            {Filter.map((room, index) => (
              <tr key={room._id}>
                <td>{index + 1}</td>
                <td>{room.name}</td>
                <td>{room.roomtype.name}</td>
                <td>{room.charge.name}</td>
                <td>{room.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
