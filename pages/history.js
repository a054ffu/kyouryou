import React, { useState, useEffect } from 'react';
import Home from './main';
import styles from '../styles/main.module.css';
import HomeButton from '../components/Molecules/HomeButton';
import axios from 'axios';

axios.defaults.baseURL = 'https://bridge-backend-09fde0d4fb8f.herokuapp.com/';

const fieldsToDisplay = [
  ['_id', 'ID'],
  ['Inspector', '管理事務所'],
  ['Tel', '電話番号'],
  ['Id', '緯度経度'],
  ['Name', '名前'],
  ['Kana', 'ﾅﾏｴ'],
  ['Road', '道路'],
  ['address', '住所'],
  ['Keisiki', '橋の形式'],
  ['birth', '建設年度'],
  ['length', '橋の長さ'],
  ['width', '橋の幅'],
  ['HowUse', '使用用途'],
  ['Date', '点検年度'],
  ['Rank', '健全度'],
];

const HistoryItem = ({ item, originalDataMap }) => {
  const after = item.data ?? {};
  const before = originalDataMap[after._id] ?? {};
  const isPut = item.operation === 'PUT';

  return (
    <div className={styles.historyItem}>
      <hr className={styles.horizontalLine} />
      <p className={styles.textStyle}>
        <strong>修正方法:</strong> {item.operation}
      </p>

      {isPut && before ? (
        <div className={styles.tableContainer}>
          {/* ヘッダー行 */}
          <div className={styles.row}>
            <div className={styles.label}></div>
            <div className={styles.cellHeader}>修正後</div>
            <div className={styles.cellHeader}>修正前</div>
          </div>

          {fieldsToDisplay.map(([key, label]) => {
            const prevValue = before[key] ?? '―';
            const newValue = after[key] ?? '―';
            const isDifferent = prevValue !== newValue;

            return (
              <div className={styles.row} key={key}>
                <div className={styles.label}>{label}</div>
                <div
                  className={`${styles.cell} ${isDifferent ? styles.diff : ''}`}
                >
                  {prevValue}
                </div>
                <div
                  className={`${styles.cell} ${isDifferent ? styles.diff : ''}`}
                >
                  {newValue}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          {fieldsToDisplay.map(([key, label]) => (
            <div className={styles.row} key={key}>
              <div className={styles.label}>{label}</div>
              <div className={styles.cell}>{after[key] ?? '―'}</div>
            </div>
          ))}
        </div>
      )}

      <p className={styles.textStyle}>
        <strong>変更日時:</strong>{' '}
        {new Date(item.timestamp).toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </p>
    </div>
  );
};

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [originalDataMap, setOriginalDataMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryAndOriginals = async () => {
      try {
        const [historyRes, originalRes] = await Promise.all([
          axios.get('/gethistory'),
          axios.get('/getopendata'),
        ]);

        setHistoryData(historyRes.data);

        const map = {};
        originalRes.data.forEach((item) => {
          map[item._id] = item;
        });
        setOriginalDataMap(map);
      } catch (err) {
        console.error('データの取得に失敗しました', err);
        setError('データの取得に失敗しました。');
      }
    };

    fetchHistoryAndOriginals();
  }, []);

  return (
    <div className={styles.allHistory}>
      <div className={styles.fixedHeader}>
        <h1 className={styles.header}>修正履歴</h1>
        <HomeButton />
      </div>

      <div className={styles.content}>
        {error && <p className={styles.error}>{error}</p>}

        {historyData.length === 0 && !error ? (
          <p className={styles.textStyle}>修正履歴はありません。</p>
        ) : (
          historyData.map((item, index) => (
            <HistoryItem
              key={index}
              item={item}
              originalDataMap={originalDataMap}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default History;
