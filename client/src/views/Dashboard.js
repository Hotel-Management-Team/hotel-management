import React from "react";
import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../contexts/RoomsContext";
import { Spinner, Form } from "react-bootstrap";
import Select from "react-select";

const Dashboard = () => {
  const options = [
    { value: "Waiting", label: "Waiting" },
    { value: "Booked", label: "Booked" },
    { value: "NeedClean", label: "Need Clean" },
  ];

  const {
    roomsState: { rooms, roomLoading },
    getRoomsTickets,
  } = useContext(RoomsContext);

  // const [selectedOption, setSelectedOption] = useState("Waiting");
  const [dateArrival, setDateArrival] = useState("");
  const [dateDeparture, setDateDeparture] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  useEffect(() => {
    getRoomsTickets();
  }, []);


  const filterByDate = (date) => {
    const dateArrival_ = new Date(date.arrival);
    const dateDeparture_ = new Date(date.departure);

    if (!date.arrival || !date.departure || dateArrival_.getTime() > dateDeparture_.getTime()) {
      setFilteredRooms([]);
    } else {
      const result = rooms.filter((room) => {
        for (const ticket of room.tickets) {
          let ticketArrival = new Date(ticket.arrivalDate);
          let ticketDeparture = new Date(ticket.departureDate);
          if ((dateArrival_.getTime() >= ticketDeparture.getTime()) ||
            (dateDeparture_.getTime() <= ticketArrival.getTime())) {
            continue;
          }
          return false;
        }
        return true;
      });

      setFilteredRooms(result);
    };
  };

  if (roomLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <>
      <h1>Dashboard</h1>
      {/* <div className="container"> */}
      {/* <Select options={options} /> */}
      {/* <Select
          closeMenuOnSelect={false}
          isMulti
          options={options}
          placeholder="Select status"
          selectedValue={selectedOption}
          // get option selected
          onChange={(selectedOption) => {
            setSelectedOption(selectedOption);
          }}
        /> */}
      {/* </div> */}
      <Form>
        <Form.Group controlId="arrival">
          <Form.Label>Chọn ngày giờ đến</Form.Label>
          <Form.Control
            type="datetime-local"
            name="arrival"
            value={dateArrival}
            format="yyyy-MM-dd HH:mm"
            onChange={(date) => {
              setDateArrival(date.target.value);
              filterByDate({ arrival: date.target.value, departure: dateDeparture });
            }}
          />
        </Form.Group>
        <Form.Group controlId="departure">
          <Form.Label>Chọn ngày giờ rời</Form.Label>
          <Form.Control
            type="datetime-local"
            name="departure"
            value={dateDeparture}
            format="yyyy-MM-dd HH:mm"
            onChange={(date) => {
              setDateDeparture(date.target.value);
              filterByDate({ arrival: dateArrival, departure: date.target.value });
            }}
          />
        </Form.Group>
      </Form>

      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              <th scope="col">Arrival</th>
              <th scope="col">Departure</th>
            </tr>
          </thead>
          <tbody>
            {/* {rooms.map((room, index) => {
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
            })} */}
            {filteredRooms.map((room, index) => {
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
                  <td>{room.arrivalDate}</td>
                  <td>{room.departureDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
