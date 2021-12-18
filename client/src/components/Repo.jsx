import React from 'react';

const Repo = (props) => {
  return (
    <div>
      <span>
      <a href={props.repo.html_url}>{props.repo.name}</a> user: {props.repo.owner}
      </span>
    </div>
  );
};

export default Repo;