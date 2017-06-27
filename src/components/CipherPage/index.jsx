import React from 'react';
import PropTypes from 'prop-types';

import KeywordInput  from '../KeywordInput';
import KeywordDisplay  from '../KeywordDisplay';

export default class CipherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'blank',
      keyword: '',
    }

  };

  handleUpdate(keyword){
    const capLetters = /^[A-Z]*$/;

    console.log("in handleUpdateClick");
    console.log(`keyword is: ${keyword}`);

    this.setState({keyword: keyword});
    if (keyword.length > 2 && keyword.length < 9 && keyword.match(capLetters) )
    {
      this.setState({show: 'displayGrid'})
      console.log(`show is: ${this.state.show}`);
    } else if (keyword.length === 0) {
      this.setState({show: 'blank'})
      console.log(`show is: ${this.state.show}`);
    } else {
      this.setState({show: 'error'});
      console.log(`show is: ${this.state.show}`);
    }
  }

  _displayKeywordGrid() {
    console.log(`in displayKeywordGrid, keyword is: ${this.state.keyword}`);
    console.log(`show is: ${this.state.show}`);
    return (
      <div>
        <KeywordDisplay keyword={this.state.keyword} show={this.state.show}/>
      </div>
    );
  }

  render() {

    return (
      <div>
        <KeywordInput handleUpdate={this.handleUpdate.bind(this)} />
        {this._displayKeywordGrid()}


      </div>
    )
  }
}

CipherPage.propTypes = {
  keyword: PropTypes.string,
  show: PropTypes.string,
};