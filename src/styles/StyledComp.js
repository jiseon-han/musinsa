import styled from 'styled-components';
import { List, Empty, Button } from 'antd-mobile';

const COLORS = {
  black: '#000',
  blue: '#0379FF',
};

export const StyledCharacters = styled.div`
  background: #eee;
  padding: 10px;
  height: 100%;
  min-height: calc(100vh - 58px); /* 58px = header : 38px , padding: 20px */
`;

export const StyledFilters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & .adm-selector {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    flex-wrap: nowrap;
    align-items: center;
    padding-right: 15px;
    & .adm-space-wrap {
      flex-wrap: inherit;
      overflow: auto;
    }
  }

  & .adm-selector-item {
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 14px;
    color: #aaa;
    background: #fff;
  }
  & .adm-selector-item-active,
  .adm-selector-item-multiple-active {
    border-color: #000;
    font-weight: 700;
    color: #000;
  }
  & .adm-selector-item .adm-selector-check-mark-wrapper {
    display: none;
  }
`;

export const StyledListItem = styled(List.Item)`
  display: grid;
  background: #fff;
  & .adm-list-item-content-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .data-wrapper {
    width: 90%;
    & .one-line {
      display: flex;
    }
  }
  & svg {
    width: 10%;
    height: 22px;
  }
`;

export const StyledItemBox = styled.div`
  position: relative;
  padding: 7px 5px 0px 0px;
  margin-top: 15px;
  height: 25px;
  width: 100%;
  &::before {
    content: '${(p) => p.title}';
    font-size: 12px;
    color: grey;
    position: absolute;
    top: -5px;
  }
`;

export const StyledEmpty = styled(Empty)`
  background: #fff;
  min-height: calc(100vh - 160px);
`;

export const StyledButton = styled(Button)`
  white-space: nowrap;
`;
