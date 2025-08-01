import React, { useState } from 'react';
import { MdOutlineChairAlt } from "react-icons/md";

// Seat Component
const Seat = ({ seatNumber, isSelected, isOccupied, onClick }) => {
  const baseStyle = `w-12 h-12 flex items-center justify-center rounded cursor-pointer 
                     border text-white text-lg m-1 transition-all`;

  let seatStyle = 'bg-green-500 hover:bg-green-600'; // available
  if (isSelected) seatStyle = 'bg-blue-600'; // selected
  if (isOccupied) seatStyle = 'bg-gray-500 cursor-not-allowed'; // occupied

  return (
    <div
      onClick={!isOccupied ? onClick : null}
      className={`${baseStyle} ${seatStyle}`}
      title={`Seat ${seatNumber}`}
    >
      <MdOutlineChairAlt />
    </div>
  );
};

const BusBooking = () => {
  const totalSeats = 40;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const occupiedSeats = [3, 7, 12, 22, 28]; // hardcoded for demo

  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return;

    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatNumber)
        ? prevSelected.filter((num) => num !== seatNumber)
        : [...prevSelected, seatNumber]
    );
  };

  const renderRows = () => {
    const rows = [];
    const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

    for (let i = 0; i < seats.length; i += 10) {
      const rowSeats = seats.slice(i, i + 10);

      rows.push(
        <div
          key={i}
          className={`flex justify-center mb-2 ${i === 20 ? 'mt-6' : ''}`}
        >
          {rowSeats.map((seatNum) => (
            <Seat
              key={seatNum}
              seatNumber={seatNum}
              isSelected={selectedSeats.includes(seatNum)}
              isOccupied={occupiedSeats.includes(seatNum)}
              onClick={() => handleSeatClick(seatNum)}
            />
          ))}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🚌 Bus Seat Booking</h2>

      {renderRows()}

      <div className="mt-6">
        <h3 className="text-lg font-medium">Selected Seats:</h3>
        <p>{selectedSeats.join(', ') || "None"}</p>
      </div>

      <div className="mt-6 flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-green-500 rounded-sm border"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-600 rounded-sm border"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-500 rounded-sm border"></div>
          <span className="text-sm">Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;
