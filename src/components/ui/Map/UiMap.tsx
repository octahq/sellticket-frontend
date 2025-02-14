'use client';

import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import { MAPTILER_API_KEY } from '@/config/privateKeys';

// ---

interface Props {
  height?: string;
  lng: number;
  lat: number;
}

// { lng: 3.42514, lat: 6.43789 }

export default function UiMap({ height, lat, lng }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const location = { lng: lng, lat: lat };
  const zoom = 15

  maptilersdk.config.apiKey = MAPTILER_API_KEY as string;

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,  
      center: [location.lng, location.lat],
      
      zoom: zoom,
    });
     new maptilersdk.Marker({ color: '#FF0000' }) 
       .setLngLat([location.lng, location.lat]) 
       .addTo(map.current); 

     return () => {
       if (map.current) {
         map.current.remove();
         map.current = null;
       }
     };
  }, [location.lng, location.lat, zoom]);

  return (
    <div style={{
      height: height || '147px'
    }} className="map-wrap h-36 w-full">
      <div ref={mapContainer} className="h-full w-full rounded-xl" />
    </div>
  );
}
