import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../contexts/RoomsContext";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import DateTimePicker from "../components/common/DateTimePicker";

const Dashboard = () => {
  const options = [
    { value: "Waiting", label: "Waiting" },
    { value: "Booked", label: "Booked" },
    { value: "NeedClean", label: "Need Clean" },
  ];

  const {
    roomsState: { rooms, roomLoading },
    getRooms,
  } = useContext(RoomsContext);

  useEffect(() => {
    getRooms();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  if (roomLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      <DateTimePicker />
      <h1>Dashboard</h1>
      <div className="container">
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={options}
          placeholder="Select status"
          // get option selected
          onChange={(selected) => setSelectedOption(selected)}
        />
      </div>
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => {
              //filter by status
              if (
                selectedOption === null ||
                selectedOption.length === 0 ||
                selectedOption.find((option) => option.value === room.status)
              ) {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{room.name}</td>
                    <td>{room.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => console.log("Clicked")}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
