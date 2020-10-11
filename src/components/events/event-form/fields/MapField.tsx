import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { Form, Input } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { LatLngTuple, LeafletMouseEvent } from 'leaflet';

import { PartyKind } from '../../../../generated/graphql';
import { TransitionElement } from '../../../utils/animations/TransitionElement';
import { opacityOnlyOptions } from '../../../utils/animations/TransitionElementCommonOptions';
import { leafletAttribution, leafletAttributionLink } from '../../../utils/constants/attributions';
import { useRerender } from '../../../utils/hooks/useRerender';
import { FormFields, FormValues } from '../useEventForm';

import style from './Fields.module.less';

const mapFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Miejsce wydarzenia:',
  name: FormFields.location,
  rules: [{ required: true, message: ' ' }],
};

const locationNameFormItemProps: Omit<FormItemProps, 'children'> = {
  label: 'Nazwa miejsca wydarzenia:',
  name: FormFields.locationName,
  rules: [{ required: true }, { min: 3 }, { max: 50 }],
};

const DEFAULT_POSITION: LatLngTuple = [52.13, 21];

export interface EventMapProps {
  position?: LatLngTuple;

  form: FormInstance<FormValues>;
  initialValues: FormValues | undefined;
}

interface LocationMarkerProps {
  form: FormInstance<FormValues>;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ form }) => {
  const { locationName, location } = form.getFieldsValue() as FormValues;
  const rerender = useRerender();

  const onClick = ({ latlng }: LeafletMouseEvent): void => {
    form.setFieldsValue({ [FormFields.location]: [latlng.lat, latlng.lng] });
    rerender();
  };

  useMapEvents({ click: onClick });

  return !location ? null : (
    <Marker position={location}>{locationName && <Popup>{locationName}</Popup>}</Marker>
  );
};

export const MapField: React.FC<EventMapProps> = ({ form, initialValues }) => {
  const { eventType } = form.getFieldsValue() as FormValues;
  const position: LatLngTuple = initialValues?.[FormFields.location] ?? DEFAULT_POSITION;
  const disabled = initialValues
    ? initialValues[FormFields.eventType] !== PartyKind.Event
    : eventType !== PartyKind.Event;
  const initialHeight = '40vh';

  return (
    <>
      <TransitionElement options={opacityOnlyOptions} visible={!disabled}>
        <Form.Item {...locationNameFormItemProps}>
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item {...mapFormItemProps}>
          <MapContainer
            scrollWheelZoom
            center={position}
            className={style.map}
            style={{
              width: '100%',
              height: initialHeight,
            }}
            zoom={15}
          >
            <LocationMarker form={form} />
            <TileLayer attribution={leafletAttribution} url={leafletAttributionLink} />
          </MapContainer>
        </Form.Item>
      </TransitionElement>
    </>
  );
};
