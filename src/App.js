import logo from "./applogo.png";
import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUser = (event) => {
    setUsername(event.target.value);
  };
  /* Arrow function que hace esto mismo
  function onUser(event) {
    setUsername(event.target.value);
  }
  */
  const onPass = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://www.icesi.edu.co/uccareapi/auth/institutions/1/authentication/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }else{
        const result = await response.json();

        console.log("result is: ", result);
        let json = JSON.stringify(result);
        console.log(json);

        const postResult = await fetch(
          "http://2.tcp.ngrok.io:19068/lunchticket",
          {
            method: "POST",
            headers: {
              Accept: 
              "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              result
            )
          }
        );
        if (!postResult.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }else{
          //Recibir el usuario con un array que contenga sus roles
          //Cambiar la página con route de acuerdo al rol que tenga 
          const backResponse = await postResult.json();

          console.log("result is: ", result);
          let json = JSON.stringify(result);
          console.log(json);
  

        }
  
        //Destructuring del objeto. Saco estos atributos
        //const { persName, persLastname, persIddocument } = result;
  
        //Creo un objeto con dichos atributos
        /*const out = {
          persName,
          persLastname,
          persIddocument,
        };*/
  
        //Falta hacer un POST al BACKEND
        // A la tabla de usuarios
  
        
        
        setData(result);
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <img src={logo} />
      <p>Cédula</p>
      <input onChange={onUser} type="text" placeholder="Número de cédula" />
      <p>Contraseña de banner</p>
      <input onChange={onPass} type="password" placeholder="Contraseña" />
      {isLoading && <p>Cargando</p>}
      {err && (
        <p class="text-danger text-center fw-bold">
          Usuario o Contraseña incorrectos
        </p>
      )}
      <br />
      <button class="btn btn-primary" onClick={handleClick}>
        Iniciar sesión
      </button>
      <br />
    </div>
  );
}

export default App;
