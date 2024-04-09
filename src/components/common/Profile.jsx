import React, { useState } from "react";
import { useUser } from "contexts/UserContext";
import NoPage from "./NoPage.jsx";
import { useMessages } from "contexts/MessagesContext";
import { useApi } from "contexts/ApiContext";

const Profile = () => {
  const { user } = useUser();
  const { addMessage } = useMessages();
  const { get, deleteX, post} = useApi(); // Renamed delete to deleteApi because 'delete' is a reserved keyword
  const [displayUser, setDisplayUser] = useState(user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //edit mód state, jelszónál kérje régit, middlenem nem minden mas kell 

  const refresh = () => {
    get("me")
      .then((response) => {
        const user = response.data;
        setDisplayUser(user);
      })
      .catch((error) => {
        setDisplayUser(null);
        addMessage("danger", error.response.data.error);
      });
  };

  const handleDeleteConfirmation = () => {
    deleteX("me")
      .then(() => {
        // Handle success, you may want to redirect or show a message
        console.log("User deleted successfully");
        // For demonstration purposes, let's refresh the page after deletion
        window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting user", error);
        // Show error message
        addMessage("danger", "Error deleting user. Please try again.");
      });
  };

  return (
    <div className="container">
      {!displayUser ? (
        <NoPage />
      ) : (
        <div>
          <h2>{displayUser.name}</h2>
          <div className="row">
            <div className="col-md-6">
              <UserInfo label="Name" value={`${displayUser.first_name}  ${displayUser.middle_name ?? ""} ${displayUser.last_name}`} />
              <UserInfo label="Email" value={displayUser.email} />
              <UserInfo label="Table" value={displayUser.table} />
              <UserInfo label="Adress" value={displayUser.adress} />
              <UserInfo label="Phone number" value={displayUser.phone} />
            </div>
          </div>
          <button className="btn btn-danger mt-3" onClick={() => setShowDeleteModal(true)}>
            Delete
          </button>
        </div>
      )} 

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmation}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserInfo = ({ label, value }) => {
  return (
    <div className="mb-3">
      <strong>{label}: </strong>
      {value}
    </div>
  );
};

export default Profile;
