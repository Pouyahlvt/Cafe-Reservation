"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import { useState } from "react";
import HoverButton from "@/src/components/ui/button";
import { Normal_input } from "@/src/components/ui/form/inputs";
import Alert from "@/src/components/ui/alert";

type detailType = {
  reservationId: string;
  date: string;
  meal: string;
  tableId: string;
};

const ReserveCheck = () => {
  const [reservationID, setReservationID] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<detailType>({
    reservationId: "",
    date: "",
    meal: "",
    tableId: "",
  });
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    text: string;
    type?: "success" | "error" | "warning" | "info";
  }>({
    show: false,
    text: "",
    type: "info",
  });

  const check = async () => {
    setLoading(true);

    try {
      if (reservationID.length === 0) {
        setAlert({
          show: true,
          text: "Reservation Code Input is Empty",
          type: "warning",
        });
        setLoading(false);
        return;
      }

      if (reservationID.length < 15) {
        setAlert({
          show: true,
          text: "Reservation Code is too short",
          type: "warning",
        });

        setLoading(false);
        return;
      }

      const res = await fetch(`/api/reserve-details/${reservationID}`);

      if (!res.ok) {
        setAlert({
          show: true,
          text: "Reservation Code is incorect",
          type: "warning",
        });
        setLoading(false);
        return;
      }

      const data = await res.json();

      setDetails(data);
      setChecked(true);
    } catch (err) {
      console.error("check function : " + err);
      setAlert({
        show: true,
        text: "Reservation Code Input is Empty",
        type: "warning",
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-spruce w-full h-screen">
      {alert.show && (
        <Alert
          text={alert.text}
          type={alert.type}
          duration={5000}
          onClose={() => setAlert({ show: false, text: "", type: "info" })}
        />
      )}
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
          <div className="w-[calc(100%-80px)] mx-auto mt-20">
            {
              <Normal_input
                placeHolder="Write your Reservation Code"
                state={reservationID}
                setState={setReservationID}
              />
            }
          </div>
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
