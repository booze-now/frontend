import React, { useState, useEffect } from "react";
import { useUser } from "contexts/UserContext";
import { useConfig } from "contexts/ConfigContext";
import { useTranslation } from "contexts/TranslationContext";
import { useApi } from "contexts/ApiContext";
import { Spinner } from "react-bootstrap";


export default function OrderItems() {
  const { __ } = useTranslation();
  const { user } = useUser();
  const {get, post, put, deleteX } = useApi();
  const [orderItems, setOrderItems] = useState([]);



  

console.log(user);
  return (
    <div>
      <h1>Order Items</h1>
    </div>
  );
}
