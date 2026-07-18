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
        <h2 className="ml-15 mt-15 text-7xl font-black font-museo ">
          {event_name}
        </h2>
        <p className="ml-15 mt-10  text-3xl font-black font-museo">
          {event_text}
        </p>
        {
          <HoverButton
            text="reservation events"
            BclassName="border border-dark-spruce/50 rounded-full w-65 py-5 text-dark-spruce backdrop-blur-xs 
            text-2xl font-museo font-bold w-80 py-5 mt-60  ml-15"
            TclassName=""
          />
        }
      </div>
      <div className="w-[60%] h-full">
        <p className="absolute top-10 right-20 text-6xl font-museo font-bold">
          {date}
        </p>
        <div className="absolute bottom-5 right-30">
          <p className="text-3xl font-museo font-bold">
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
