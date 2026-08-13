"use client";

import CafeMap from "@/src/components/ui/cafemap";
import { useState } from "react";
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
  const tableData: TableData[] = [
    // 8-person tables (top row)
    { table_id: 8001, table_num: 8, x: 355, y: 55, size: 225, reserved: false },
    { table_id: 8002, table_num: 8, x: 585, y: 55, size: 225, reserved: false },
    { table_id: 8003, table_num: 8, x: 820, y: 55, size: 225, reserved: false },

    // 6-person tables (bottom row)
    {
      table_id: 6001,
      table_num: 6,
      x: 405,
      y: 810,
      size: 200,
      reserved: false,
    },
    { table_id: 6002, table_num: 6, x: 605, y: 810, size: 200, reserved: true },
    {
      table_id: 6003,
      table_num: 6,
      x: 805,
      y: 810,
      size: 200,
      reserved: false,
    },

    // 4-person tables (middle-left)
    {
      table_id: 4001,
      table_num: 4,
      x: 500,
      y: 330,
      size: 120,
      reserved: false,
    },
    { table_id: 4002, table_num: 4, x: 700, y: 330, size: 120, reserved: true },
    {
      table_id: 4003,
      table_num: 4,
      x: 500,
      y: 550,
      size: 120,
      reserved: false,
    },
    {
      table_id: 4004,
      table_num: 4,
      x: 700,
      y: 550,
      size: 120,
      reserved: false,
    },

    // 12-person table
    {
      table_id: 1201,
      table_num: 12,
      x: 900,
      y: 350,
      size: 140,
      reserved: false,
    },

    // 2-person tables (right side)
    {
      table_id: 2001,
      table_num: 2,
      x: 1130,
      y: 330,
      size: 120,
      reserved: false,
    },
    {
      table_id: 2002,
      table_num: 2,
      x: 1130,
      y: 430,
      size: 120,
      reserved: true,
    },
    {
      table_id: 2003,
      table_num: 2,
      x: 1130,
      y: 530,
      size: 120,
      reserved: false,
    },
    {
      table_id: 2004,
      table_num: 2,
      x: 1130,
      y: 630,
      size: 120,
      reserved: false,
    },
  ];
  const [selected, setSelected] = useState("");

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
          bg-muted-teal/30 backdrop-blur-md items-center justify-center -translate-y-30 `}>
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
      <CafeMap
        tableData={tableData}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
