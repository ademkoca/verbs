import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Progress } from '../../types/interfaces';
import { Button } from '@mui/material';
import { getFirstLetterCapitalized } from '../../utils/helpers';

function createData(name: string, progress: string) {
  return { name, progress };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Eclair', 262, 16.0),
//   createData('Cupcake', 305, 3.7),
// ];

export default function BasicTable({
  progress,
  onReset,
}: {
  progress: Progress[];
  onReset: (name: string) => void;
}) {
  const rows = progress?.map((p) =>
    createData(
      p.name,
      p.correctGuesses.toString() + '/' + p.totalGuesses.toString()
    )
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Module</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              Correct / Guessed
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">
              Reset
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {getFirstLetterCapitalized(row.name)}
              </TableCell>
              <TableCell align="right">{row.progress}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color={row.name}
                  onClick={() => onReset(row.name)}
                  sx={{ color: 'white' }}
                >
                  Reset
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
