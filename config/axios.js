import axios from 'axios';

//axios.defaults.headers.post["Content-Type"] = "application/json";

const  clienteAxios = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://sistemas.forus.cl/forus/challenge/dummy-api/producto/',
   // baseURL: 'https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      }

  });

export default clienteAxios;
