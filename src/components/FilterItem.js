import React from 'react';
import { StyledListItem, StyledItemBox } from '../styles/StyledComp';
import { Switch } from 'antd-mobile';

const FilterItem = ({ checkedText, uncheckedText, onChange }) => {
  return <Switch checkedText={checkedText} uncheckedText={uncheckedText} />;
};

export default FilterItem;
