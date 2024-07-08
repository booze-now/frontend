import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "contexts/ApiContext";
import { useMessages } from "contexts/MessagesContext";
import { useTranslation } from "contexts/TranslationContext";
import { useConfig } from "contexts/ConfigContext";
import { Button } from 'react-bootstrap';

export default function Drink() {
  const { id } = useParams();
  const { get } = useApi();
  const { addMessage } = useMessages();
  const [drink, setDrink] = useState(null);
  const { __ } = useTranslation();
  const { realm } = useConfig();

  useEffect(() => {
    if (realm) {
      get(`drinks/${id}`)
        .then((response) => {
          const drink = response.data; //.user;
          // console.log('drink:', drink);
          setDrink(drink);
        })
        .catch((error) => {
          //setDrink(null);
          console.log(error.response.data);
          // error.response.status == 401
          console.warn(error);
          addMessage("danger", error.response.data.error);
        });
    }
  }, [get, id, realm, addMessage]);

  if (!drink) {
    return <div>{__("Please wait")}</div>;
  }
  // console.log('drink', drink)
  return !drink === null ? (
    <div>Nem nyert</div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1 className="gold-text" style={{ margin: "50px" }}>
        {drink.name}
      </h1>
      <img
        style={{ width: "800px" }}
        src={drink.image_url}
        className="card-img-top"
        alt={drink.name}
      />
      <h2 style={{ margin: "50px" }}>{drink.description}</h2>
      <Button
        variant="light"
            style={{
              fontSize: "30px",
              padding: "15px 15px",
              margin: "20px",
              backgroundColor: "#d4af37",
              border: "none",
              borderRadius: "5px",
            }}
      >
        {__("Add to Cart")}
      </Button>
    </div>
  );
}
