/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef } from "@mui/x-data-grid";

export interface IDatagrid {
  columns: GridColDef[];
  rows: any[];
  title: string;
  filterColumns: string[];
}
