import { useEffect, useState } from "react";
import socket from "../socket";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function StudentLocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    console.log("trying....")
    socket.on("receiveLocation", (data) => {
      const { latitude, longitude } = data;
      console.log("Received location update:", data);
      setLocation({ latitude, longitude });
    });

    return () => {
      socket.off("receiveLocation");
    };
  }, []);

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-semibold">Live Driver Location</h2>
      {location.latitude !== null && location.longitude !== null ? (
        <div style={{ height: '500px', width: '100%' }}>
          <MapContainer
            key={`${location.latitude}-${location.longitude}`}
            center={[location.latitude, location.longitude]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>Driver is here!</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Waiting for location update...</p>
      )}
    </div>
  );
}

export default StudentLocation;
