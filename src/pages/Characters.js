import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfiniteScroll, List, Selector, Button, Loading } from 'antd-mobile';
import { UndoOutline } from 'antd-mobile-icons';
import { getDemo } from '../demoApi';
import CharacterItem from '../components/CharacterItem';
import { StyledCharacters, StyledEmpty, StyledFilters } from '../styles/StyledComp';

const filters = [
  { label: '생존인물만', value: 'isAlive' },
  { label: '여자만', value: 'isFemale' },
  { label: 'tvSeries 없음', value: 'hasNoTvSeries' },
];

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState(parseInt(searchParams.get('page')) ?? 1);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function getCharacters(page) {
    try {
      // const res = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`);
      // const json = await res.json();

      const json = await getDemo(page);

      setIsLoading(true);
      // delay 처리
      setTimeout(() => {
        setCharacters([...characters, ...json]);
        setHasMore(true);
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      //TODO: error 처리
      console.log(e);
    }
  }

  useEffect(() => {
    //초기 페이지에 대한 캐릭터 리스트 요청
    getCharacters(currPage);
  }, []);
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
      {filteredCharacters.length === 0 && !isLoading ? (
        <StyledEmpty description="결과가 없습니다." />
      ) : (
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          <span>Loading</span>
          <Loading />
        </InfiniteScroll>
      )}
    </StyledCharacters>
  );
};
export default Characters;
