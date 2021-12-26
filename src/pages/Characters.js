import React, { useState, useEffect } from 'react';
import { InfiniteScroll, List, Selector, Button, Loading } from 'antd-mobile';
import { UndoOutline } from 'antd-mobile-icons';
import { getDemo } from '../demoApi';
import CharacterItem from '../components/CharacterItem';
import { StyledCharacters, StyledFilters } from '../styles/StyledComp';

const filters = [
  { label: '생존인물만', value: 'isAlive' },
  { label: '여자만', value: 'isFemale' },
  { label: 'tvSeries 없음', value: 'hasNoTvSeries' },
];

const Characters = () => {
  const [currPage, setCurrPage] = useState(1); //TODO: params에서 페이지 받아오기
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  async function getCharacters(page) {
    try {
      // const res = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`);
      // const json = await res.json();

      const json = await getDemo(page);

      // delay 처리
      setTimeout(() => {
        setCharacters([...characters, ...json]);
        setHasMore(true);
      }, 2000);
    } catch (e) {
      //TODO: error 처리
      console.log(e);
    }
  }

  useEffect(() => {
    console.log('page changed : ', currPage);
    // getCharacters(currPage);
  }, [currPage]);

  useEffect(() => {
    //characters는 데이터 추가될 때만 변경되므로
    //filteredCharacters에 추가된 데이터 및 list filter해서 추가
    const filter = selectedFilters.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
    const filtered = characters.filter((character) => {
      let returnV = true;
      if (filter.isAlive) returnV = character.died === '';
      if (filter.isFemale) returnV = character.gender === 'Female';
      if (filter.hasNoTvSeries) returnV = character.tvSeries.length === 0;
      return returnV;
    });
    setFilteredCharacters(filtered);
  }, [characters, selectedFilters]);

  const onDelete = (item) => {
    const filteredList = filteredCharacters.filter((data) => data.url !== item.url);
    console.log(filteredList);
    setFilteredCharacters(filteredList);
  };

  const loadMore = async () => {
    console.log('loadMore');
    setHasMore(false);
    await getCharacters(currPage);
    setCurrPage(currPage + 1);
  };

  return (
    <StyledCharacters>
      <div className="filter">{/* filter */}</div>
      <div className="characters">
        {/* characters List */}
        <StyledFilters>
          <Selector options={filters} multiple={true} value={selectedFilters} onChange={(arr) => setSelectedFilters(arr)} />
          <Button
            onClick={() => {
              setSelectedFilters([]);
              setFilteredCharacters(characters);
            }}>
            <UndoOutline /> 초기화
          </Button>
        </StyledFilters>

        <List>
          {filteredCharacters.map((data, idx) => (
            <CharacterItem key={idx} data={data} onDelete={() => onDelete(data)} />
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          <span>Loading</span>
          <Loading />
        </InfiniteScroll>
      </div>
    </StyledCharacters>
  );
};
export default Characters;
