import { FC } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import markerIconPng from 'leaflet/dist/images/marker-icon.png'; // Ensure this path is correct

type MapProps = {
  coordinate: number;
  isError: boolean;
  isLoading: boolean;
};

const Map: FC<MapProps> = ({ coordinate, isError, isLoading }) => {
  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return (
      <div className="flex text-center justify-center error-msg items-center uppercase">
        <h6>Input correct IPv4 or IPv6 address.</h6>
      </div>
    );
  }

  return (
    <MapContainer
      // center={[coordinate]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <Marker
        position={[1, 1]}
        icon={
          new Icon({
            // iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      />
    </MapContainer>
  );
};

export default Map;
