import React, { useState } from "react";
import { useUser } from "../contexts/UserContext.js";
import NoPage from "./NoPage.jsx"
import { useMessages } from "../contexts/MessagesContext.js";
import { useApi } from "../contexts/ApiContext.js";


const Profile = () => {

  const { user } = useUser();
  const { addMessage } = useMessages();
  const { get } = useApi();

  const [displayUser, setDisplayUser] = useState(user);

  const refresh = () => {

    get("me")
      .then((response) => {
        const user = response.data[0] //.user;
        setDisplayUser(user);
      })
      .catch((error) => {
        setDisplayUser(null);
        console.log(error.response.data);
        // error.response.status == 401
        console.warn(error)
        addMessage("danger", error.response.data.error);
      });
  };

  return (
    <>
      {!displayUser
        ? <NoPage />
        : <><h2>{displayUser.name}</h2>
          {Object.keys(displayUser).map((idx, key) => (<div key={key}><b>{idx}</b>{displayUser[idx]}</div>))}
          <button onClick={refresh}>Refresh me!</button>
        </>
      }
    </>
  );
};

export default Profile;
