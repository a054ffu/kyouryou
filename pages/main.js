import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'; // ★ useRouterをインポート
import api from '../utils/api'; // ★ axiosの代わりにapiヘルパーをインポート
import SearchBox from '../components/Atoms/SearchBox';
import ResetButton from '../components/Molecules/ResetButton';
import LogoutButton from '../components/Molecules/LogoutButton';
import ConsoleWindow from '../components/Atoms/ConsoleWindow';
import MapConponent from '../components/Molecules/MapComponent';
import Button from '../components/Atoms/Button';
import AddModal from '../components/Templates/AddModal';
import EditModal from '../components/Templates/EditModal';
import styles from '../styles/main.module.css';
import NumberOfPins from '../components/Atoms/NumberOfPins';
import TonnelButton from '../components/Molecules/TonnelButton';
import Pulldowns from '../components/Molecules/Pulldowns';
import HistoryButton from '../components/Molecules/HistoryButton';
import NotificationPopup from '../components/Atoms/NotificationPopup'; // ★ パスを修正

export default function Home() {
  const router = useRouter(); // ★ useRouterフックを呼び出す
  const [bridgedata, setBridgedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const selectedMarkerRef = useRef(selectedMarker);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ★ 通知機能用のState
  const [changes, setChanges] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    selectedMarkerRef.current = selectedMarker;
  }, [selectedMarker]);

  useEffect(() => {
    // ★ ログインユーザー情報を取得
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      // ログインしていなければログインページにリダイレクト
      router.push('/');
      return;
    }

    // 橋梁データを取得
    api.get('/getopendata')
      .then((response) => {
        setBridgedata(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました', error);
      });

    // ★ 変更通知のロジック
    const fetchChanges = async () => {
      try {
        const lastLogin = localStorage.getItem('lastLogin');
        if (!lastLogin) return;

        const response = await api.get('/gethistory');

        // 他のユーザーによる、前回ログイン以降の変更をフィルタリング
        const recentChangesByOthers = response.data.filter(
          (item) =>
            item.user &&
            item.user._id !== currentUser.id &&
            new Date(item.timestamp) > new Date(lastLogin)
        );

        if (recentChangesByOthers.length > 0) {
          setChanges(recentChangesByOthers);
          setShowPopup(true);
        }
      } catch (error) {
        console.error('変更履歴の取得に失敗しました', error);
      }
    };

    fetchChanges();

  }, []);

  const handleSearch = (query) => {
    const filtered = bridgedata.filter((item) => item.Name.includes(query));
    setFilteredData(filtered);
    if (filtered.length === 0) {
      alert('該当するデータがありません');
    }
  };

  const handleFilter = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handleMarkerClick = (item) => {
    setSelectedMarker(item);
  };

  const handleDeleteButtonClick = async () => {
    const isConfirmed = window.confirm('本当に削除しますか？');
    if (!isConfirmed) return;

    const marker = selectedMarkerRef.current;
    if (!marker || !marker._id) {
      alert('削除する対象が選択されていません');
      return;
    }

    try {
      // ★ apiヘルパーを使用
      await api.delete(`/deleteopendata/${marker._id}`);
      setSelectedMarker(null);
      alert('削除に成功しました');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('削除中にエラーが発生しました');
    }
  };

  // ... useEffect for Delete key (変更なし)

  const handleAddConfilmButtonClick = async (data) => {
    const isConfirmed = window.confirm('本当に追加しますか？');
    if (!isConfirmed) return;
    try {
      // ★ apiヘルパーを使用
      await api.post('/postopendata', data);
      alert('追加に成功しました');
      setIsAddModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('追加中にエラーが発生しました');
    }
  };

  const handleEditButtonClick = async (data) => {
    try {
      // ★ apiヘルパーを使用
      await api.put(`/putopendata/${selectedMarker._id}`, data);
      alert('更新に成功しました');
      setIsEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('更新中にエラーが発生しました');
    }
  };

  return (
    <div>
      {/* ★ 通知ポップアップのレンダリング */}
      {showPopup && (
        <NotificationPopup
          changes={changes}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* ... 既存のJSX ... */}
      <div className={styles.all}>
        <div className={styles.headerContainer}>
          <div className={styles.up}>
            <h1 className={styles.header}>橋梁情報管理システム</h1>
            <SearchBox onSearch={handleSearch} />
            <div className={styles.Num}>
              <NumberOfPins count={filteredData.length} />
            </div>
            <div className={styles.button} />
            <ResetButton />
            <TonnelButton />
            <Button
              onClick={() => setIsAddModalOpen(true)}
              text="新しい橋梁の追加"
            />
            <HistoryButton />
            <LogoutButton />
          </div>
          <div className={styles.down}>
            <Pulldowns data={bridgedata} onFilter={handleFilter} />
          </div>
        </div>
      </div>
      <div className={styles.console}>
        <ConsoleWindow
          data={selectedMarker}
          onDelete={handleDeleteButtonClick}
          onEdit={() => setIsEditModalOpen(true)}
        />
      </div>
      <MapConponent
        data={filteredData}
        selected={selectedMarker}
        onMarkerClick={handleMarkerClick}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCancel={() => setIsAddModalOpen(false)}
        onConfirm={(data) => handleAddConfilmButtonClick(data)}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onCancel={() => setIsEditModalOpen(false)}
        onConfirm={(data) => handleEditButtonClick(data)}
        editData={selectedMarker}
      />
    </div>
  );
}
