import React from "react";
import CarouselComponent from "../../components/Carousel/CarouselComponent";
import CarouselSearchByType from "../../components/Carousel/CarouselSearchByType";
import HeaderLocation from "./HeaderLocation/HeaderLocation";
 


type Props = {};

export default function Home({}: Props) {
  return (
    <>
      <CarouselSearchByType />
      <CarouselComponent />
      <HeaderLocation />
    </>
  );
}
