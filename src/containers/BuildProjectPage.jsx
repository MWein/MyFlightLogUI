import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import PhasesList from '../components/BuildLog/PhasesList'
import superagent from 'superagent'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import LineGraph from '../components/BuildLog/LineGraph'


const BuildProjectPage = () => {
  const { buildId } = useParams()
  
  const [ loaded, setLoaded ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const [ buildProjectData, setBuildProjectData ] = useState({ name: 'Loading', phases: [] })
  const [ selectedPhase, setSelectedPhase ] = useState('all')



  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })



  const getEntries = () => {
    const entries = selectedPhase == 'all' ?
      buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.entries ], [])
      : buildProjectData.phases.find(x => x.id === selectedPhase).entries

    return entries.sort((a, b) => {
      return moment(b.date) - moment(a.date)
    })
  }




  const getHeaderData = () => {
    const phase = buildProjectData.phases.find(x => x.id === selectedPhase)
    const complete = selectedPhase === 'all' ? buildProjectData.phases.reduce((acc, x) => !x ? false : acc, false) : phase.complete

    const entries = selectedPhase == 'all' ?
      buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.entries ], [])
      : phase.entries

    // Hours
    const hours = (entries.reduce((acc, x) => acc + x.minutes, 0) / 60).toFixed(2)
    const hoursText = `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`

    // Rivets
    const rivets = entries.reduce((acc, x) => acc + x.rivets, 0)
    const rivetsText = `${rivets} ${rivets === 1 ? 'Rivet' : 'Rivets'}`

    // Timeline string
    let timeline
    const entryDates = entries.map(x => x.date).sort()
    const firstDate = entryDates[0]
    const lastDate = entryDates[entryDates.length - 1]
    if (!firstDate) {
      timeline = 'Not Started'
    } else if (complete) {
      timeline = `${moment(firstDate).format('D MMMM YYYY')} - ${moment(lastDate).format('DD MMMM YYYY')}`
    } else {
      timeline = `${moment(firstDate).format('D MMMM YYYY')} - Ongoing`
    }


    // Cost
    const expenses = selectedPhase === 'all' ? buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.expenses ], []) : buildProjectData.phases.find(x => x.id === selectedPhase).expenses
    const cost = currencyFormatter.format(expenses.filter(x => !x.projected).reduce((acc, x) => acc + x.cost, 0))


    return {
      hours: hoursText,
      timeline,
      cost,
      rivets: rivetsText,
    }
  }
  const { hours, timeline, cost, rivets } = getHeaderData()



  const createHoursGraphObject = entries => {
    if (selectedPhase === 'all') {
      return buildProjectData.phases.map(x => x.name).map(phase => ({
        label: phase,
        value: entries.filter(x => x.phase === phase).reduce((acc, x) => acc + x.minutes, 0) / 60
      })
      )
    }

    // Slice is used because reverse mutates the orginal array. No bueno
    return entries.slice().reverse().map(entry => ({
      label: entry.title,
      value: entry.minutes / 60
    }))
  }


  const createExpensesGraphObject = () => {
    if (selectedPhase === 'all') {
      const nonProjectedCosts = buildProjectData.phases.map(phase => ({
        label: phase.name,
        value: phase.expenses.filter(x => !x.projected).reduce((acc, x) => acc + x.cost, 0)
      })
      )

      const projectedCosts = buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.expenses.filter(x => x.projected) ], [])

      return [
        ...nonProjectedCosts,
        {
          label: 'Projected',
          value: projectedCosts.reduce((acc, x) => acc + x.cost, 0),
          color: 'black'
        }
      ]
    }

    const nonProjectedCosts = buildProjectData.phases.find(x => x.id === selectedPhase).expenses.filter(x => !x.projected).map(expense => ({
      label: expense.description,
      value: expense.cost
    }))

    const projectedCosts = buildProjectData.phases.find(x => x.id === selectedPhase).expenses.filter(x => x.projected)

    return [
      ...nonProjectedCosts,
      {
        label: 'Projected',
        value: projectedCosts.reduce((acc, x) => acc + x.cost, 0),
        color: 'black'
      }
    ]
  }



  const entries = getEntries()
  const hoursGraphObject = createHoursGraphObject(entries)
  const expensesGraphObject = createExpensesGraphObject()


  const getBuildDetails = async () => {
    const response = await superagent.get(`http://${window.location.hostname}:8081/build-details?buildid=${buildId}`)
    const projectData = JSON.parse(response.text)

    setLoaded(true)
    setLoading(false)
    setBuildProjectData(projectData)
  }


  useEffect(() => {
    if (!loaded && !loading) {
      setLoading(true)
      getBuildDetails()
    }
  })


  return (
    <div style={{ display: 'flex' }}>
      <PhasesList selection={selectedPhase} phases={buildProjectData.phases} onChange={id => {setSelectedPhase(id)}} />

      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <Paper style={{ padding: '15px', minWidth: '700px' }}>
            <div style={{ display: 'flex', position: 'relative' }}>
              <Typography variant='h5'>
                {buildProjectData.name} {selectedPhase !== 'all' && `(${buildProjectData.phases.find(x => x.id === selectedPhase).name})`}
              </Typography>
              <Typography style={{ position: 'absolute', right: '15px' }} variant='h6'>
                {timeline}
              </Typography>
            </div>

            <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

            <table width="100%">
              <tr>
                <td style={{ width: '150px' }}>
                  <Typography variant='h6'>
                    {hours}
                  </Typography>
                </td>
                <td>
                  <LineGraph inputs={hoursGraphObject} valueLabel='Hours' />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant='h6'>
                    {rivets}
                  </Typography>
                </td>
                <td>
                  <LineGraph />
                </td>
              </tr>

              <tr>
                <td>
                  <Typography variant='h6'>
                    {cost}
                  </Typography>
                </td>
                <td>
                  <LineGraph inputs={expensesGraphObject} formatter={currencyFormatter} />
                </td>
              </tr>
            </table>

          </Paper>

          <Paper style={{ width: '100%', minWidth: '350px', marginLeft: '15px' }}>
            TODO:: Graph display with hours, rivets, expenses over time
          </Paper>
        </div>

        {entries.map(entry => {
          return (
            <Paper key={JSON.stringify(entry)} style={{ marginTop: '15px', padding: '15px' }}>
              <div style={{ display: 'flex', position: 'relative' }}>
                <Typography variant='h6' style={{ width: '150px' }}>
                  {`${moment(entry.date).format('MMM DD, YYYY')}`}
                </Typography>

                <Typography variant='h6'>
                  {`${entry.title} - (${(entry.minutes / 60).toFixed(2)} Hours`}
                  {entry.rivets === 0 ? ')' : `, ${entry.rivets} ${entry.rivets === 1 ? 'Rivet' : 'Rivets'})`}
                </Typography>

                <Typography variant='h6' style={{ position: 'absolute', right: '15px' }}>
                  {entry.phase}
                </Typography>
              </div>

              <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />

              <Typography>
                {entry.description}
              </Typography>

            </Paper>
          )
        })}
      </div>
    </div>
  )
}


export default BuildProjectPage