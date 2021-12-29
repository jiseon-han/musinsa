import React from 'react';
import { StyledListItem, StyledItemBox } from '../styles/StyledComp';
import { DeleteOutline } from 'antd-mobile-icons';

const CharacterItem = (props) => {
  const { name, aliases, titles, books, tvSeries } = props.data;
  return (
    <StyledListItem>
      <div className="data-wrapper">
        <div className="one-line">
          <StyledItemBox title="name">
            <p>{name}</p>
          </StyledItemBox>
          <StyledItemBox title="aliases">
            <p>{aliases?.join(', ')}</p>
          </StyledItemBox>
        </div>
        <StyledItemBox title="title">
          <p>{titles?.join(', ')} </p>
        </StyledItemBox>
        <div className="one-line">
          <StyledItemBox title="books">{books?.length}</StyledItemBox>
          <StyledItemBox title="tvSeries">{tvSeries.join('').trim().length > 0 ? tvSeries.length : 0}</StyledItemBox>
        </div>
      </div>
      <DeleteOutline color="var(--adm-color-danger)" onClick={props.onDelete} />
    </StyledListItem>
  );
};

export default CharacterItem;
