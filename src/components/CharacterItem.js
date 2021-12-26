import React from 'react';
import { StyledListItem, StyledItemBox } from '../styles/StyledComp';
import { Ellipsis } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';

const CharacterItem = (props) => {
  const { name, aliases, titles, books, tvSeries } = props.data;
  return (
    <StyledListItem>
      <div className="data-wrapper">
        <div className="one-line">
          <StyledItemBox title="name">
            <Ellipsis direction="end" content={name} />
          </StyledItemBox>
          <StyledItemBox title="aliases">
            <Ellipsis direction="end" content={aliases?.join(', ')} />
          </StyledItemBox>
        </div>
        <StyledItemBox title="title">
          <Ellipsis direction="end" content={titles?.join(', ')} />
        </StyledItemBox>
        <div className="one-line">
          <StyledItemBox title="books">{books?.length}</StyledItemBox>
          <StyledItemBox title="tvSeries">{tvSeries?.length}</StyledItemBox>
        </div>
      </div>
      <DeleteOutline color="var(--adm-color-danger)" onClick={props.onDelete} />
    </StyledListItem>
  );
};

export default CharacterItem;
