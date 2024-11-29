import { ChangeEvent, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IDatagrid } from "../interfaces/datagrid";
import { useTranslation } from "react-i18next";

const DataGridCustom = ({ columns, rows, title, filterColumns }: IDatagrid) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    filterColumns.some((col) =>
      row[col]?.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flex: "1 1 100%" }}>
          {title}
        </Typography>
        <TextField
          variant="standard"
          placeholder={t("filterName")}
          value={filter}
          size="small"
          onChange={handleFilterChange}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          onClick={() => navigate(`create`)}
        >
          {t("create")}
        </Button>
      </Toolbar>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pagination
        onRowClick={(row) =>
          navigate(`create/${row.id}`)
        }
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridCustom;
