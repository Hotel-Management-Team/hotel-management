import React from "react";
import IMG_ROOM from "../assets/img-room.png";
import IMG_ROOM_TYPE from "../assets/img-room-type.png";
import IMG_PRICE_TYPE from "../assets/img-price-type.png";
import IMG_SUB_ACCOUNT from "../assets/img-sub-account.png";
import CardFeature from "../components/common/CardFeature";

function System() {
  const features = [
    {
      name: "PHÒNG",
      img: IMG_ROOM,
      href: "/rooms",
    },
    {
      name: "LOẠI PHÒNG",
      img: IMG_ROOM_TYPE,
      href: "/room-types",
    },
    {
      name: "CÁCH TÍNH TIỀN",
      img: IMG_PRICE_TYPE,
      href: "/price-calculations",
    },
    {
      name: "TÀI KHOẢN PHỤ",
      img: IMG_SUB_ACCOUNT,
      href: "/sub-accounts",
    },
  ];

  return (
    <div className="container my-5">
      <div className="row g-5">
        {features.map((feature) => (
          <div className="col-md-3">
            <CardFeature key={feature.name} feature={feature} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default System;
