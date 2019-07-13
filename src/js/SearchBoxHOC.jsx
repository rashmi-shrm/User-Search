import React, { Component } from 'react';
import patientData from './patientData.js';

const DOWNWARD_ARROW = 40;
const UPWARD_ARROW = 38;

const SearchBoxHOC = (WrappedComponent) => {
  class SeachBoxWrapper extends Component {
    constructor() {
      super();
      this.state = {
        displayUserList: false,
        filteredData: patientData.data,
        hoverIndex: 0
      }
      this.searchUsers = this.searchUsers.bind(this);
      this.toggleUserList = this.toggleUserList.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onHover = this.onHover.bind(this);
      this.onBlur = this.onBlur.bind(this);
      this.scrollIntoView = this.scrollIntoView.bind(this);
    }

    // not using debounce as using static data
    searchUsers(event) {
      const data=patientData.data;
      const searchKey = event.target.value.trim().toLowerCase();
      const filteredData = data.filter(obj =>
        Object.keys(obj).some(key => obj[key].toString().toLowerCase().indexOf(searchKey) !== -1)
      );
      this.setState({
        filteredData
      })
    }

    toggleUserList() {
      this.setState({
        hoverIndex: 0,
        displayUserList: !this.state.displayUserList
      })
    }

    scrollIntoView(bool) {
      const activeElement = document.getElementsByClassName('user-card--hover');
      const elemntContainer = document.getElementsByClassName('list-container');
      let topPosition;
      if (activeElement.length) {
        topPosition = bool ?
          (activeElement[0].nextElementSibling ? activeElement[0].nextElementSibling.offsetTop : null) :
          (activeElement[0].previousElementSibling ? activeElement[0].previousElementSibling.offsetTop : null)
      }
      if (topPosition) {
        elemntContainer[0].scrollTop = topPosition - elemntContainer[0].clientHeight;
      }
    }

    onKeyDown(event) {
      switch (event.keyCode) {
        case UPWARD_ARROW: {
          this.setState({
            hoverIndex: this.state.hoverIndex > 0 ? this.state.hoverIndex  - 1 : 0
          })
          this.scrollIntoView(0);
          break;
        }
        case DOWNWARD_ARROW: {
          this.setState({
            hoverIndex: this.state.hoverIndex < this.state.filteredData.length - 1 ? this.state.hoverIndex + 1 : this.state.filteredData.length -1
          })
          this.scrollIntoView(1);
          break;
        }
        default: break;
      }
    }

    onHover(hoverIndex) {
      this.setState({
        hoverIndex
      })
    }

    onBlur() {
      this.setState({
        hoverIndex: 0,
        displayUserList: false
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          searchUsers={this.searchUsers}
          patientData={this.state.filteredData}
          toggleUserList={this.toggleUserList}
          onKeyDown={this.onKeyDown}
          onHover={this.onHover}
          onBlur={this.onBlur}/>
      );
    }
  }

  return SeachBoxWrapper;
}

export default SearchBoxHOC;
