import React from "react";
export default function ResultCard({ result }) {
  const { message, rule } = result;

  const urls = rule.urls || [];

  return (
    <div className="card">
      <h6>{message}</h6>

      {urls.length > 0 && (
        <div>
          See more at:
          {urls.map((u, index) => (
            <div key={index}>
              <a href={u.value} target="_blank">
                {u.value}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
