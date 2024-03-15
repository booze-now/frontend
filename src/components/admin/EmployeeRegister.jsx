import { useNavigate, Link } from "react-router-dom";
import Users from "./Users";


export default function EmployeeRegister() {
  const navigate = useNavigate();

  function logout() {
    navigate("/");
  }
  return (
    <section>
      <h1>Employee Register</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <Users />
 
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
      </section>
  );
}
