"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import { useEffect, useState } from "react";
import HoverButton from "@/src/components/ui/button";
import gsap from "gsap";

type detailType = {
  reservationId: string;
  date: string;
  meal: string;
  tableId: string;
};

const ReserveCheck = () => {
  const [reservationID, setReservationID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<detailType>({
    reservationId: "",
    date: "",
    meal: "",
    tableId: "",
  });
  const [checked, setChecked] = useState(false);

  const check = async () => {
    try {
      setLoading(true);
      if (reservationID.length === 0) return;
      setError("Write Your Reservation ID");

      const res = await fetch(`/api/reserve-details/${reservationID}`);

      if (!res.ok) return;

      const data = await res.json();

      setDetails(data);
      setChecked(true);
    } catch (err) {
      console.error("check function : " + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".input-line", {
      width: "calc(100% - 80px)",
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);
  return (
    <div className="bg-dark-spruce w-full h-screen">
      <Form_template text="reservation check">
        <div className="w-full h-full relative">
          <div
            className={`absolute w-full h-full flex z-20 bg-muted-teal rounded-t-4xl shadow-2xl mt-5 
            ${checked ? "translate-y-0" : "translate-y-[120%]"} transition-all duration-700 ease-in-out`}>
            <div className="w-[calc(100%-100px)] mx-25 pt-10">
              {Object.entries(details).map(([key, value]) => (
                <div
                  key={`details-${key}`}
                  className={`w-full h-20 mt-10 bg-dark-spruce/70 rounded-3xl border-4
            border-dark-spruce shadow-2xl/20 flex justify-center items-center ${key === "reservationId" ? "hidden" : ""}`}>
                  <p className="text-2xl text-muted-teal ">
                    Reservation {key} :{" "}
                    {key === "date" ? value.slice(0, 10) : value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p
            className={`input-mass mt-24 ml-15 text-2xl text-forest-moss font-semibold absolute
            ${reservationID.length > 0 ? "opacity-0 translate-x-15" : "translate-x-0"}
            transition-all duration-300 ease-out `}>
            Enter your Reservation code
          </p>
          <input
            value={reservationID ?? ""}
            onChange={(e) => setReservationID(e.target.value)}
            type="text"
            className="outline-0 mx-10 w-[calc(100%-80px)] h-15 rounded-t-2xl 
            mt-20 text-2xl px-5 text-forest-moss font-semibold font-museo "
          />
          <div className="input-line h-1 mx-auto w-0 bg-forest-moss rounded-full "></div>
          {
            <HoverButton
              onClick={check}
              text={loading ? ". . ." : "CHECK THE CODE"}
              bgClass="bg-sega-green"
              BclassName="w-100 mx-auto border-2 h-20 border-sega-green rounded-full mt-30"
              TclassName={`text-2xl text-forest-moss font-bold ${loading ? "animate-bounce  text-4xl" : ""}`}
            />
          }
        </div>
      </Form_template>
    </div>
  );
};

export default ReserveCheck;
