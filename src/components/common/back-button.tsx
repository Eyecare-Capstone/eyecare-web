import Link from "next/link";
import { Children } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export const BackButton = ({ children, hrefLink }: any) => {
  return (
    <Link
      href={hrefLink}
      className="group font-bold text-lg fixed top-0 left-0 mt-10 w-32 hover:text-lpYellow ease-in duration-200 flex flex-row justify-center items-center gap-1 "
    >
      <IoMdArrowRoundBack
        size={30}
        className="text-lpYellow child group-hover:scale-110"
      />
      {children}
    </Link>
  );
};
