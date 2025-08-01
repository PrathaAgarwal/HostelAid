// src/components/DriverDashboard.jsx
import React, { useEffect } from "react";
import socket from "../socket"; // Make sure this connects to http://localhost:5000

const DriverDashboard = () => {
  useEffect(() => {
    // Confirm driver is connected to the socket server
    socket.on("connect", () => {
      console.log("✅ Driver connected to socket:", socket.id);
    });

    // Start sharing location
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("📍 Driver location:", latitude, longitude);

          // Send location to server
          socket.emit("locationUpdate", { latitude, longitude });
          console.log("📤 Sent locationUpdate to server");
        },
        (error) => {
          console.error("❌ Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup
      return () => {
        navigator.geolocation.clearWatch(watchId);
        socket.off("connect");
      };
    } else {
      console.error("Geolocation not supported.");
    }
  }, []);

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-semibold">Driver Dashboard</h2>
      <p className="mt-2">Live location is being shared...</p>
    </div>
  );
};

export default DriverDashboard;
