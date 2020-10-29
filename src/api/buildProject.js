import moment from 'moment'


export const getEntriesFromPhase = (buildProjectData, selectedPhase) => {
  const entries = selectedPhase == 'all' ?
    buildProjectData.phases.reduce((acc, x) => [ ...acc, ...x.entries ], [])
    : buildProjectData.phases.find(x => x.id === selectedPhase).entries

  return entries.sort((a, b) => moment(b.date) - moment(a.date))
}


export const headerData = (buildProjectData, selectedPhase, currencyFormatter) => {
  const phase = buildProjectData.phases.find(x => x.id === selectedPhase)

  // If selected is 'all', add the number of falses. If its 0, the project is complete
  const complete = selectedPhase === 'all' ? buildProjectData.phases.reduce((acc, x) => !x.complete + acc, 0) === 0 : phase.complete

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
    timeline = `${moment(firstDate).format('D MMMM YYYY')} - ${moment(lastDate).format('D MMMM YYYY')}`
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


export const createHoursGraphObject = (buildProjectData, selectedPhase) => {
  const entries = getEntriesFromPhase(buildProjectData, selectedPhase)

  if (selectedPhase === 'all') {
    return buildProjectData.phases.map(x => x.name).map(phase => ({
      label: phase,
      value: Number((entries.filter(x => x.phase === phase).reduce((acc, x) => acc + x.minutes, 0) / 60).toFixed(2))
    })
    )
  }

  // Slice is used because reverse mutates the orginal array. No bueno
  return entries.slice().reverse().map(entry => ({
    label: entry.title,
    value: entry.minutes / 60
  }))
}


export const createExpensesGraphObject = (buildProjectData, selectedPhase) => {
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