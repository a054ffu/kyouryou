import SearchBox from '../components/Atoms/SearchBox';
import Button from '../components/Atoms/Button';
import ResetButton from '../components/Molecules/ResetButton';
import LogoutButton from '../components/Molecules/LogoutButton';
import { useState, useEffect } from 'react';
import InfoWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Molecules/MapComponent';
import InputField from '../components/Atoms/InputField';
import Modal from '../components/Organisms/Modal';
import axios from 'axios';
import React from 'react';
// import InputExcelButton from '../components/Molecules/inputExcelButton';
import Pulldown from '../components/Atoms/Pulldown';
// import Pulldowns from '../components/Molecules/PullDowns';

axios.defaults.baseURL = 'https://bridge-backend-09fde0d4fb8f.herokuapp.com/';

export default function About() {
  const [searchResult, setSearchResult] = useState('');
  const [bridgedata, setBridgedata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('/getopendata')
      .then((response) => {
        setBridgedata(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました', error);
      });
  }, []);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    setSearchResult(query); // 実際にはAPI呼び出しなどに利用
  };

  const handleButtonClick = () => {
    console.log('Buttonがクリックされました');
    // ボタンがクリックされたときの処理をここに追加
  };

  const handleFilterResults = (results) => {
    console.log(results);
  };

  const handleItemClick = (item) => {
    alert(`You clicked ${item}`);
  };
  return (
    <div>
      <h1>コンポーネント一覧</h1>
      <div style={{ padding: '16px' }}>
        <Pulldown
          text="Pulldown"
          items={['item1', 'item2', 'item3']}
          onItemClick={handleItemClick}
        />
        {/* <Pulldowns /> */}
      </div>
      <div style={{ padding: '16px' }}>
        {/* <InputExcelButton /> */}
        <h1>Search Box Example</h1>
        <SearchBox onSearch={handleSearch} />
        {searchResult && (
          <p>
            Search Result: <strong>{searchResult}</strong>
          </p>
        )}
        <div style={{ padding: '16px' }}>
          {/* Button コンポーネントを追加 */}
          <h1>Button Example</h1>
          <Button onClick={handleButtonClick} text="ボタン"></Button>
        </div>
        <div style={{ padding: '16px' }}>
          <h1>InputField Example</h1>
          <InputField
            title={'ID'}
            label="ここに入力"
            value=""
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div style={{ padding: '16px' }}>
          {/* FilterButton コンポーネントを追加 */}
          <h1>Filter Button Example</h1>
          {/* <FilterButton
            column="Rank"
            value="Ⅱ"
            onResults={handleFilterResults}
            text="Ⅱ"
          /> */}
        </div>
        <div style={{ padding: '16px' }}>
          {/* ResetButton コンポーネントを追加 */}
          <h1>Reset Button Example</h1>
          <ResetButton />
        </div>
        <div style={{ padding: '16px' }}>
          {/* LogoutButton コンポーネントを追加 */}
          <h1>Logout Button Example</h1>
          <LogoutButton />
        </div>
        <div style={{ padding: '16px' }}>
          <h1>ConsoleWindow Example</h1>
          <InfoWindow
            data={{ _id: '123456-78-90', Name: '橋梁名', Id: '37,135' }}
          />
        </div>
        <div style={{ padding: '16px' }}>
          <h1>Map Example</h1>
          <MapConponent data={bridgedata} />
        </div>
        <div style={{ padding: '16px' }}>
          <h1>Modal Example</h1>
          <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
          <Modal
            isOpen={isModalOpen}
            title="モーダルタイトル"
            onClose={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
          >
            <p>モーダルの中身です。</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
