"use client";

import Image from "next/image";
import { Table } from "./cafemapui/tabels";
import { useState } from "react";

interface TableData {
  table_id: number;
  table_num: number;
  x: number;
  y: number;
  size: number;
  reserved: boolean;
}
interface Props {
  tableData: TableData[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const CafeMap = ({ tableData, selected, setSelected }: Props) => {
  const [isDargging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState({ x: 0, y: 0 });

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);

    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDargging) return;

    const mapWidth = 1400;
    const mapHeight = 1050;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const newX = e.clientX - start.x;
    const newY = e.clientY - start.y;

    const minX = Math.min(viewportWidth - mapWidth, 0);
    const minY = Math.min(viewportHeight - mapHeight, 0);

    setPosition({
      x: clamp(newX, minX, 0),
      y: clamp(newY, minY, 0),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);

    e.currentTarget.releasePointerCapture(e.pointerId);
  };
  return (
    <div className="w-full h-screen overflow-hidden">
      <div
        className={`relative w-350 h-262.5 shrink-0 ${
          isDargging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}>
        <Image
          loading="eager"
          width={1400}
          height={1050}
          src="/cafefloor.jpg"
          alt="cafe floor"
          className="absolute top-0 left-0 z-0 max-w-none w-350 h-262.5"
          draggable={false}
        />

        {tableData.map((table) => (
          <Table
            key={table.table_id}
            table_id={table.table_id}
            selected={selected}
            setSelected={setSelected}
            table_num={table.table_num}
            x={table.x}
            y={table.y}
            size={table.size}
            reserved={table.reserved}
          />
        ))}
      </div>
    </div>
  );
};

export default CafeMap;
