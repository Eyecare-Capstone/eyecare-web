"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";

export const GoogleMaps = ({ user, setClinic }: any) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "quartely",
      });

      const { Map } = await loader.importLibrary("maps");

      const placeholderUser = {
        lat: -6.277700492,
        lng: 107.1575541,
      };

      const options: google.maps.MapOptions = {
        center: user ? user : placeholderUser,
        zoom: 15,
        mapId: "Eyecare Maps",
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);

      if (user) {
        const { AdvancedMarkerElement, Marker } = (await loader.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

        // Buat marker untuk current location
        const userMarker = new Marker({
          position: user,
          map: map,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5,
            fillColor: "yellow",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "black",
          },
        });

        const postUser = {
          lat: user.lat,
          lon: user.lng,
        };

        const res = await axios
          .post(`${baseApi}/clinics`, postUser, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          })
          .then((res) => res.data);

        const clinics = res.data as [{}];

        // marker for clinics
        clinics.forEach((clinic: any) => {
          const location = {
            lat: clinic.lat,
            lng: clinic.lon,
          };

          const marker = new AdvancedMarkerElement({
            position: location, // Atur posisi marker sesuai data dari database
            map: map, // Tambahkan marker ke peta
          });

          marker.addListener("click", () => {
            setClinic(clinic);
          });
        });
      }
    };

    initMap();
  }, [user]);

  return (
    <div
      ref={mapRef}
      className="w-full h-screen flex justify-center items-center"
    >
      loading...
    </div>
  );
};
