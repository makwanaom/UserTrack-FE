import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get("https://usertrack.onrender.com/getusers")
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const createUser = () => {
    Axios.post("https://usertrack.onrender.com/createuser", { name, age, username })
      .then((response) => {
        setListOfUsers([...listOfUsers, { name, age, username }]);
      })
      .catch((error) => {
        console.error("There was an error creating the user!", error);
      });
  };

  const deleteUser = (username) => {
    Axios.delete(`https://usertrack.onrender.com/deleteuser/${username}`)
      .then((response) => {
        setListOfUsers(listOfUsers.filter((user) => user.username !== username));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <div className="App">
      <div className='userDisplay'>
        {listOfUsers.map((user) => (
          <div key={user.username}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Username: {user.username}</h1>
            <button onClick={() => deleteUser(user.username)}>Delete User</button>
          </div>
        ))}
      </div>

      <div>
        <input
          type='text'
          placeholder='Name...'
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type='number'
          placeholder='Age...'
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type='text'
          placeholder='Username...'
          onChange={(event) => setUsername(event.target.value)}
        />
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
