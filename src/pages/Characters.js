import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfiniteScroll, List, Selector, Loading, Toast, Modal } from 'antd-mobile';
import { UndoOutline } from 'antd-mobile-icons';
import CharacterItem from '../components/CharacterItem';
import { StyledCharacters, StyledEmpty, StyledFilters, StyledButton } from '../styles/StyledComp';

const filterTypes = [
  { label: '생존인물만', value: 'isAlive', trueCheck: (c) => c.died === '' },
  { label: '여자만', value: 'isFemale', trueCheck: (c) => c.gender === 'Female' },
  { label: 'tvSeries 없음', value: 'hasNoTvSeries', trueCheck: (c) => c.tvSeries.join('').trim().length === 0 },
];

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startPage = parseInt(searchParams.get('page'));
  const [currPage, setCurrPage] = useState(isNaN(startPage) ? 1 : startPage);
  const [characters, setCharacters] = useState([]);
  const [deletedCharacters, setDeletedCharacters] = useState([]); //삭제 요청된 캐릭터들. 캐릭터의 url값을 가집니다.
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getCharacters = useCallback(async (page) => {
    try {
      const res = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`);
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e);
      Toast.show({ content: '데이터를 받아오는데 문제가 발생했습니다.', position: 'top' });
    }
  }, []);

  useEffect(() => {
    //초기 페이지에 대한 캐릭터 리스트 요청
    async function loadCharacters() {
      const characters = await getCharacters(currPage);
      setCharacters((c) => [...c, ...characters]);
    }
    setIsLoading(true);
    loadCharacters();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // 선택한 필터 종류가 변경되었거나, 데이터 추가 요청 시 실행
    // 캐릭터를 추가로 불러온 경우에도 현재 선택된 필터 및 삭제된 캐릭터가 유지되도록
    const filter = filterTypes.filter((obj) => selectedFilters.includes(obj.value));
    const filtered = characters.filter((character) => {
      // 삭제된 캐릭터일 경우 필터 리스트에서 제외
      if (deletedCharacters.includes(character.url)) return false;
      // 선택된 필터의 모든 조건을 만족하는 캐릭터만 보여준다.
      return filter.map((obj) => obj.trueCheck(character)).every((v) => v);
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
          // 1. deletedCharacters에 삭제되는 캐릭터 url(primary Key)추가
          // 2. 화면의 보여지고 있는 캐릭터 리스트에서 선택된 캘릭더 필터 후 업데이트
          setDeletedCharacters((dc) => [...dc, item.url]);
          const filteredList = filteredCharacters.filter((data) => data.url !== item.url);
          setFilteredCharacters(filteredList);
        },
      });
    },
    [filteredCharacters],
  );

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    const nextPage = currPage + 1;

    setIsLoading(true);
    const newCharacters = await getCharacters(nextPage);
    setHasMore(newCharacters.length > 0);
    if (newCharacters.length > 0) {
      setCurrPage(nextPage);
      setCharacters((c) => [...c, ...newCharacters]);
    }
    setIsLoading(false);
  }, [isLoading, currPage, getCharacters]);

  return (
    <StyledCharacters>
      <StyledFilters>
        <Selector options={filterTypes} multiple={true} value={selectedFilters} onChange={(arr) => setSelectedFilters(arr)} />
        <StyledButton
          onClick={() => {
            setSelectedFilters([]);
            setDeletedCharacters([]);
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
