import React from 'react';
import HeaderText from './HeaderText';
import TopPanelResult from './TopPanelResult';

const TopPanel = () => {
  return (
    <div>
      <HeaderText textString="482 results" opacity="75"/>
      <TopPanelResult img="pin" text="Pin tab" desc="Pin the current tab" />
    </div>
  )
}

export default TopPanel