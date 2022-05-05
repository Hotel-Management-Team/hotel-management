export const paymentByDate = (
  arrival,
  departure,
  extraPrice,
  price,
  typeCustomer
) => {
  const dateArrival_ = new Date(arrival);
  const dateDeparture_ = new Date(departure);
  const days = Math.round(
    (dateDeparture_.getTime() - dateArrival_.getTime()) / (1000 * 60 * 60 * 24)
  );
  const today = new Date().getTime();
  const extraHour =
    today > dateDeparture_.getTime()
      ? Math.round((today - dateDeparture_.getTime()) / (1000 * 60 * 60))
      : 0;

  if (typeCustomer === "local") {
    return days * price + extraPrice * extraHour;
  } else {
    return (days * price + extraPrice * extraHour) * 1.5;
  }
};

export const paymentByBlock = (
  arrival,
  departure,
  extraPrice,
  price,
  typeCustomer
) => {
  const dateArrival_ = new Date(arrival);
  const dateDeparture_ = new Date(departure);

  const today = new Date().getTime();
  const extraHour =
    today > dateDeparture_.getTime()
      ? Math.round((today - dateDeparture_.getTime()) / (1000 * 60 * 60))
      : 0;

  if (typeCustomer === "local") {
    return 1 * price + extraPrice * extraHour;
  } else {
    return (1 * price + extraPrice * extraHour) * 1.5;
  }
};
