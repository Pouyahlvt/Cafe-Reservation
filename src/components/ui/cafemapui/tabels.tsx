"use client";

import Image from "next/image";

interface Props {
  x?: number;
  y?: number;
  reserved: boolean;
  table_num?: number;
  size?: number;
  table_id: number;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const Table = ({
  x = 0,
  y = 0,
  reserved,
  table_id,
  table_num = 2,
  size = 200,
  selected,
  setSelected,
}: Props) => {
  const clickHandler = () => {
    if (!reserved) {
      setSelected(`table-${table_id}`);
    }
  };

  return (
    <div
      style={{ top: y, left: x }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={clickHandler}
      className={`absolute flex z-10 cursor-pointer transition-all duration-300 
      ease-in-out ${reserved ? "opacity-60" : "hover:scale-105"} 
      ${selected === `table-${table_id}` ? "animate-pulse" : selected.length > 2 ? "scale-0" : ""}`}>
      <Image
        width={size}
        height={1}
        src={`/cafemapimages/table${table_num}.png`}
        alt={`table-${table_num}`}
      />
    </div>
  );
};
