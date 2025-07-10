import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.css';
import HomeButton from '../components/Molecules/HomeButton';
import api from '../utils/api';

// 履歴に表示する項目のリスト
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

/**
 * 個々の履歴アイテムを表示するコンポーネント
 */
const HistoryItem = ({ item, currentDataMap }) => {
  // 操作が 'PUT' (更新) の場合に比較表示を行う
  if (item.operation === 'PUT') {
    const dataBefore = item.data ?? {};
    // 変更後のデータは、現在の最新のデータを参照する
    const dataAfter = currentDataMap[dataBefore._id] ?? {};

    return (
      <div className={styles.historyItem}>
        <hr />
        <p className={styles.textStyle}>
          <strong>操作:</strong> {item.operation}
          <span style={{ marginLeft: '20px' }}>
            <strong>操作ユーザー:</strong> {item.user?.username || '不明'}
          </span>
          <span style={{ float: 'right' }}>
            <strong>日時:</strong>{' '}
            {new Date(item.timestamp).toLocaleString('ja-JP')}
          </span>
        </p>

        <div className={styles.tableContainer}>
          {/* 比較テーブルのヘッダー */}
          <div className={styles.row}>
            <div className={styles.label}>項目</div>
            <div className={styles.cellHeader}>変更前</div>
            <div className={styles.cellHeader}>変更後</div>
          </div>

          {/* 各項目を比較して表示 */}
          {fieldsToDisplay.map(([key, label]) => {
            const valueBefore = dataBefore[key] ?? '―';
            const valueAfter = dataAfter[key] ?? '―';
            // 変更前と後で値が異なる場合に diff スタイルを適用
            const isDifferent = String(valueBefore) !== String(valueAfter);

            return (
              <div className={styles.row} key={key}>
                <div className={styles.label}>{label}</div>
                <div
                  className={`${styles.cell} ${isDifferent ? styles.diff : ''}`}
                >
                  {String(valueBefore)}
                </div>
                <div
                  className={`${styles.cell} ${isDifferent ? styles.diff : ''}`}
                >
                  {String(valueAfter)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 'POST' (新規作成) または 'DELETE' (削除) の場合の表示
  return (
    <div className={styles.historyItem}>
      <hr />
      <p className={styles.textStyle}>
        <strong>操作:</strong> {item.operation}
        <span style={{ marginLeft: '20px' }}>
          <strong>操作ユーザー:</strong> {item.user?.username || '不明'}
        </span>
        <span style={{ float: 'right' }}>
          <strong>日時:</strong>{' '}
          {new Date(item.timestamp).toLocaleString('ja-JP')}
        </span>
      </p>
      <div className={styles.tableContainer}>
        {fieldsToDisplay.map(([key, label]) => (
          <div className={styles.row} key={key}>
            <div className={styles.label}>{label}</div>
            {/* 1列で内容を表示 */}
            <div className={`${styles.cell} ${styles.fullWidthCell}`}>
              {String(item.data[key] ?? '―')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 修正履歴ページ全体
 */
const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [currentDataMap, setCurrentDataMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryAndCurrentData = async () => {
      try {
        // 履歴データと、比較対象となる最新の橋梁データを両方取得
        const [historyRes, currentDataRes] = await Promise.all([
          api.get('/gethistory'),
          api.get('/getopendata'),
        ]);

        const sortedHistory = historyRes.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setHistoryData(sortedHistory);

        // 最新の橋梁データをIDをキーにしたマップ形式に変換し、比較しやすくする
        const map = {};
        currentDataRes.data.forEach((item) => {
          map[item._id] = item;
        });
        setCurrentDataMap(map);
      } catch (err) {
        console.error('データの取得に失敗しました', err);
        setError('データの取得に失敗しました。');
      }
    };

    fetchHistoryAndCurrentData();
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
          historyData.map((item) => (
            <HistoryItem
              key={item._id}
              item={item}
              currentDataMap={currentDataMap}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
