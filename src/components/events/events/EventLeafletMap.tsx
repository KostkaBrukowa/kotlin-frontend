import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { LatLng, LatLngTuple } from 'leaflet';

import { useOutsideClick } from '../../utils/hooks/useOutsideClick';

export interface EventMapProps {
  x: any;
}

const MapComponent: React.FC<any> = ({ wrapperRef, onClick, onClickOutside, active }) => {
  const position: LatLngTuple = [52.237049, 21.017532];
  const mapReference = useMap();

  useEffect(() => {
    mapReference.panTo(new LatLng(position[0], position[1]));
  }, [active]);

  useOutsideClick({ onClick: onClickOutside, wrapperRef });

  useMapEvents({ click: onClick, dragstart: onClick });

  return null;
};

export const EventMap: React.FC<EventMapProps> = () => {
  const position: LatLngTuple = [52.237049, 21.017532];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    console.log('clicked');
    setActive(true);
  };

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      console.log('You clicked outside of me!');
      setActive(false);
    }
  };

  return (
    <div ref={wrapperRef}>
      <MapContainer
        scrollWheelZoom
        center={position}
        style={{
          width: '100vw',
          height: active ? '40vh' : '20vh',
          transition: 'height 250ms ease-in-out',
        }}
        zoom={10}
      >
        <MapComponent
          active={active}
          wrapperRef={wrapperRef}
          onClick={handleClick}
          onClickOutside={handleClickOutside}
        />
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
    </div>
  );
};
