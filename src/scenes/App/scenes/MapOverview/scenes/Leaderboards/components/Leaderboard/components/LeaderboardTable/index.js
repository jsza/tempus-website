import React from 'react'

import LeaderboardItem from './components/LeaderboardItem'


export default function LeaderboardTable({ data, playerClass, fetchMore, toggleExpand, expandedRun  }) {
  if (data.size === 0) {
    return (
      <div className="no-records">
        No one has completed this.
      </div>
    )
  }
  const firstPlace = data.get(0)
  return (
    <div>
      <table className="table-mapoverview">
        <thead>
          <tr>
            <th className="rank sortable selected shrink"><i className="fas fa fa-hashtag fa-sm" /> <i className="fa fa-caret-down" /></th>
            <th className="duration shrink">duration</th>
            <th className="comparison shrink hidden"></th>
            <th className="player expand">player</th>
            <th className="date sortable shrink hidden-xs"><i className="fa fa-calendar" /></th>
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
                expanded={expandedRun === runID}
              />
            )
          }) : 'nothing'}
        </tbody>
      </table>
      <button className="load-more-button" onClick={() => fetchMore()}>
          Load more
      </button>
    </div>
  )
}
