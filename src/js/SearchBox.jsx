import PropTypes from 'prop-types';
import React from 'react';
import SearchBoxHOC from './SearchBoxHOC.jsx';
import UserCard from './UserCard.jsx';

const SearchBox = ({
  patientData,
  searchUsers,
  displayUserList,
  highlightKeyword,
  hoverIndex,
  onKeyDown,
  onHover,
  toggleUserList,
  onBlur }) => {
  return (
    <div>
      <input
        placeholder='Search users by ID, address, name, pincode, items'
        className='search'
        onChange={searchUsers}
        onClick={toggleUserList}
        onKeyDown={onKeyDown}
        onBlur={onBlur} />
      <UserCard
        patientData={patientData}
        displayUserList={displayUserList}
        hoverIndex={hoverIndex}
        onHover={onHover}/>
    </div>
  );
}

SearchBox.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  patientData: PropTypes.array.isRequired,
  displayUserList: PropTypes.bool.isRequired,
  hoverIndex: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  toggleUserList: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default SearchBoxHOC(SearchBox);
