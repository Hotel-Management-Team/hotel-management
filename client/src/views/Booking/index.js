import React from "react";
import IMG_BOOK_DATE from "../../../src/assets/BookByDate.png";
import IMG_BOOK_BLOCK from "../../../src/assets/BookByBlock.png";
import CardFeature from "../../components/common/CardFeature";

const Booking = () => {
  const features = [
    {
      name: "Đặt phòng theo ngày",
      img: IMG_BOOK_DATE,
      href: "/booking/bookbydate",
    },
    {
      name: "Thuê phòng ngay",
      img: IMG_BOOK_BLOCK,
      href: "/system-management/room-types",
    },
  ];

  return (
    <>
      <div className="container my-5">
        <div className="row g-5 d-flex justify-content-center">
          {features.map((feature) => (
            <div className="col-md-3" key={feature.name}>
              <CardFeature feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Booking;
