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
  highlight: {
    backgroundColor: theme.palette.secondary.dark,
  }
  },
}))(TableRow)


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})



const LogTable = ({ logs, selectedFlight, setSelectedFlight }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width='75px'>Date</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Type</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Ident</StyledTableCell>
              <StyledTableCell align="left" width='15px'>From</StyledTableCell>
              <StyledTableCell align="left" width='15px'>To</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Night</StyledTableCell>
              <StyledTableCell align="left" width='95px'>Cross Country</StyledTableCell>
              <StyledTableCell align="left" width='15px'>PIC</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Total</StyledTableCell>
              <StyledTableCell align="left">Remarks</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((row) => (
              <StyledTableRow hover selected={row.id === selectedFlight} onClick={() => setSelectedFlight(row.id)} key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.date}
                </StyledTableCell>
                <StyledTableCell align="left">{row.type}</StyledTableCell>
                <StyledTableCell align="left">{row.ident}</StyledTableCell>
                <StyledTableCell align="left">{row.from}</StyledTableCell>
                <StyledTableCell align="left">{row.to}</StyledTableCell>
                <StyledTableCell align="left">{row.night}</StyledTableCell>
                <StyledTableCell align="left">{row.crossCountry}</StyledTableCell>
                <StyledTableCell align="left">{row.pic}</StyledTableCell>
                <StyledTableCell align="left">{row.total}</StyledTableCell>
                <StyledTableCell align="left">{row.remarks}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}


export default LogTable