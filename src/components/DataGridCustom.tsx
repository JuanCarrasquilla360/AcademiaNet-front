import { ChangeEvent, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IDatagrid } from "../interfaces/datagrid";

const DataGridCustom = ({ columns, rows, title }: IDatagrid) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

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
          {title}
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

export default DataGridCustom;
