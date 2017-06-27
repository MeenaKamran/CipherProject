import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

export default class EncodingGrid extends React.Component {

  constructor(props) {
    super(props);
    console.log(`in constructor: this.props.offsetValue: ${this.props.offsetValue}`);
    let alphabetArray = [];
    for (let i=65;i<=90;i++) {
      alphabetArray[alphabetArray.length] = String.fromCharCode(i);
    }
    this.state = {
      btnClickCount: 0,
      offsetValue: this.props.offsetValue,
      cipherText: '',
      sourceText: '',
      alphabetArray: alphabetArray,
      offsetAlphabetArray: [],
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
    this._populateArray = this._populateArray.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  handleBtnClick(event) {
    const {id} = event.target;
    console.log(`button id: ${id}`);
    const srcChar = this.state.alphabetArray[id];
    const offsetAlphabetArray = this._populateArray(this.state.offsetValue);
    const cipherChar = offsetAlphabetArray[id];
    //const btnClkCount = (this.state.btnClickCount + 1);
    //console.log(`btnClickCount: ${btnClkCount}`);
    this.setState({
      btnClickCount: this.state.btnClickCount + 1,
      offsetValue: this.props.offsetsArray[this.state.btnClickCount % this.props.cipherKeyLength],
      cipherText: this.state.cipherText + cipherChar,
      sourceText: this.state.sourceText + srcChar,
    });
    //console.log(`new btnClickCount is: ${this.state.btnClickCount}`);
    //console.log(`cipherChar is: ${cipherChar}`);
    //console.log(`srcChar is: ${srcChar}`);
    //console.log(`this.props.offsetsArray: ${this.props.offsetsArray}`);
    //console.log(`this.state.btnClickCount % this.props.cipherKeyLength ${this.state.btnClickCount % this.props.cipherKeyLength}`);
    //console.log(`new offsetvalue in handleBtnClick: ${this.state.offsetValue}`);
    //console.log(`new sourceText is: ${this.state.sourceText + srcChar}`);
    //console.log(`new cipherText is: ${this.state.cipherText}`);

  }

  handleClearClick(event) {
    event.preventDefault();
    console.log('clear button clicked');
    this.setState({
      btnClickCount: 0,
      offsetValue: this.props.offsetsArray[this.state.btnClickCount % this.props.cipherKeyLength],
      cipherText: '',
      sourceText: '',
    });
    console.log(`this.state.btnClickCount: ${this.state.btnClickCount}`);
    console.log(`this.props.offsetsArray: ${this.state.offsetsArray}`);
    console.log(`offsetValue: ${this.state.offsetValue}`);
  }

  _populateArray(offsetNum) {
    console.log(`in _populateArrays, offsetNum: ${offsetNum}`);
    let offsetAlphabetArray = [];
    let count = 0;

    while (count < 26) {
      if ((offsetNum + 65) > 90) {
        offsetNum = 0;
      }
      offsetAlphabetArray[offsetAlphabetArray.length] = String.fromCharCode(offsetNum+65);
      ++offsetNum;
      ++count;
    }
    return offsetAlphabetArray;

  }

  render() {

    //console.log(`this.props.offsetsArray: ${this.props.offsetsArray}`);
    let offsetNum = this.state.offsetValue;
    console.log(`this.props.newWord: ${this.props.newWord}`);
    if (this.props.offsetsArray != null && offsetNum == null) {

      console.log('setting the offsetNum for the 1st time')
      this.state.offsetValue = this.props.offsetsArray[0];
      offsetNum = this.state.offsetValue;
      this.props.newWord = false;

    }

    if (this.props.newWord) {
      //this.handleClearClick(event);
      console.log('new word');
      this.props.newWord = false;
      if (this.props.offsetsArray !=null ) {
        this.setState({
          btnClickCount: 0,
          offsetValue: this.props.offsetsArray[0],
          cipherText: '',
          sourceText: '',
        });
        offsetNum = this.props.offsetsArray[0];
      }

    }
    console.log(`value of offsetValue: ${this.state.offsetValue}`);

    const offsetAlphabetArray = this._populateArray(offsetNum);
    //console.log(`alphabetArray: ${this.state.alphabetArray}`);
    //console.log(`offsetAlphabetArray: ${offsetAlphabetArray}`);

    if (this.props.offsetsArray != null) {

      return (
        <div>
          <label className={styles['Encoding-label']} >Encoding</label><br/><br/>
          <label className={styles['SourceText-label']} >Source Text</label>
          <table className={styles['Encoding-grid']}>
            <tr className={styles['Encoding-row']}>
              {this.state.alphabetArray.map( (alphabetChar, index) => <td className={styles['Encoding-cell']}><button className={styles['alphabet-btn']}id={index} onClick={this.handleBtnClick}>{alphabetChar}</button></td>)}
            </tr>
            <tr className={styles['Encoding-row']}>
              {offsetAlphabetArray.map( offsetChar => <td className={styles['Encoding-cell']}>{offsetChar}</td>)}
            </tr>
          </table>
          <form onSubmit={this.handleClearClick}>
            <input className={styles['SourceText-input']} value={this.state.sourceText} readOnly type="text" ref={(sourceText) => this.sourceText = sourceText} />
            <button type="submit" >Clear</button>
          </form>
          <label className={styles['CipherText-label']} >Cipher Text</label>
          <input className={styles['CipherText-input']} value={this.state.cipherText} readOnly type="text" ref={(cipherText) => this.cipherText = cipherText} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }

  }

}

EncodingGrid.propTypes = {
  offsetValue: PropTypes.array,
  show: PropTypes.string,
  offsetsArray: PropTypes.array,
};