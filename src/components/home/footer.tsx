"use client";

import HoverButton from "../ui/button";
import Info_div from "../ui/infoDiv";
import { MapPin, User2Icon } from "lucide-react";
import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-screen bg-dark-spruce overflow-hidden">
      <h2
        className=" w-full  font-museo scale-y-150 cursor-default text-center  
      font-black text-forest-moss  text-[13rem] text-nowrap select-none drop-shadow-2xl/30 drop-shadow-forest-moss">
        CAFE NAME
      </h2>
      <div className="h-full w-full border-0 rounded-t-[100px] bg-muted-teal shadow-muted-teal shadow-2xl flex">
        <div className="w-[35%] h-full overflow-hidden pb-10 pt-20">
          <p className="text-4xl font-extrabold font-museo italic text-forest-moss text-center">
            Hit The ROAD
          </p>
          {
            <HoverButton
              TclassName="text-4xl font-bold font-museo my-4 text-forest-moss"
              BclassName="mx-auto border border-forest-moss/70 w-[70%] mt-10  rounded-full bg-muted-teal"
              bgClass="bg-dark-spruce"
              text="Let's Go"
            />
          }
          <p className="ml-8 mt-14 text-xl font-museo text-forest-moss">
            © POUYA HALAVAT , 2026
          </p>
        </div>
        <div className="h-full w-[65%] flex gap-10">
          <Info_div icon={FaInstagram} text="Instagram" />
          <Info_div icon={FaPhone} text="Phone" />
          <Info_div icon={FaEnvelope} text="Email" />
          <Info_div icon={MapPin} text="Location" />
          <Info_div icon={User2Icon} text="About Me" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
