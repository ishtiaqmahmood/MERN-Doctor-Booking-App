import React from "react";
import { useRouter } from "next/router";

const Doctor = ({ doctor }) => {
  const router = useRouter();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() =>
        router.push({
          pathname: `/book-appointment/`,
          query: { name: `${doctor._id}` },
        })
      }
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerConsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
};

export default Doctor;
