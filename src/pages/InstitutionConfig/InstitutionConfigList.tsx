import React, { ChangeEvent, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DataGridComponent = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "age", headerName: "Edad", width: 110 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Estado", width: 130 },
  ];

  const rows = [
    { id: 1, name: "Juan Pérez", age: 35, email: "juan@example.com", status: "Activo" },
    { id: 2, name: "Ana Gómez", age: 28, email: "ana@example.com", status: "Inactivo" },
    { id: 3, name: "Luis Fernández", age: 40, email: "luis@example.com", status: "Activo" },
    { id: 4, name: "María López", age: 22, email: "maria@example.com", status: "Inactivo" },
    { id: 5, name: "Carlos Martínez", age: 30, email: "carlos@example.com", status: "Activo" },
    { id: 6, name: "Sofía Ruiz", age: 26, email: "sofia@example.com", status: "Inactivo" },
    { id: 7, name: "Pedro Sánchez", age: 32, email: "pedro@example.com", status: "Activo" },
    { id: 8, name: "Lucía Torres", age: 29, email: "lucia@example.com", status: "Inactivo" },
    { id: 9, name: "Javier Díaz", age: 41, email: "javier@example.com", status: "Activo" },
    { id: 10, name: "Clara Mendoza", age: 33, email: "clara@example.com", status: "Inactivo" },
    { id: 11, name: "Marcos González", age: 25, email: "marcos@example.com", status: "Activo" },
    { id: 12, name: "Elena Castro", age: 37, email: "elena@example.com", status: "Inactivo" },
    { id: 13, name: "Raúl Jiménez", age: 38, email: "raul@example.com", status: "Activo" },
    { id: 14, name: "Marta Herrera", age: 27, email: "marta@example.com", status: "Inactivo" },
    { id: 15, name: "Andrés Romero", age: 31, email: "andres@example.com", status: "Activo" },
    { id: 16, name: "Inés Paredes", age: 24, email: "ines@example.com", status: "Inactivo" },
    { id: 17, name: "Fernando Salazar", age: 39, email: "fernando@example.com", status: "Activo" },
    { id: 18, name: "Verónica Ruiz", age: 36, email: "veronica@example.com", status: "Inactivo" },
    { id: 19, name: "Hugo López", age: 34, email: "hugo@example.com", status: "Activo" },
    { id: 20, name: "Patricia Silva", age: 23, email: "patricia@example.com", status: "Inactivo" },
  ];
  

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flex: "1 1 100%" }}>
          Datos
        </Typography>
        <TextField
          variant="standard"
          placeholder="Filtrar por nombre"
          value={filter}
          size="small"
          onChange={handleFilterChange}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          onClick={() => navigate(`${window.location.pathname}/create`)}
        >
          Create
        </Button>
      </Toolbar>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pagination
        pageSizeOptions={[10, 20, 50]} // Cambiamos las opciones de filas por página
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10, // Establecemos el tamaño de página inicial
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridComponent;
