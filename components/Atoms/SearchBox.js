import React, { useState } from 'react';
// 検索ボックスコンポーネント
const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ここに検索してEnter"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ justifyContent: 'center', width: '300px', height: '30px' }}
      />
      <button
        onClick={handleSearch}
        style={{
          height: '36px',
          backgroundColor: '#c9fdd7',
          color: '#8c7676',
          outline: '#99f0ca',
        }}
      >
        検索
      </button>
    </div>
  );
};

export default SearchBox;
