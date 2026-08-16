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
    gsap.to(".first-mass", {
      y: 0,
      duration: 1.2,
      ease: "elastic.out",
    });
  });

  useGSAP(() => {
    const tl = gsap.timeline();

    if (selected.length > 2) {
      tl.to(".first-mass", {
        y: -120,
        duration: 1.2,
        ease: "elastic.out",
      }).to(
        ".button-del",
        {
          y: 0,
          duration: 1.2,
          ease: "elastic.out",
        },
        "-=1",
      );
    } else {
      tl.to(".button-del", {
        y: -120,
        duration: 1.2,
        ease: "elastic.out",
      }).to(
        ".first-mass",
        {
          y: 0,
          duration: 1.2,
          ease: "elastic.out",
        },
        "-=1",
      );
    }
  }, [selected]);

  return (
    <div className="w-full h-screen bg-dark-spruce">
      <div
        className={`first-mass fixed w-60 h-20 top-5 left-4 flex z-50 border-muted-teal border-2 rounded-full 
          bg-muted-teal/30 backdrop-blur-md items-center justify-center -translate-y-30`}>
        <p className="text-2xl text-muted-teal font-museo font-bold tracking-tighter select-none">
          Choose a Table !
        </p>
      </div>
      <button
        className={`button-del fixed w-60 h-20 top-5 left-4 flex z-50 border-muted-teal border-2 rounded-full 
          bg-muted-teal/30 backdrop-blur-md items-center justify-center -translate-y-30 
          text-2xl text-muted-teal font-museo font-bold tracking-tight cursor-pointer 
          hover:bg-muted-teal hover:text-dark-spruce transition-colors duration-300 ease-in-out `}
        onClick={() => setSelected("")}>
        Delete Table
      </button>
      <div></div>
      <CafeMap
        tableData={table_data}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
