import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 onClick={() => navigate("/")}>Where in the World?</h1>
      <button onClick={() => navigate(-1)}>back</button>
    </div>
  );
}
