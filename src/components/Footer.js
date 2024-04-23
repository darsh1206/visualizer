import { Typography } from "@material-tailwind/react";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  bg-slate-900 text-center  py-10 ">
        <a href="https://www.instagram.com/darsh_12_06/" className="text-white">
          <FaInstagram style={{ fontSize: "2em" }} />
        </a>

        <a href="https://twitter.com/DarshPatel1206" className="text-white">
          <FaTwitter style={{ fontSize: "2em" }} />
        </a>

        <a href="https://github.com/darsh1206" className="text-white">
          <FaGithub style={{ fontSize: "2em" }} />
        </a>

        <a
          href="https://www.linkedin.com/in/darsh-patel-1a0072245/"
          className="text-white"
        >
          <FaLinkedin style={{ fontSize: "2em" }} />
        </a>
      </div>
      <Typography
        color="blue-gray"
        className="text-center font-normal bg-slate-900 text-white pb-5 text-sm sm:text-lg md:text-lg lg:text-lg"
      >
        &copy; 2024 Sorting Visualizer - Developed by Darsh Patel
      </Typography>
    </footer>
  );
}
