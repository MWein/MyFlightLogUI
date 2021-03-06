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

const graphMockBuildData = {
  name: 'Yes',
  phases: [
    {
      id: '1',
      name: 'Research',
      expenses: [
        {
          description: 'Bought a thing',
          cost: 50,
          projected: false,
        },
      ],
      entries: [
        {
          title: 'Did some research',
          date: '2020-01-01',
          minutes: 120,
          rivets: 20,
          phase: 'Research',
        },
        {
          title: 'Did some more research',
          date: '2020-01-01',
          minutes: 60,
          rivets: 20,
          phase: 'Research',
        },
      ],
    },
    {
      id: '2',
      name: 'Workshop',
      expenses: [
        {
          description: 'Bought another thing',
          cost: 50,
          projected: true,
        },
      ],
      entries: [
        {
          title: 'Did something with the workshop',
          date: '2020-01-03',
          minutes: 120,
          rivets: 20,
          phase: 'Workshop',
        },
      ],
    },
  ],
}

describe('createHoursGraphObject', () => {
  it('All phases', () => {
    expect(createHoursGraphObject(graphMockBuildData, 'all'))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Research",
          "value": 3,
        },
        Object {
          "label": "Workshop",
          "value": 2,
        },
      ]
    `)
  })

  it('Selected phase', () => {
    expect(createHoursGraphObject(graphMockBuildData, '1'))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Did some more research",
          "value": 1,
        },
        Object {
          "label": "Did some research",
          "value": 2,
        },
      ]
    `)
  })
})

describe('createExpensesGraphObject', () => {
  it('All phases', () => {
    expect(createExpensesGraphObject(graphMockBuildData, 'all'))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Research",
          "value": 50,
        },
        Object {
          "label": "Workshop",
          "value": 0,
        },
        Object {
          "color": "black",
          "label": "Projected",
          "value": 50,
        },
      ]
    `)
  })

  it('Selected phase', () => {
    expect(createExpensesGraphObject(graphMockBuildData, '1'))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Bought a thing",
          "value": 50,
        },
        Object {
          "color": "black",
          "label": "Projected",
          "value": 0,
        },
      ]
    `)
  })
})
