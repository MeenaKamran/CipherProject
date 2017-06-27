import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import EncodingGrid  from '../EncodingGrid';

export default class KeywordDisplay extends React.Component {

  constructor(props) {
    super(props);
    this._showCipherKeyGrid = this._showCipherKeyGrid.bind(this);
  }

  _showCipherKeyGrid() {
    const word = [];
    const offsets = [];
    const keyword = this.props.keyword;

    //console.log("in _showCipherKeyGrid");
    //console.log(`Cipher keyword in keywordDisplay is: ${keyword}`);
    //console.log(`Show in keywordDisplay component: ${this.props.show}`);
    if (this.props.show === 'error' ) {
      console.log('printing error message');

      return (
        <p>Please Enter a word between 3-8 characters, and with all capital Letters!</p>
      )
    } else if (this.props.show === 'displayGrid') {
      console.log('printing grid');
      for(let i=0; i<keyword.length; i++) {
        word.push(keyword[i]);
        offsets.push(keyword.charCodeAt(i) - 65);
      }
      console.log(`words is: ${word}`);
      this.props.offsetValue = offsets[0];
      console.log(`props.offsetValue: ${this.props.offsetValue} `);
      this.props.offsetsArray = offsets;
      console.log(`offsetsArray: ${this.props.offsetsArray}`);
      this.props.cipherKeyLength = keyword.length;
      return (
        <table className={styles['keywordDisplay-grid']}>
          <tr className={styles['keywordDisplay-row']}>
            {word.map( letter => <td className={styles['keywordDisplay-cell']}>{letter}</td>)}
          </tr>
          <tr className={styles['keywordDisplay-row']}>
            {offsets.map( offset => <td className={styles['keywordDisplay-cell']}>{offset}</td>)}
          </tr>
        </table>
      )
    } else {
      console.log('printing blank');

      return (
        <div></div>
      )
    }

  }

  render() {
    const newWord = true;
    this.props.newWord = newWord;
    return (
      <div>
        {this._showCipherKeyGrid()}
        <EncodingGrid offsetsArray={this.props.offsetsArray} offsetValue={this.props.offsetValue} cipherKeyLength={this.props.cipherKeyLength} newWord={this.props.newWord} />
      </div>

    )
  }
}

KeywordDisplay.propTypes = {
  keyword: PropTypes.string,
  show: PropTypes.string,
  offsetsArray: PropTypes.array,
  cipherKeyLength: PropTypes.integer,
  offsetValue: PropTypes.integer,
  newWord: PropTypes.boolean,
};