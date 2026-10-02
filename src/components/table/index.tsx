import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Progress, ProgressName } from '../../types/interfaces';
import { getFirstLetterCapitalized } from '../../utils/helpers';

export default function BasicTable({
  progress,
  onReset,
}: {
  progress: Progress[];
  onReset: (name: ProgressName) => void;
}) {
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 250 }} aria-label="progress per module">
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
          {progress.map((p) => (
            <TableRow
              key={p.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {getFirstLetterCapitalized(p.name)}
              </TableCell>
              <TableCell align="right">
                {p.correctGuesses}/{p.totalGuesses}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color={p.name}
                  onClick={() => onReset(p.name)}
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
