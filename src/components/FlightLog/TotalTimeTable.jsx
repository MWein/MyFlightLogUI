import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import moment from 'moment'


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

  const today = moment()
  const month = today.format('MMMM')
  const year = today.format('YYYY')

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Takeoffs</StyledTableCell>
            <StyledTableCell align="left">Landings</StyledTableCell>
            <StyledTableCell align="left">Night</StyledTableCell>
            <StyledTableCell align="left">Instrument</StyledTableCell>
            <StyledTableCell align="left">Simulated Instrument (Hood)</StyledTableCell>
            <StyledTableCell align="left">Instrument Approaches</StyledTableCell>
            <StyledTableCell align="left">Cross Country</StyledTableCell>
            <StyledTableCell align="left">Cross Country PIC</StyledTableCell>
            <StyledTableCell align="left">Dual</StyledTableCell>
            <StyledTableCell align="left">Pilot in Command</StyledTableCell>
            <StyledTableCell align="left">{month}</StyledTableCell>
            <StyledTableCell align="left">{year}</StyledTableCell>
            <StyledTableCell align="left">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="left">{totalTimes.takeoffs}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.landings}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.night.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.instrument.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.simInstrument.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.instrumentApproaches}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.crossCountry.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.crossCountryPIC.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.dual.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.pic.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.month.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.year.toFixed(1)}</StyledTableCell>
            <StyledTableCell align="left">{totalTimes.total.toFixed(1)}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}


TotalTimeTable.propTypes = {
  totalTimes: PropTypes.object
}


export default TotalTimeTable