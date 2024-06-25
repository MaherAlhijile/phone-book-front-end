import axios from "axios";
const baseUrl = "https://phone-book-back-end.onrender.com/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(baseUrl +  "/" + id);
  console.log(request)
};

export default { getAll, create, deletePerson };
