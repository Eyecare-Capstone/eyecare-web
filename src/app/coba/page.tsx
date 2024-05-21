"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "@/components/common/spinner";

export async function dataURLtoBlob(dataURL: string) {
  const base64String = dataURL.split(",")[1]; // Mengabaikan bagian 'data:image/jpeg;base64,'
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/png" }); // Ganti 'image/jpeg' sesuai dengan tipe gambar yang diinginkan
}

export default function FormApplicantData() {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [fotoMata, setFotoMata] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fotoMata) {
      setLoading(false);
    }
    if (data) {
      setLoading(false);
      console.log(data);
    }
  }, [fotoMata, data]);

  const handleSubmit = async () => {
    try {
      if (!fotoMata) {
        console.error("No fotoMata to submit");
        return;
      }
      setLoading(true);

      const dataBlob = await dataURLtoBlob(fotoMata);
      const filePhoto = new File([dataBlob], "picture.png", {
        type: "image/png",
      });

      const applicantData = new FormData();
      applicantData.append("file", filePhoto);

      const response = await fetch(`${BASE_API}/detect/cataract`, {
        method: "POST",
        body: applicantData,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const result = await response.json();
      setMessage(result.message);
      setData(result.data);
    } catch (e) {
      console.error("Error during submission:", e);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      const imageData = reader.result as string;
      setFotoMata(imageData);
    };
  };

  return (
    <div className="w-full h-screen pb-10 flex flex-row justify-center py-10">
      {loading && <Spinner />}
      <div className="flex-1 bg-red-500 flex flex-col gap-10 justify-center items-center">
        {!fotoMata && <input type="file" onChange={handleUpload} />}

        {fotoMata && (
          <Image src={fotoMata} alt="Uploaded image" width={300} height={300} />
        )}

        <Button
          onClick={() => {
            setFotoMata(null);
            setData(null);
            setMessage(null);
          }}
        >
          Ubah Foto
        </Button>
        <Button onClick={handleSubmit}>Upload Foto Katarak</Button>
      </div>
      <div className="flex-1 gap-5 bg-green-500 flex flex-col justify-center items-center">
        {data?.image && (
          <>
            <Image
              src={data.image}
              alt="Detected image"
              width={300}
              height={300}
            />

            <p>{message}</p>
            <h1>List detail:</h1>
            <ol>
              {data?.detail.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
