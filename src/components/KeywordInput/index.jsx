import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import KeywordDisplay  from '../KeywordDisplay';

export default class KeywordInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: 'blank',
    }
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  handleUpdateClick(e) {

      e.preventDefault();
      console.log(`value of keyword is ${this.keyword.value}`);
      console.log("update button is clicked");
      this.props.handleUpdate(this.keyword.value);

  }

  render() {

    return (

        <div>
          <label className={styles['config-label']}>Configuration</label><br/><br/>
          <label className={styles['keyword-label']}>Keyword</label><br/>
          <form onSubmit={this.handleUpdateClick}>
            <input className={styles['keyword-input']} type="text" name="keyword" ref={(keyword)=> this.keyword = keyword} />
            <button type="submit" >Update</button>
          </form>
        </div>

    );

  }

}

KeywordInput.propTypes = {
  keyword: PropTypes.string,
  handleUpdate: PropTypes.function,
};