import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfiniteScroll, List, Selector, Loading, Toast, Modal } from 'antd-mobile';
import { UndoOutline } from 'antd-mobile-icons';
import CharacterItem from '../components/CharacterItem';
import { StyledCharacters, StyledEmpty, StyledFilters, StyledButton } from '../styles/StyledComp';

const filters = [
  { label: '생존인물만', value: 'isAlive' },
  { label: '여자만', value: 'isFemale' },
  { label: 'tvSeries 없음', value: 'hasNoTvSeries' },
];

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startPage = parseInt(searchParams.get('page'));
  const [currPage, setCurrPage] = useState(isNaN(startPage) ? 1 : startPage);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getCharacters = useCallback(async (page) => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`);
      const json = await res.json();

      setCharacters((c) => [...c, ...json]);
      setIsLoading(false);

      return json;
    } catch (e) {
      console.log(e);
      Toast.show({ content: '데이터를 받아오는데 문제가 발생했습니다.', position: 'top' });
    }
  }, []);

  useEffect(() => {
    //초기 페이지에 대한 캐릭터 리스트 요청
    getCharacters(currPage);
  }, []);

  useEffect(() => {
    //characters는 데이터 추가될 때만 변경되므로
    //filteredCharacters에 추가된 데이터 및 list filter해서 추가
    const filter = selectedFilters.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
    const filtered = characters.filter((character) => {
      let returnV = true;
      if (filter.isAlive) returnV = character.died === '';
      if (filter.isFemale) returnV = character.gender === 'Female';
      if (filter.hasNoTvSeries) returnV = character.tvSeries.join('').trim().length === 0;
      return returnV;
    });
    setFilteredCharacters(filtered);
  }, [characters, selectedFilters]);

  const onDelete = useCallback(
    (item) => {
      Modal.confirm({
        content: '정말 삭제하시겠습니까?',
        confirmText: '삭제',
        cancelText: '취소',
        onConfirm: () => {
          const filteredList = filteredCharacters.filter((data) => data.url !== item.url);
          setFilteredCharacters(filteredList);
        },
      });
    },
    [filteredCharacters],
  );

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    const newCharacters = await getCharacters(currPage);
    setHasMore(newCharacters.length > 0);
    if (newCharacters.length > 0) {
      setCurrPage(currPage + 1);
    }
  }, [isLoading, currPage, getCharacters]);

  return (
    <StyledCharacters>
      <StyledFilters>
        <Selector options={filters} multiple={true} value={selectedFilters} onChange={(arr) => setSelectedFilters(arr)} />
        <StyledButton
          onClick={() => {
            setSelectedFilters([]);
            setFilteredCharacters(characters);
          }}>
          <UndoOutline /> 초기화
        </StyledButton>
      </StyledFilters>
      <List>
        {filteredCharacters.map((data, idx) => (
          <CharacterItem key={idx} data={data} onDelete={() => onDelete(data)} />
        ))}
      </List>
      {filteredCharacters.length === 0 && !isLoading ? (
        <StyledEmpty description="결과가 없습니다." />
      ) : (
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={50}>
          {hasMore ? (
            <>
              <span>Loading</span>
              <Loading />
            </>
          ) : (
            <span>모든 캐릭터를 불러왔습니다.</span>
          )}
        </InfiniteScroll>
      )}
    </StyledCharacters>
  );
};
export default Characters;
