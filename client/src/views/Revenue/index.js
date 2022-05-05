import CardFeature from "../../components/common/CardFeature";
import IMG_PROFIT from "../../assets/profit.png";
import IMG_PERCENTAGE from "../../assets/Percentage.png";

const Revenue = () => {
  const features = [
    {
      name: "Thống Kê Doanh Thu",
      img: IMG_PROFIT,
      href: "/revenue-management/profit",
    },
    {
      name: "Thống Kê Mật Độ Sử Dụng",
      img: IMG_PERCENTAGE,
      href: "/revenue-management/percentage",
    },
  ];

  return (
    <>
      <div className="container my-5">
        <div className="row g-5 d-flex justify-content-center">
          {features.map((feature) => (
            <div className="col-md-4" key={feature.name}>
              <CardFeature feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Revenue;
