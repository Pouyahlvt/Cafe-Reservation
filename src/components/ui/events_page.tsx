"use client";

import Image from "next/image";
import HoverButton from "./button";

interface Props {
  url?: string;
  event_name?: string;
  event_text?: string;
  date?: string;
  full?: boolean;
}

const Event_page = ({
  url = "",
  event_name = "Events-name",
  event_text = "Event-text should be here",
  date = "9/11/2001",
  full = false,
}: Props) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex">
      {url?.length > 4 && (
        <div className="absolute z-10  w-full h-screen overflow-hidden">
          <Image
            src={`${url}`}
            alt={"background"}
            fill
            style={{ objectFit: "cover" }}
            className="select-none"
            draggable={false}
          />
        </div>
      )}
      <div className="w-[40%] h-full">
        <h2 className="ml-15 mt-15 text-7xl font-black font-museo text-dark-spruce">
          {event_name}
        </h2>
        <p className="ml-15 mt-10  text-3xl font-black font-museo text-dark-spruce ">
          {event_text}
        </p>
        <div className="absolute bottom-35 ml-15">
          {
            <HoverButton
              text="Events Reservation"
              bgClass="bg-dark-spruce"
              TclassName=" text-2xl font-black font-museo"
              BclassName="border border-forest-moss/50 rounded-full w-90 py-6 text-forest-moss
               backdrop-blur-xs bg-dark-spruce/50 shadow-2xl/50 flex mt-auto"
            />
          }
        </div>
      </div>
      <div className="w-[60%] h-full">
        <p className="absolute top-10 right-20 text-6xl font-museo font-bold text-dark-spruce ">
          {date}
        </p>
        <div className="absolute bottom-5 right-30">
          <p className="text-3xl font-museo font-bold text-dark-spruce">
            {full
              ? "sorry we dont have space for you :("
              : "we have space for you :)"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Event_page;
