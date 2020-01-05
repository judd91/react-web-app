import React, { Component } from 'react';
import { useParams } from "react-router-dom";

export default function ParkingView() {

  let { id } = useParams();
  console.log(id)

  return (
    <div className="parkingview">
      <h1>LOLOLO</h1>
    </div>
  )

}
