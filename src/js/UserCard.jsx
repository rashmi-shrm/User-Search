import PropTypes from 'prop-types';
import React, {Component} from 'react';
import cx from 'classnames';

const UserCard = ({ patientData, displayUserList, hoverIndex, onHover }) => {
  if (!displayUserList) return null;
  if (!patientData.length) {
    return (
      <div className='list-container'>
        <div className='user-card'>No User Found</div>
      </div>
    );
  }
  return (
    <div className='list-container' id='test_container'>
      {
        patientData.map((data, index) => {
        return (    
          <div
            key={index}
            className={cx('user-card list', {
              'user-card--hover': index === hoverIndex
            })}
            id={data.id}
            onMouseOver={() => onHover(index)}
            onClick={x => x} >
            <div>{data.id}</div>
            <div>{data.name}</div>
            <div>{data.address}</div>
            <div>{data.pincode}</div>
            {
              data.items.length ?
              <div>
                <div>Your items : </div>
                {
                  data.items.map((item, index) => {
                    return (
                      <span key={index}>{item}{index !== data.items.length - 1 ? ', ' : '' }</span>
                    );
                  })
                }
              </div> : null
            }
          </div>
        );
      })
    }
  </div>
  );
}

UserCard.propTypes = {
  patientData: PropTypes.array.isRequired,
  displayUserList: PropTypes.bool.isRequired,
  hoverIndex: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired
};

export default UserCard;
