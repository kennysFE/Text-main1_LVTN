import React, { useRef, useState, useEffect } from "react";
import { Button, Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { FcNext, FcPrevious } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { TbGitBranch } from "react-icons/tb";

type Props = {};
const image1 = [
  {
    url: "./images/Bắc cực.jpg",
    name: "Bắc cực",
  },
  {
    url: "./images/bãi biển.jpg",
    name: "Bãi biển",
  },
  {
    url: "./images/cabin.jpg",
    name: "Cabin",
  },
  {
    url: "./images/Chơi golf.jpg",
    name: "Chơi golf",
  },
  {
    url: "./images/công viên quốc gia.jpg",
    name: "Công viên quốc gia",
  },
  {
    url: "./images/Đảo.jpg",
    name: "Đảo",
  },
  {
    url: "./images/hang động.jpg",
    name: "Hang động",
  },
  {
    url: "./images/hồ bơi tuyệt vời.jpg",
    name: "Hồ bơi tuyệt vời",
  },
  {
    url: "./images/khung cảnh tuyệt vời.jpg",
    name: "Khung cảnh tuyệt vời",
  },
  {
    url: "./images/lướt sóng.jpg",
    name: "Lướt sóng",
  },
  {
    url: "./images/nhà chung.jpg",
    name: "Nhà chung",
  },
  {
    url: "./images/nhà dưới lòng đất.jpg",
    name: "Nhà dưới lòng đất",
  },
  {
    url: "./images/nhà nhỏ.jpg",
    name: "Nhà nhỏ",
  },
  {
    url: "./images/nhiệt đới.jpg",
    name: "Nhiệt đới",
  },
  {
    url: "./images/Bắc cực.jpg",
    name: "Bắc cực",
  },
  {
    url: "./images/Phục vụ bữa sáng.jpg",
    name: "Phục vụ bữa sáng",
  },
  {
    url: "./images/thật ấn tượng.jpg",
    name: "Thật ấn tượng",
  },
  {
    url: "./images/thiết kế.jpg",
    name: "Thiết kế",
  },
  {
    url: "./images/ven hồ.jpg",
    name: "Ven hồ",
  },
  {
    url: "./images/thiết kế.jpg",
    name: "Thiết kế",
  },
  {
    url: "./images/bietthu.jpg",
    name: "Biệt thự",
  },
  {
    url: "./images/khucamtrai.jpg",
    name: "Khu cắm trại",
  },
  {
    url: "./images/nhakhungchua.jpg",
    name: "Nhà khung chữ A",
  },
  {
    url: "./images/laudai.jpg",
    name: "Lâu đài",
  },
];

export default function CarouselSearchByType({}: Props) {
  const slider = useRef<CarouselRef>(null);
  const [width, setWidth] = useState<number>(0);

  const numberItem=()=>{
    if(width>900){
      return 10;
    }else if(width>768){
      return 7;
    }else{
      return 5;
    }
  }

  const settings = {
    dots: false,
    slidesToShow: numberItem(),
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    const handleSize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleSize);
    handleSize();
    return () => window.removeEventListener('resize', handleSize);
  }, [window.innerWidth]);

  return (
    <div className=" mt-24 ">
      <div className="container md:w-full  sm:flex hidden">
        <div className="relative lg:w-11/12 md:w-5/6 sm:w-2/3 inline-block  mr-7">
          <button
            className="absolute left-0 font-medium text-sm"
            style={{ top: "50%", transform: "translateY(-50%)", zIndex: "2" }}
            onClick={() => slider.current?.prev()}
          >
            <FcPrevious />
          </button>
          <div className="">
            <Carousel ref={slider} {...settings}>
              {image1.map((item, index) => {
                return (
                  <NavLink to={"/"} key={index} className="font-bold">
                    <div className="flex flex-col items-center py-2">
                      <img src={item.url} alt="..." className="w-6 " />
                      <p className="text-xs hover:text-black">{item.name}</p>
                    </div>
                  </NavLink>
                );
              })}
            </Carousel>
          </div>
          <button
            className="absolute right-0 font-medium text-sm"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            onClick={() => slider.current?.next()}
          >
            <FcNext />
          </button>
        </div>
        <div className=" flex items-center ">
          <Button className="flex items-center border rounded-md text-base ">
            <TbGitBranch className="mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>
    </div>
  );
}
