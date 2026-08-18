"use client";

import CafeMap from "@/src/components/ui/cafemap";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
    if (selected.length > 2) {
      gsap.to(".button-del", {
        x: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    } else {
      gsap.to(".button-del", {
        x: -300,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, [selected]);

  return (
    <div className="w-full h-screen bg-dark-spruce">
      <div
        className="fixed flex z-50 bottom-5 left-10  bg-sega-green/50 shadow-2xl/50 backdrop-blur-sm
       w-[50%] h-18 overflow-hidden rounded-full items-center shadow-[inset_0_16px_20px_rgba(49,64,43,0.5)]">
        <button
          className={`button-del  w-60 h-15 flex z-50 border-muted-teal border-2 rounded-full 
          bg-muted-teal/30 backdrop-blur-md items-center justify-center -translate-x-75 ml-2
          text-2xl text-muted-teal font-museo font-bold tracking-tight cursor-pointer 
          hover:bg-muted-teal hover:text-dark-spruce transition-colors duration-300 ease-in-out `}
          onClick={() => setSelected("")}>
          Delete Table
        </button>
        <div className="text-2xl text-muted-teal font-museo font-bold tracking-tight bg-black overflow-hidden h-8 w-50">
          <p className={`translate-x-0 text-center `}>Choose a table .</p>
          <p className="-translate-x-100 text-center">Choose a table .</p>
        </div>
        <button
          onClick={reserveTable}
          className={`button-del  w-60 h-15 flex z-50 border-muted-teal border-2 rounded-full 
          bg-muted-teal/30 backdrop-blur-md items-center justify-center translate-x-75 ml-auto mr-2
          text-2xl text-muted-teal font-museo font-bold tracking-tight cursor-pointer 
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
