"use client";

import CafeMap from "@/src/components/ui/cafemap";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CopyIcon, CopyCheckIcon } from "lucide-react";

interface TableData {
  table_id: number;
  table_num: number;
  x: number;
  y: number;
  size: number;
  reserved: boolean;
}

export default function ChooseTablePage() {
  const [table_data, setTable_data] = useState<TableData[]>([]);
  const [selected, setSelected] = useState("");
  const [success, setSuccess] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const successDivRef = useRef<HTMLDivElement>(null);
  const [reservationId, setReservationId] = useState("");
  //it's for success massage should move to components ✔️✔️✔️✔️✔️
  const [copie, setCopie] = useState(false);

  //and this is for success massage should move ✔️✔️✔️✔️✔️
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reservationId);
      setCopie(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  useEffect(() => {
    const id = sessionStorage.getItem("reservationId");

    if (id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReservationId(id);
    }
  }, []);

  const reserveTable = async () => {
    try {
      // 1. Get the information saved in sessionStorage
      const date = sessionStorage.getItem("date");
      const meal = sessionStorage.getItem("meal");
      const reservationId = sessionStorage.getItem("reservationId");

      console.log("RESERVATION ID:", reservationId);

      // 2. Make sure we have everything
      if (!date || !meal || !reservationId) {
        console.error("Missing reservation information");
        return;
      }

      // 3. Make sure the user selected a table
      if (!selected) {
        console.error("Please select a table");
        return;
      }

      // 4. Convert "table-5" → 5
      const tableId = Number(selected.replace("table-", ""));

      if (!tableId) {
        console.error("Invalid table");
        return;
      }

      // 5. Send the reservation to our API
      const res = await fetch("/api/tables/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationId,
          tableId,
          date,
          meal,
        }),
      });

      const data = await res.json();

      // 6. API returned an error
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      // 7. Reservation succeeded
      setSuccess(true);
      console.log("TABLE RESERVED:", data);
    } catch (error) {
      console.error("RESERVE TABLE ERROR:", error);
    }
  };

  useEffect(() => {
    const date = sessionStorage.getItem("date");
    const meal = sessionStorage.getItem("meal");

    try {
      async function getTable() {
        const res = await fetch(`/api/tables?date=${date}&meal=${meal}`);

        if (!res.ok) return;

        const data = await res.json();

        setTable_data(data);
      }
      getTable();
    } catch (err) {
      console.error(err);
    }
  }, []);

  useGSAP(() => {
    if (!successDivRef.current) return;

    const successDiv = successDivRef.current;

    const tl = gsap.timeline();

    if (success) {
      tl.to(successDiv, {
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, [success]);

  useGSAP(() => {
    if (!navRef.current) return;

    const nav = navRef.current;

    const tl = gsap.timeline();

    if (selected.length > 2) {
      tl.to(nav, {
        width: 650,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(".button-del", {
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .to(
          ".reserve-button",
          {
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "<=",
        );
    } else {
      tl.to(".button-del", {
        x: -300,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          ".reserve-button",
          {
            x: 300,
            duration: 0.7,
            ease: "power3.out",
          },
          "<=",
        )
        .to(nav, {
          width: 240,
          duration: 0.7,
          ease: "power3.out",
        });
    }
  }, [selected]);

  return (
    <div className="w-full h-screen bg-dark-spruce">
      <div
        ref={successDivRef}
        className="fixed h-screen w-full bg-muted-teal -translate-y-full flex z-50 overflow-hidden text-dark-spruce font-museo ">
        <div className="w-full">
          <p className="success-mass text-center  text-8xl font-extrabold mt-20">
            Success Reservation
          </p>
          <div className="w-full mt-15">
            <p className="text-center text-4xl font-bold tracking-tight">
              Your Reservation Code{" "}
            </p>
            <div className="flex w-full mt-10 justify-center">
              <div className="w-[65%] h-25 bg-dark-spruce rounded-4xl flex items-center">
                <p className="text-dark-spruce bg-muted-teal w-[85%]  flex items-center px-10 h-18 text-xl ml-4 rounded-2xl">
                  {reservationId}
                </p>
                <div
                  className="aspect-square h-18 bg-muted-teal rounded-2xl ml-auto mr-4 flex 
                items-center justify-between">
                  {
                    <CopyIcon
                      onClick={handleCopy}
                      size={40}
                      className={`mx-auto cursor-pointer ${copie ? "hidden" : ""}`}
                    />
                  }
                  {
                    <CopyCheckIcon
                      size={40}
                      className={`mx-auto cursor-pointer ${copie ? "" : "hidden"}`}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={navRef}
        className="fixed flex z-30 bottom-5 left-10  bg-sega-green/50 shadow-2xl/50 backdrop-blur-sm 
        w-60 h-18 overflow-hidden rounded-full items-center shadow-[inset_0_16px_20px_rgba(49,64,43,0.5)]">
        <button
          className={`button-del w-60 h-15 flex z-40 border-muted-teal border-2 rounded-full 
          bg-muted-teal/30 backdrop-blur-md items-center justify-center -translate-x-75 ml-2
          text-2xl text-muted-teal font-museo font-bold tracking-tight cursor-pointer absolute
          hover:bg-muted-teal hover:text-dark-spruce transition-colors duration-300 ease-in-out `}
          onClick={() => setSelected("")}>
          Delete Table
        </button>
        <div className="text-2xl text-muted-teal font-museo font-bold tracking-tight  overflow-hidden mx-auto h-8 w-50 shrink-0">
          <p
            className={`text-center ${selected ? "translate-x-70 " : "translate-x-0 "} 
            duration-500 ease-out transition-transform `}>
            Choose a table .
          </p>
          <p
            className={`text-center -translate-y-8 ${!selected ? "-translate-x-70 " : "translate-x-0 "} 
            duration-500 ease-out transition-transform `}>
            Done it !
          </p>
        </div>
        <button
          onClick={reserveTable}
          className={`reserve-button  w-60 h-15 flex z-40 border-muted-teal border-2 rounded-full 
          bg-muted-teal/30 backdrop-blur-md items-center justify-center translate-x-75 right-2
          text-2xl text-muted-teal font-museo font-bold tracking-tight cursor-pointer absolute
          hover:bg-muted-teal hover:text-dark-spruce transition-colors duration-300 ease-in-out `}>
          Reserve Table
        </button>
      </div>

      <CafeMap
        tableData={table_data}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
