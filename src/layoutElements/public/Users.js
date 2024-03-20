import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DisplayUser from "../../view/DisplayUser";
export default function Users() {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/employees", {
          signal: controller.signal,
        });

        console.log(JSON.stringify(response.data));
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <DisplayUser data={users} />
      ) : (
        <p>No usres to display</p>
      )}
    </article>
  );
}
