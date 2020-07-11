import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
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



const LogTable = ({ logs, selectedFlight, setSelectedFlight }) => {
  const classes = useStyles()


  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)


  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value), 10)
    setPage(0)
  }


  const stopStyle = (index, stops) => {
    const getTextAlign = () => {
      if (index === 0) {
        return 'left'
      } else if (index === stops.length - 1) {
        return 'right'
      }
      return 'center'
    }

    return {
      flex: 1,
      marginRight: index === stops.length - 1 ? '0px' : '10px',
      textAlign: getTextAlign(),
    }
  }


  return (
    <Paper style={{ flex: 1, height: 'min-content' }}>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell width='75px'>Date</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Type</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Ident</StyledTableCell>
              <StyledTableCell align="left" width='1px'>From</StyledTableCell>
              <StyledTableCell align="left" width='1px'></StyledTableCell>
              <StyledTableCell align="left" width='1px'>To</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Night</StyledTableCell>
              <StyledTableCell align="left" width='95px'>Cross Country</StyledTableCell>
              <StyledTableCell align="left" width='15px'>PIC</StyledTableCell>
              <StyledTableCell align="left" width='15px'>Total</StyledTableCell>
              <StyledTableCell align="left">Remarks</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow onClick={() => setSelectedFlight(row.id)} key={row.id} style={row.id === selectedFlight ? { background: '#80808080' } : {}}>
                  <StyledTableCell component="th" scope="row">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.type}</StyledTableCell>
                  <StyledTableCell align="left">{row.ident}</StyledTableCell>

                  <StyledTableCell align="left" colSpan={3}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {
                        row.stops.map((x, index) =>
                          <span key={`${x}${index}`} style={stopStyle(index, row.stops)}>{x}</span>
                        )
                      }
                    </div>
                  </StyledTableCell>

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

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={logs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event, newPage) => setPage(newPage)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}


export default LogTable