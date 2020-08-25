import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { BsChevronCompactDown } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { animated, useSpring } from 'react-spring';
import clsx from 'clsx';
import { LatLng, LatLngTuple, LeafletMouseEvent } from 'leaflet';

import { leafletAttribution, leafletAttributionLink } from '../../utils/constants/attributions';
import { useOutsideClick } from '../../utils/hooks/useOutsideClick';
import { Optional } from '../../utils/types';

import style from './Map.module.less';

const AnimatedMapContainer = animated(MapContainer);

export interface EventMapProps {
  position: LatLngTuple;
  locationName: Optional<string>;
}

interface MapComponentProps {
  wrapperRef: RefObject<unknown>;
  active: boolean;
  position: LatLngTuple;

  onClick(): void;
  onClickOutside(event: MouseEvent): void;
}

const MapComponent: ({
  wrapperRef,
  onClick,
  onClickOutside,
  active,
  position,
}: MapComponentProps) => null = ({ wrapperRef, onClick, onClickOutside, active, position }) => {
  const mapReference = useMap();

  useEffect(() => {
    mapReference.panTo(new LatLng(position[0], position[1]));
  }, [active]);

  useOutsideClick({ onClick: onClickOutside, wrapperRef });

  useMapEvents({
    click: onClick,
    dragstart: onClick,
  });

  return null;
};

export const EventMap: React.FC<EventMapProps> = ({ position, locationName }) => {
  const [active, setActive] = useState(false);
  const heightStyle = useSpring({ height: active ? '40vh' : '20vh' });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chevronClassName = clsx(style.chevron, {
    [style.chevronActive]: active,
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setActive(false);
    }
  };

  const handleClick = () => setActive(true);

  return (
    <div ref={wrapperRef}>
      <AnimatedMapContainer
        scrollWheelZoom
        center={position}
        style={{
          width: '100vw',
          ...heightStyle,
        }}
        zoom={15}
      >
        <MapComponent
          active={active}
          position={position}
          wrapperRef={wrapperRef}
          onClick={handleClick}
          onClickOutside={handleClickOutside}
        />
        <TileLayer attribution={leafletAttribution} url={leafletAttributionLink} />
        <Marker position={position}>
          <Popup>{locationName ?? 'Nieznane miejsce'}</Popup>
        </Marker>
      </AnimatedMapContainer>
      <div className={chevronClassName} onClick={() => setActive(!active)}>
        <FaChevronDown size="1.5rem" />
      </div>
    </div>
  );
};
