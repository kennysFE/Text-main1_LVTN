import React from "react";
import { useAppSelector } from "../../../Hooks/HooksRedux";

import ItemImage from "./ItemImage";

type Props = {};

export default function DetailImage({}: Props) {
  const {roomArray}=useAppSelector((state)=> state.roomReducer)
  return (
    <>
      <div className="mt-6">
        <div className="grid grid-cols-4 gap-2 h-96 overflow-hidden rounded-2xl">
          <div className=" w-full h-full col-span-2 row-span-2">
            <ItemImage arrImage={roomArray} index={1} />
          </div>
          <div className=" w-full h-full col-span-2 row-span-2">
            <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-tr-2xl rounded-br-2xl w-full h-full">
              <ItemImage arrImage={roomArray} index={1} />
              <ItemImage arrImage={roomArray} index={2} />
              <ItemImage arrImage={roomArray} index={3} />
              <ItemImage arrImage={roomArray} index={4} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
