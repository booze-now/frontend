import React, { useState } from "react";
import { useUser } from "../contexts/UserContext.js";
import NoPage from "./NoPage.jsx"
import axiosService from "../models/axiosService.js";
import { useMessages } from "../contexts/MessagesContext.js";

const Profile = () => {

  const { user } = useUser();
  const { addMessage } = useMessages();

  const [displayUser, setDisplayUser] = useState(user);

  const refresh = () => {
    axiosService
      .get("me")
      .then((response) => {
        const user = response.data //.user;
        console.log(user);
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

  //  console.log(user)
  return (
    <>
      {!displayUser
        ? <NoPage />
        : <><h2>{displayUser.name}</h2>
          {Object.keys(displayUser).map((idx, key) => <div><b>{idx}</b> {displayUser[idx]}</div>)}
          <button onClick={refresh}>Refresh me!</button>
        </>
      }
    </>
  );
};

export default Profile;