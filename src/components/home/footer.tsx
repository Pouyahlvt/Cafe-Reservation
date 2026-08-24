"use client";

import HoverButton from "../ui/button";
import Info_div from "../ui/infoDiv";
import { MapPin, User2Icon } from "lucide-react";
import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  const routeHandeler = () => {
    window.open(
      "https://www.google.com/maps/place/Starbucks/@40.7676356,-73.981479,21z/data=!4m6!3m5!1s0x89c2596369e0ca79:0x5f19009b180b1f03!8m2!3d40.76763!4d-73.98134!16s%2Fg%2F11rfd0nbwv?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
      "_blank",
    );
  };

  return (
    <div className="w-full h-screen bg-dark-spruce overflow-hidden">
      <h2
        className="w-full font-museo scale-y-150 cursor-default  font-black text-forest-moss  
        text-[10rem] text-nowrap select-none drop-shadow-2xl/30 drop-shadow-forest-moss max-lg:text-[8rem] lg:ml-15 md:ml-10 max-lg:scale-y-200 
        max-md:text-[5rem] max-md:text-center max-md:scale-y-250 max-md:my-10 max-sm:text-[3rem] max-sm:scale-y-350">
        CAFE NAME
      </h2>
      <div
        className="h-full w-full border-0 rounded-t-[100px] bg-muted-teal shadow-muted-teal shadow-2xl flex 
      max-lg:grid max-lg:grid-rows-2 max-sm:rounded-t-4xl max-sm:overflow-hidden">
        <div
          className="w-[35%] h-full overflow-hidden pb-10 pt-20 max-lg:row-start-2  
         max-lg:w-full max-lg:p-5 max-lg:-mt-20 ">
          <div className="max-lg:w-full max-lg:flex max-sm:grid max-lg:items-center max-lg:justify-center ">
            <p className="text-4xl font-extrabold font-museo italic text-forest-moss text-center max-lg:ml-10 max-sm:text-3xl max-sm:ml-0">
              Hit The ROAD
            </p>
            {
              <HoverButton
                onClick={routeHandeler}
                TclassName="text-4xl font-bold font-museo my-4 text-forest-moss max-sm:text-2xl"
                BclassName="mx-auto border border-forest-moss/70 w-[70%] mt-10  rounded-full bg-muted-teal
                max-lg:mt-0 max-lg:w-[40%] max-sm:mt-4 max-sm:w-[85%]"
                bgClass="bg-dark-spruce"
                text="Let's Go"
              />
            }
          </div>
          <p className="ml-8 mt-14 text-xl font-museo text-forest-moss max-lg:mt-20 max-sm:text-lg max-sm:ml-2">
            © POUYA HALAVAT , 2026
          </p>
        </div>
        <div
          className="h-full w-[65%] flex gap-10 max-lg:row-start-1 max-lg:justify-center max-lg:h-[70%] 
        max-lg:w-full max-md:gap-7 max-sm:gap-5 ">
          <Info_div
            icon={FaInstagram}
            text="Instagram"
            link="https://www.instagram.com/starbucks/?hl=en"
          />
          <Info_div icon={FaPhone} text="Phone" link="tel:+989901096177" />
          <Info_div
            icon={FaEnvelope}
            text="Email"
            link="https://mail.google.com/mail/?view=cm&fs=1&to=pouyahalavat@gmail.com"
            className="max-sm:hidden"
          />
          <Info_div
            icon={MapPin}
            text="Location"
            link="https://www.google.com/maps/place/Starbucks/@40.7676356,-73.981479,21z/data=!4m6!3m5!1s0x89c2596369e0ca79:0x5f19009b180b1f03!8m2!3d40.76763!4d-73.98134!16s%2Fg%2F11rfd0nbwv?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
          />
          <Info_div
            icon={User2Icon}
            text="About Me"
            link="https://portfolio-pouyahalavat.vercel.app/"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
