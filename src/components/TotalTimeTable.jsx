import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})



const TotalTimeTable = ({ totalTimes }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Takeoffs</StyledTableCell>
            <StyledTableCell align="left">Landings</StyledTableCell>
            <StyledTableCell align="left">Night</StyledTableCell>
            <StyledTableCell align="left">Actual Instrument</StyledTableCell>
            <StyledTableCell align="left">Simulated Instrument</StyledTableCell>
            <StyledTableCell align="left">Cross Country</StyledTableCell>
            <StyledTableCell align="left">Dual</StyledTableCell>
            <StyledTableCell align="left">Pilot in Command</StyledTableCell>
            <StyledTableCell align="left">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="left">{totalTimes.takeoffs}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.landings}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.night}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.instrument}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.simInstrument}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.crossCountry}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.dual}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.pic}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.total}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default TotalTimeTable