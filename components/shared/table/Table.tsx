import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import styled from "styled-components";

export const MyTable = ({ column, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {column.map((col, i) => (
              <TableCell align="center" key={i} id={i}>
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow id={i} key={i}>
              {column.map((e, j) => (
                <TableCell key={j} id={j}>
                  {e.render ? e.render(row, row[e.id]) : row[e.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProductListContainer = styled.div``;
