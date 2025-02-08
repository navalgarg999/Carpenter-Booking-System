import { useState, useEffect, Suspense } from "react";

export default function CarpenterBooking() {
  const [carpenters, setCarpenters] = useState([]);
  const [selectedCarpenter, setSelectedCarpenter] = useState(null);
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/carpenters")
      .then((res) => res.json())
      .then((data) => setCarpenters(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCarpenter) {
        fetch(`http://localhost:3001/slots/${selectedCarpenter}`)
          .then((res) => res.json())
          .then((data) => setSlots(data.filter((slot) => slot.is_available)));
      }
    }, 1);
    return ()=> clearInterval(interval);
  }, [selectedCarpenter]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:3001/bookings")
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bookSlot = (carpenterId, time) => {
    fetch(`http://localhost:3001/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carpenterId, time }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Booking failed");
        }
        return response.json();
      })
      .then(() => setSelectedCarpenter(selectedCarpenter))
      .catch((error) => console.error("Error booking slot:", error));
  };

  const cancelBooking = (carpenterId, time) => {
    fetch(`http://localhost:3001/bookings/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carpenterId, time }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Cancellation failed");
        }
        return response.json();
      })
      .then(() => setSelectedCarpenter(selectedCarpenter))
      .catch((error) => console.error("Error canceling slot:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Carpenter Booking</h1>
      <select onChange={(e) => setSelectedCarpenter(Number(e.target.value))}>
        <option value="">Select Carpenter</option>
        {carpenters.map((carpenter) => (
          <option key={carpenter.id} value={carpenter.id}>
            {carpenter.name}
          </option>
        ))}
      </select>
      <h2 className="text-lg mt-4">Available Slots</h2>
      {slots.map((slot) => (
        <button
          key={slot.slotId}
          className="m-2 p-2 bg-green-500 text-white"
          onClick={() => {
            bookSlot(selectedCarpenter, slot.time);
          }}
        >
          {slot.time}:00 - {slot.time + 1}:00
        </button>
      ))}
      <h2 className="text-lg mt-4">Bookings</h2>
      {bookings.map((booking) => {
        const carpenter = carpenters.find((c) => c.id === booking.carpenterId);
        const slotTime = booking.slotTime;
        return (
          <div
            key={booking.bookingId}
            className="flex justify-between bg-gray-200 p-2 mt-2"
          >
            <span>
              {carpenter ? carpenter.name : "Unknown Carpenter"},
              {slotTime !== undefined
                ? ` Time: ${slotTime}:00 - ${slotTime + 1}:00`
                : " Unknown Slot"}
            </span>
            <button
              className="bg-red-500 text-white p-1"
              onClick={() =>
                cancelBooking(booking.carpenterId, booking.slotTime)
              }
            >
              Cancel
            </button>
          </div>
        );
      })}
    </div>
  );
}
