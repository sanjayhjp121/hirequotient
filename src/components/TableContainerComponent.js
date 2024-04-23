import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export default StyledTableContainer;
