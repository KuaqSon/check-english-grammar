import React from "react";
export default function ResultCard({result}) {
  const {
    message
  } = result;

  return (
    <div className="card">
      <h6>{message}</h6>
    </div>
  );
}
