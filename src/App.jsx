import { useState, useEffect } from "react";
import Person from "./components/person";
import Services from "./services/persons.js";

import axios from 'axios'


const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [targetName, setTargetName] = useState("");

  useEffect(() => {
    Services
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [persons])
  

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      id: generateId(),
      name: newName,
      number: newNumber,
    };
    if (newName.length === 0 || newNumber.length === 0)
      return alert("please fill all fileds");

    if (persons.some((person) => person.number === newNumber))
      alert("user with same phone already exist");
    else {
      Services.create(newPerson)
      setPersons(persons.concat(newPerson))
      setNewName("");
      setNewNumber("");
    }
    
  };

  const deletePerson = (id) => {
    let i = []
    persons.filter(person => {if(person.id !== id){i = i.concat(person)}})
    setPersons(i)
    Services.deletePerson(id)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleTargetName = (event) => {
    setTargetName(event.target.value);
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <h2>People</h2>
      <input placeholder="Search Name" value={targetName} onChange={handleTargetName}></input>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
           <button onClick={(e) => deletePerson(person.id, e)}>Delete</button> <Person name={person.name} number={person.number} />
          </li>
        ))}
      </ul>
      <form onSubmit={addPerson}>
        <input placeholder="name" onChange={handleNewName} value={newName}></input>
        <input placeholder="number" onChange={handleNewNumber} value={newNumber}></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
