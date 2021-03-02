import React from 'react';

var AddToLooksCard = function(props) {
  return (
    <div ref={props.refer} className='AddToLooksCard'>
      <div className='AddToLooksCard-Icon'>+</div>
      <p className='AddToLooksCard-p'>Add Current Item to Your Looks</p>
    </div>
  )
}

export default AddToLooksCard;