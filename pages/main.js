import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
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
import Pulldowns from '../components/Molecules/Pulldowns';
import HistoryButton from '../components/Molecules/HistoryButton';
import NotificationPopup from '../components/Atoms/NotificationPopup';

export default function Home() {
  const router = useRouter();
  const [bridgedata, setBridgedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const selectedMarkerRef = useRef(selectedMarker);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [changes, setChanges] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    selectedMarkerRef.current = selectedMarker;
  }, [selectedMarker]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      router.push('/');
      return;
    }
    setUsername(currentUser.username);

    api
      .get('/getopendata')
      .then((response) => {
        setBridgedata(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました', error);
      });

    const checkNotifications = async () => {
      const notificationCheckTime = localStorage.getItem(
        'notificationCheckTime'
      );
      console.log('[Debug] Notification Check Time:', notificationCheckTime);

      if (notificationCheckTime && currentUser) {
        localStorage.removeItem('notificationCheckTime');

        try {
          const response = await api.get('/gethistory');
          console.log('[Debug] Full history response:', response.data);

          const recentChangesByOthers = response.data.filter((item) => {
            const isOtherUser = item.user && item.user._id !== currentUser.id;
            const previousLoginDate = new Date(notificationCheckTime);
            const itemDate = new Date(item.timestamp);
            const isRecent = itemDate > previousLoginDate;

            // ★ 比較している実際の時刻をログに出力
            console.log(
              `[Debug] Comparing: itemDate (${itemDate.toISOString()}) > previousLoginDate (${previousLoginDate.toISOString()}) ==> ${isRecent}`
            );

            return isOtherUser && isRecent;
          });

          console.log(
            '[Debug] Filtered changes by others:',
            recentChangesByOthers
          );

          if (recentChangesByOthers.length > 0) {
            console.log('[Debug] Setting popup to show.');
            setChanges(recentChangesByOthers);
            setShowPopup(true);
          } else {
            console.log('[Debug] No new changes by other users found.');
          }
        } catch (error) {
          console.error('変更履歴の取得に失敗しました', error);
        }
      } else {
        console.log(
          '[Debug] No notification check time found. Skipping notification check.'
        );
      }
    };

    checkNotifications();
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
      await api.delete(`/deleteopendata/${marker._id}`);
      setSelectedMarker(null);
      alert('削除に成功しました');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('削除中にエラーが発生しました');
    }
  };

  const handleAddConfilmButtonClick = async (data) => {
    const isConfirmed = window.confirm('本当に追加しますか？');
    if (!isConfirmed) return;
    try {
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
      {showPopup && (
        <NotificationPopup
          changes={changes}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className={styles.all}>
        <div className={styles.headerContainer}>
          <div className={styles.up}>
            <h1 className={styles.header}>橋梁情報管理システム</h1>
            <div className={styles.userInfo}>こんにちは、{username}さん</div>
            <SearchBox onSearch={handleSearch} />
            <div className={styles.Num}>
              <NumberOfPins count={filteredData.length} />
            </div>
            <div className={styles.button} />
            <ResetButton />
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
