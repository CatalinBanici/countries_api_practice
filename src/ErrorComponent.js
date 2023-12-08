import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorComponent() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error-page">
      <h2>Error</h2>
      <p>{error.message}</p>
      <p>
        Back to the <Link to="/">Homepage</Link>
      </p>
    </div>
  );
}
