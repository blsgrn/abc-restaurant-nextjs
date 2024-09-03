import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BillingPage = ({ reservationId }) => {
  const [reservation, setReservation] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchReservationAndPayment = async () => {
      try {
        const reservationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservationId}`
        );
        if (!reservationResponse.ok) {
          throw new Error("Failed to fetch reservation");
        }
        const reservationData = await reservationResponse.json();
        setReservation(reservationData);

        const paymentResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/reservation/${reservationId}`
        );
        if (!paymentResponse.ok) {
          throw new Error("Failed to fetch payment");
        }
        const paymentData = await paymentResponse.json();
        setPayment(paymentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReservationAndPayment();
  }, [reservationId]);

  const handleSendBill = () => {
    alert("Bill sent to customer!");
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl min-h-screen mx-auto bg-gray-50 rounded-lg shadow-lg">
        {reservation && payment ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-300">
              Billing Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-700 font-medium">Customer Name:</p>
                <p className="text-gray-900">{reservation.userName}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 font-medium">Service Charge:</p>
                <p className="text-gray-900">
                  ${reservation.serviceCharge.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 font-medium">
                  Special Request Charge:
                </p>
                <p className="text-gray-900">
                  ${reservation.specialRequestCharge.toFixed(2)}
                </p>
              </div>
              {reservation.type === "Dining" && (
                <div className="flex justify-between">
                  <p className="text-gray-700 font-medium">Dining Price:</p>
                  <p className="text-gray-900">
                    ${reservation.diningPrice.toFixed(2)}
                  </p>
                </div>
              )}
              {reservation.type === "Delivery" && (
                <div className="flex justify-between">
                  <p className="text-gray-700 font-medium">Delivery Price:</p>
                  <p className="text-gray-900">
                    ${reservation.deliveryPrice.toFixed(2)}
                  </p>
                </div>
              )}
              <div className="flex justify-between border-t pt-4 border-gray-300">
                <p className="text-gray-900 font-bold text-lg">Total:</p>
                <p className="text-gray-900 font-bold text-lg">
                  ${payment.amount.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleSendBill}
              className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Send Bill to Customer
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </>
  );
};

export default BillingPage;
