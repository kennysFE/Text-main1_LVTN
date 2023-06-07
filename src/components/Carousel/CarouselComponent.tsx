import React, { useRef } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import {FcNext, FcPrevious} from "react-icons/fc";
type Props = {};

const images = [
  {
    id: 1,
    url: "https://ktmt.vnmediacdn.com/images/2021/08/03/7-1627961881-images10898921-1611196252800651567316.jpg",
  },
  {
    id: 2,
    url: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/02/anh-3.jpg",
  },
  {
    id: 3,
    url: "https://www.quangbinhtravel.vn/wp-content/uploads/2020/09/dong-phong-nha.jpg",
  },
  {
    id: 4,
    url: "https://ktmt.vnmediacdn.com/images/2021/08/03/7-1627963639-5f9bf78b329f7bdf8ceee0fd55fc2176.jpg",
  },
];

export default function CarouselComponent({}: Props) {
  const slider = useRef<CarouselRef>(null);
  return (
    <div className="relative ">
      <button
        className="absolute left-0 font-medium text-3xl"
        style={{ top: "50%", transform: "translateY(-50%)",zIndex:'2' }}
        onClick={() => slider.current?.prev()}
      >
        <FcPrevious/>
      </button>
      <div className="">
        <Carousel ref={slider} autoplay fade>
          {images.map((item, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    backgroundImage: `url('${item.url}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:"center",
                    backgroundSize:'cover',
                    height:'400px'
                  }}
                ></div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <button
        className="absolute right-0 font-medium text-3xl"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        onClick={() => slider.current?.next()}
      >
        <FcNext/>
      </button>
    </div>
  );
}
