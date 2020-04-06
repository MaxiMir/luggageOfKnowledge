import React from 'react'

export const Repos = ({repos}) => (
  <React.Fragment>
    {repos.map(repo => (
      <div className="card mb-3" key={repo.id}>
        <div className="card-body">
          <h5>
            <a
              href={repo.html_url}
              rel="noopener noreferrer"
              target="_blank"
            >{repo.name}</a>
          </h5>
        </div>
      </div>
    ))}
  </React.Fragment>
)
