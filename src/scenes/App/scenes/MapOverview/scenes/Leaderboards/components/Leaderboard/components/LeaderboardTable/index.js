import React from 'react'

import LeaderboardItem from './components/LeaderboardItem'

import './styles.styl'


export default function LeaderboardTable(
  { data, playerClass, fetchMore, toggleExpand, collapseAll, expandedRuns }
) {
  if (data.size === 0) {
    return (
      <div className="no-records">
        No one has completed this.
      </div>
    )
  }
  const firstPlace = data.get(0)
  return (
    <div className="MapOverview-LeaderboardTable-container">
      <table className="MapOverview-LeaderboardTable">
        <thead>
          <tr>
            <th className="rank sortable selected shrink" colSpan="2">
              # <i className="fa fa-sort-down" />
            </th>
            <th className="duration sortable shrink text-right selected">
              duration
            </th>
            <th className="comparison shrink hidden"></th>
            <th className="player expand unsortable">player</th>
            <th className="date sortable shrink hidden-xs">
              date
            </th>
          </tr>
        </thead>
        <tbody>
          {data ? data.map((data, idx) => {
            const runID = data.get('id')
            return (
              <LeaderboardItem
                key={idx}
                data={data}
                firstPlace={firstPlace}
                onClick={() => toggleExpand(playerClass, runID)}
                expanded={expandedRuns.includes(runID)}
              />
            )
          }) : 'nothing'}
        </tbody>
      </table>
      {expandedRuns.size > 0 &&
        <div className="leaderboard-buttons">
          <div className="btn-group">
            <button className="btn btn-primary btn-dark" onClick={() => collapseAll(playerClass)}>
              <i className="fas fa-chevron-up" /> <i className="fa-secret" /> Admin
            </button>
            <button className="btn btn-primary btn-dark" onClick={() => collapseAll(playerClass)}>
              <i className="fas fa-chevron-up" /> Collapse runs
            </button>
          </div>
        </div>
      }
      <button className="load-more-button" onClick={() => fetchMore()}>
          Load more
      </button>
    </div>
  )
}
