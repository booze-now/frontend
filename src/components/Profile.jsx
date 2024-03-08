import React from "react";
import { useUser } from "../contexts/UserContext.js";
import NoPage from "./NoPage.jsx"
import axiosService from "../models/axiosService.js";
import { useMessages } from "../contexts/MessagesContext.js";

const Profile = () => {

  const { user } = useUser();
  const { addMessage } = useMessages();

  const refresh = () => {
    axiosService
      .get("me")
      .then((response) => {
        const user = response.data.user;
        console.log(user);
        // login(user);
      })
      .catch((error) => {
        // console.log(error.response.data);
        // error.response.status == 401
        console.warn(error)
        addMessage("danger", error.response.data.error);
      });
  };


  //  console.log(user)
  return (
    <>
      {!user
        ? <NoPage />
        : <><h2>{user.name}</h2>
          {Object.keys(user).map((idx, key) => <div key={key}>{user[idx]}</div>)}
          <button onClick={refresh}>Refresh me!</button>
        </>
      }
    </>
  );
};

export default Profile;
