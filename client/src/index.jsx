import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify({ username: term }),
      success: (response) => {
        this.setState( (curState) => {
          return { repos: [...response] };
        });
      },
      error: (e) => { console.log('ERROR', e); }
    });
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: (response) => {
        this.setState( (curState) => {
          return { repos: [...response] };
        });
      },
      error: (e) => { console.log('ERROR', e); }
    });
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));