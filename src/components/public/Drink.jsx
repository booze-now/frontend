import React from "react";
import { useParams } from "react-router-dom";

const Drink = () => {
  const { id } = useParams();

  return (
    <>
      <div>drink: {id}</div>
    </>
  );
};

export default Drink;