"use client";
import { ClinicCard } from "@/components/dashboard/maps/clinic-card";
import { GoogleMaps } from "@/components/dashboard/maps/google-maps";
import { LocationCard } from "@/components/dashboard/maps/location-card";
import { useState } from "react";

export default function MapsPage() {
  const [user, setUser] = useState<any | null>(null);
  const [clinicData, setClinicData] = useState<string | null>(null);
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-[700px]">
        <GoogleMaps user={user} setClinic={setClinicData} />
      </div>
      <div className="flex-1 h-screen flex flex-col p-3 gap-3">
        <ClinicCard clinic={clinicData} />
        <LocationCard setUser={setUser} />
      </div>
    </div>
  );
}
