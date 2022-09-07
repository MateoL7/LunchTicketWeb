import React from "react";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";
import { BASEURL } from "../constants/Constants";

function SingupForm({ proRes }) {
  const [name, setName] = useState("");
  const [nit, setNit] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  const [message, setMessage] = useState("");

  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    setAdded(false);
    setMessage("");

    if (proRes) {
      if (!(name === "" || nit === "")) {
        try {
          const response = await fetch(BASEURL + "/lunchticket/addRestaurant", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              nit: nit,
              pictureUrl: "",
            }),
          });

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          } else {
            const backResponse = await response.json();
            if (backResponse) {
              //Aviso de que se creo
              setAdded(true);
              setMessage("Agregado éxitosamente");
            } else {
              console.log(backResponse);
            }
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        setMessage("Por favor llena todos los campos");
      }
    } else {
      if (
        !(
          name === "" ||
          nit === "" ||
          employeeLastName === "" ||
          employeeId === "" ||
          employeeName === "" ||
          employeePassword === ""
        )
      ) {
        console.log("in!!!");
        try {
          const response = await fetch(
            BASEURL + "/lunchticket/addRestaurantEmployee",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nit: nit,
                name: employeeName,
                lastName: employeeLastName,
                document: employeeId,
                password: employeePassword,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          } else {
            const backResponse = await response.json();
            console.log(backResponse.response);
            if (backResponse.response) {
              //Aviso de que se creo
              setAdded(true);
              setMessage("Agregado éxitosamente");
            } else {
              setMessage("No se pudo agregar");
              setAdded(false);
            }
          }
        } catch (err) {
          console.log(err.message);
        }
      } else{
        setMessage("Por favor llena todos los campos");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <TextField
          id="outlined-basic"
          label="Nombre del restaurante"
          variant="outlined"
          size="small"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="NIT del restaurante"
          variant="outlined"
          size="small"
          name="nit"
          onChange={(e) => {
            setNit(e.target.value);
          }}
        />
      </Box>
      {!proRes && (
        <>
          <Box>
            <TextField
              id="outlined-basic"
              label="ID del empleado"
              variant="outlined"
              size="small"
              name="employeeId"
              onChange={(e) => {
                setEmployeeId(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Nombre del empleado"
              variant="outlined"
              size="small"
              name="employeeName"
              onChange={(e) => {
                setEmployeeName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Apellido del empleado"
              variant="outlined"
              size="small"
              name="employeeLastName"
              onChange={(e) => {
                setEmployeeLastName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Contraseña del empleado"
              variant="outlined"
              size="small"
              name="employeePassword"
              onChange={(e) => {
                setEmployeePassword(e.target.value);
              }}
            />
          </Box>
        </>
      )}
      <Stack
        direction="column"
        spacing={2}
        mt={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Button
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<HowToRegIcon />}
        >
          Registrar
        </Button>
        {added ? (
          <Typography my={5} variant="subtitle1" color={"#BA0606"}>
            {message}
          </Typography>
        ) : (
          <Typography my={5} variant="subtitle1" color={"#BA0606"}>
            {message}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default SingupForm;