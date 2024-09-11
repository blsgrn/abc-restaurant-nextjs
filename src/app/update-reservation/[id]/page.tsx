"use client";

import React from "react";
import UpdateReservation from "../../components/UpdateReservation";

const UpdateReservationPage = ({ params }) => {
  const { id } = params;
  return <UpdateReservation id={id} />;
};

export default UpdateReservationPage;
