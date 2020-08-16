import {
  headerData,
  getEntriesFromPhase,
  createHoursGraphObject,
  createExpensesGraphObject,
} from './buildProject'

describe('getEntriesFromPhase', () => {
  const mockBuildData = {
    phases: [
      {
        id: 'r',
        entries: ['Research1', 'Research2', 'Research3'],
      },
      {
        id: 'w',
        entries: ['Workshop1', 'Workshop2'],
      },
    ],
  }

  it('Returns all entries if selectedPhase is all', () => {
    expect(getEntriesFromPhase(mockBuildData, 'all')).toMatchInlineSnapshot(`
      Array [
        "Research1",
        "Research2",
        "Research3",
        "Workshop1",
        "Workshop2",
      ]
    `)
  })

  it('Returns only entries belonging to a particular phase', () => {
    expect(getEntriesFromPhase(mockBuildData, 'w')).toMatchInlineSnapshot(`
      Array [
        "Workshop1",
        "Workshop2",
      ]
    `)
  })
})

describe('headerData', () => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const mockBuildDataComplete = {
    name: 'Yes',
    phases: [
      {
        id: '1',
        complete: true,
        expenses: [
          {
            cost: 50,
            projected: false,
          },
        ],
        entries: [
          {
            date: '2020-01-01',
            minutes: 120,
            rivets: 20,
          },
        ],
      },
      {
        id: '2',
        complete: true,
        expenses: [
          {
            cost: 50,
            projected: true,
          },
        ],
        entries: [
          {
            date: '2020-01-03',
            minutes: 120,
            rivets: 20,
          },
        ],
      },
    ],
  }

  const mockBuildDataNotComplete = {
    name: 'Yes',
    phases: [
      {
        id: '1',
        complete: false,
        expenses: [
          {
            cost: 50,
            projected: false,
          },
        ],
        entries: [
          {
            date: '2020-01-01',
            minutes: 120,
            rivets: 20,
          },
        ],
      },
      {
        id: '2',
        complete: true,
        expenses: [
          {
            cost: 50,
            projected: true,
          },
        ],
        entries: [
          {
            date: '2020-01-03',
            minutes: 120,
            rivets: 20,
          },
        ],
      },
    ],
  }

  it('All phases, with all phases complete, and does not include projected expenses', () => {
    expect(headerData(mockBuildDataComplete, 'all', currencyFormatter))
      .toMatchInlineSnapshot(`
      Object {
        "cost": "$50.00",
        "hours": "4.00 Hours",
        "rivets": "40 Rivets",
        "timeline": "1 January 2020 - 3 January 2020",
      }
    `)
  })

  it('All phases, with one phases incomplete, and does not include projected expenses', () => {
    expect(headerData(mockBuildDataNotComplete, 'all', currencyFormatter))
      .toMatchInlineSnapshot(`
      Object {
        "cost": "$50.00",
        "hours": "4.00 Hours",
        "rivets": "40 Rivets",
        "timeline": "1 January 2020 - Ongoing",
      }
    `)
  })

  it('Complete phase', () => {
    expect(headerData(mockBuildDataComplete, '2', currencyFormatter))
      .toMatchInlineSnapshot(`
      Object {
        "cost": "$0.00",
        "hours": "2.00 Hours",
        "rivets": "20 Rivets",
        "timeline": "3 January 2020 - 3 January 2020",
      }
    `)
  })

  it('Incomplete phase', () => {
    expect(headerData(mockBuildDataNotComplete, '1', currencyFormatter))
      .toMatchInlineSnapshot(`
      Object {
        "cost": "$50.00",
        "hours": "2.00 Hours",
        "rivets": "20 Rivets",
        "timeline": "1 January 2020 - Ongoing",
      }
    `)
  })
})
