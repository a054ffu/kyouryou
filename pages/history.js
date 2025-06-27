import React, { useState, useEffect } from 'react';
import styles from '../styles/main.module.css';
import HomeButton from '../components/Molecules/HomeButton';
import api from '../utils/api'; // ★ apiヘルパーを使用

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
  // ★ PUT操作の前の状態は、履歴データ自体に保存されているべきですが、
  // 現在の実装では`logHistory("PUT", existingData)`となっているため、
  // 変更「前」のデータが`item.data`に入っています。
  // そのため、ここでは`originalDataMap`を直接は使いません。
  // （バックエンドのロジックが変更された場合は、この部分の再検討が必要です）
  const before = item.operation === 'PUT' ? item.data : {};
  const isPut = item.operation === 'PUT';

  return (
    <div className={styles.historyItem}>
      <hr className={styles.horizontalLine} />
      <p className={styles.textStyle}>
        <strong>修正方法:</strong> {item.operation}
        {/* ★ ユーザー名を表示 */}
        <span style={{ marginLeft: '20px' }}>
          <strong>操作ユーザー:</strong> {item.user?.username || '不明'}
        </span>
      </p>

      {/* ... 既存のテーブル表示ロジックは大きな変更なし ... */}
      {/* ただし、PUT時の表示ロジックはバックエンドの実装に依存します */}
      <div className={styles.tableContainer}>
        {fieldsToDisplay.map(([key, label]) => (
          <div className={styles.row} key={key}>
            <div className={styles.label}>{label}</div>
            {/* 全ての操作で現在のデータ(after)を表示するのがシンプルで分かりやすい */}
            <div className={styles.cell}>{after[key] ?? '―'}</div>
          </div>
        ))}
      </div>

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // ★ apiヘルパーを使用
        const historyRes = await api.get('/gethistory');
        setHistoryData(historyRes.data);
      } catch (err) {
        console.error('データの取得に失敗しました', err);
        setError('データの取得に失敗しました。');
      }
    };

    fetchHistory();
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
            // originalDataMapは現在不要なため削除
            <HistoryItem key={item._id + item.timestamp} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default History;
