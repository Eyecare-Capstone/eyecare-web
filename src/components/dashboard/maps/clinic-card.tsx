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
    const url = `https://www.google.com/maps/search/?api=1&query=${currentClinic.lat},${currentClinic.lon}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    setCurrentClinic(clinic);
  }, [clinic]);

  return (
    <Card className="bg-blue-950 w-full h-[420px] flex flex-col">
      {currentClinic ? (
        <>
          <CardHeader className="p-0 h-44 mb-5">
            <Image
              src={currentClinic.picture}
              alt="picture"
              width={200}
              height={200}
              className="w-80 h-full rounded-t-sm  object-cover"
            />
          </CardHeader>
          <CardContent className=" p-0 flex-1">
            <div className="mb-3 py-2 px-4">
              <div className="flex flex-row gap-2  mb-1 justify-between">
                <CardTitle>{currentClinic.name}</CardTitle>
                <p>{currentClinic.star}⭐</p>
              </div>

              <div className="flex flex-row gap-2 mb-3">
                <h3>{currentClinic.province}</h3>
                <span>-</span>
                <h3>{currentClinic.city}</h3>
              </div>

              <div className="flex justify-center items-center">
                <textarea
                  rows={3}
                  cols={30}
                  readOnly
                  value={currentClinic.address}
                  className="bg-blue-950 text-white border border-white"
                />
              </div>
            </div>

            <hr />
            <div className="w-full flex justify-between px-2 py-1  gap-2">
              <ScheduleDropdown schedule={currentClinic.schedule} />
              <Button onClick={getDirection} className="font-bold">
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
