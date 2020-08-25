import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

export interface EventMapProps {
  x: any;
}

export const EventMap: React.FC<EventMapProps> = () => {
  const position: LatLngTuple = [52.237049, 21.017532];

  return (
    <MapContainer
      center={position}
      scrollWheelZoom={false}
      style={{ width: '100vw', height: '20vh' }}
      zoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
