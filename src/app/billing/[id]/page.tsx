"use client";

import React from "react";
import BillingPage from "../../components/BillingPage";

const BillingPageComponent = ({ params }) => {
  const { id } = params;
  return <BillingPage reservationId={id} />;
};

export default BillingPageComponent;
