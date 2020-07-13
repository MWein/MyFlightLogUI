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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'



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

  const [ withPhotos, setWithPhotos ] = useState(false)
  const [ withForeflighTrack, setWithForeflightTrack ] = useState(false)

  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(25)


  const handlePhotoFilterChange = event => {
    setPage(0)
    setSelectedFlight(null)
    setWithPhotos(event.target.checked)
  }

  const handleForflightFilterChange = event => {
    setPage(0)
    setSelectedFlight(null)
    setWithForeflightTrack(event.target.checked)
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



  const filteredSortedLogs = logs
    .filter(log => withPhotos ? log.pictures && log.pictures.length > 0 : true)
    .filter(log => withForeflighTrack ? log.hasForeflightTrack : true)



  return (
    <Paper style={{ flex: 1, height: 'min-content', position: 'relative' }}>
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
            {filteredSortedLogs
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
        rowsPerPageOptions={[]}
        component="div"
        count={filteredSortedLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event, newPage) => setPage(newPage)}
      />


      <div style={{ position: 'absolute', left: '15px', bottom: '5px' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={withPhotos}
              onChange={handlePhotoFilterChange}
              name="checkedF"
              color='primary'
            />
          }
          label="With Photos"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={withForeflighTrack}
              onChange={handleForflightFilterChange}
              name="checkedF"
              color='primary'
            />
          }
          label="With Foreflight Track"
        />
      </div>

      
    </Paper>
  )
}


export default LogTable