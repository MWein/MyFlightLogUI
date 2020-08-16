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
    expect(getEntriesFromPhase(mockBuildData, 'all')).toMatchSnapshot()
  })

  it('Returns only entries belonging to a particular phase', () => {
    expect(getEntriesFromPhase(mockBuildData, 'w')).toMatchSnapshot()
  })
})
