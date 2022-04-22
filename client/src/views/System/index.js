import React from "react";
import IMG_ROOM from "../../assets/img-room.png";
import IMG_ROOM_TYPE from "../../assets/img-room-type.jpg";
import IMG_PRICE_TYPE from "../../assets/img-price-type.png";
import IMG_SUB_ACCOUNT from "../../assets/img-sub-account.png";
import CardFeature from "./CardFeature";

function System() {
  const features = [
    {
      name: "PHÒNG",
      img: IMG_ROOM,
      href: "/system-management/rooms",
    },
    {
      name: "LOẠI PHÒNG",
      img: IMG_ROOM_TYPE,
      href: "/system-management/room-types",
    },
    {
      name: "CÁCH TÍNH TIỀN",
      img: IMG_PRICE_TYPE,
      href: "/system-management/charge-calculations",
    },
    {
      name: "TÀI KHOẢN PHỤ",
      img: IMG_SUB_ACCOUNT,
      href: "/system-management/sub-accounts",
    },
  ];

  let Body = (
    <>
      <div className="container my-5">
        <div className="row g-5">
          {features.map((feature) => (
            <div className="col-md-3" key={feature.name}>
              <CardFeature feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return <>{Body}</>;
}

export default System;
