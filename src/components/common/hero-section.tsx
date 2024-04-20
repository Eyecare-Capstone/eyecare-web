import Image from "next/image";
import heroImage from "../../../public/hero-image.png";
import { Button } from "../ui/button";
import { FaEye } from "react-icons/fa6";

export const HeroSection = () => {
  return (
    <section id="home" className="mt-10 px-28">
      <div className="container flex justify-center items-center gap-10 ">
        {/* Hero Image */}
        <div>
          <Image src={heroImage} alt="hero image" className=" w-96 " />
        </div>

        {/* Hero title & desc */}
        <div className="text-left basis-3/5">
          <h1 className="font-bold text-5xl uppercase ">
            Eye Care:Your Visual Guardian in the Digital Age
          </h1>
          <p className="mt-5 text-xs text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum,libero magni? Fugiat perspiciatis eius, sequi aliquid
            ullam dolorem temporibus voluptate corrupti fugit saepe sunt unde
            culpa? Tenetur quos quod laudantium.
          </p>
          <div className="text-base flex items-center justify-center gap-4 py-10 md:justify-start md:gap-20">
            <div className="text-center">
              <i className="fa-solid fa-eye text-secondaryColor text-4xl"></i>
              <br />
              <FaEye className="text-lpYellow w-44 h-20" />
              Vision
            </div>

            <div className="text-center">
              <i className="fa-solid fa-stethoscope text-secondaryColor text-4xl"></i>
              <br />
              Medical
            </div>

            <div className="text-center">
              <i className="fa-solid fa-search text-secondaryColor text-4xl"></i>
              <br />
              Detect
            </div>
          </div>

          <Button size="lg" className="bg-lpYellow">
            learn more
          </Button>
        </div>
      </div>
    </section>
  );
};
