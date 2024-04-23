import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.blue,
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    textAlign: 'left',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.common.blue,
    color: 'NAVY',
    paddingRight: '15px',
  },
  '&.negative-value': {
    color: 'red',
  },
}));

export default StyledTableCell;
