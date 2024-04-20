export const Navbar = () => {
  return (
    <nav className="container h-14 pt-5 px-28 flex flex-row justify-between items-center">
      {/* app name */}
      <div>
        <a href="#" className="text-2xl uppercase font-mono">
          Eye<span className="text-lpYellow">care</span>
        </a>
      </div>

      <div className="">
        <ul className="flex flex-col text-center gap-5 md:flex-row">
          <li>
            <a
              href="#category"
              className=" hover:text-lpYellow ease-in duration-200"
            >
              Background
            </a>
          </li>
          <li>
            <a
              href="#feature"
              className="hover:text-lpYellow ease-in duration-200"
            >
              Feature
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-lpYellow ease-in duration-200"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#review"
              className="hover:text-lpYellow ease-in duration-200"
            >
              Faq
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-lpYellow ease-in duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
