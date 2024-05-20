"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ScheduleDropdown } from "./shedule-dropdown";
import { Input } from "@/components/ui/input";

export const ClinicCard = ({ clinic }: any) => {
  const [currentClinic, setCurrentClinic] = useState(clinic);

  const getDirection = () => {
    if (currentClinic && currentClinic.lat && currentClinic.lon) {
      const lat = encodeURIComponent(currentClinic.lat);
      const lon = encodeURIComponent(currentClinic.lon);
      const url = `https://www.google.pl/maps/place/${lat},${lon}/@${lat},${lon},15z`;
      // console.log("lat:", lat, "lon:", lon);
      // console.log(url);
      window.open(url, "_blank");
    } else {
      console.error("Invalid coordinates: ", currentClinic);
    }
  };

  useEffect(() => {
    setCurrentClinic(clinic);
  }, [clinic]);

  return (
    <Card className="bg-secondary w-full h-[420px] flex flex-col ">
      {currentClinic ? (
        <>
          <CardHeader className="p-0 h-44 mb-5 bg-card m-0">
            <Image
              src={currentClinic.picture}
              alt="picture"
              width={200}
              height={200}
              className="w-80 h-full rounded-t-sm  object-cover"
            />
          </CardHeader>
          <CardContent className=" p-0 flex-1 bg-card flex flex-col ">
            <div className="mb-3 py-2 px-4 flex-1 ">
              <div className="flex flex-row gap-2 mt-3  mb-1 justify-between">
                <CardTitle>{currentClinic.name}</CardTitle>
                <p>{currentClinic.star}⭐</p>
              </div>

              <div className="flex flex-row gap-2 mb-3">
                <h3>{currentClinic.province}</h3>
                <span>-</span>
                <h3>{currentClinic.city}</h3>
              </div>

              <div className="flex justify-center items-center">
                <p className="bg-card text-white/50 text-sm">
                  {currentClinic.address}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-between px-2 py-2  gap-2">
              <ScheduleDropdown schedule={currentClinic.schedule} />
              <Button
                onClick={getDirection}
                className="font-bold"
                variant="secondary"
              >
                Get Direction 📌
              </Button>
            </div>
          </CardContent>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center font-bold text-lg">
          <h1>Please select the clinic</h1>
        </div>
      )}
    </Card>
  );
};
