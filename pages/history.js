import React, { useState, useEffect } from 'react';
import Home from './main';
import styles from '../styles/main.module.css';
import HomeButton from '../components/Molecules/HomeButton';
import axios from 'axios';

axios.defaults.baseURL = 'https://bridge-backend-09fde0d4fb8f.herokuapp.com/';

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    axios
      .get('/gethistory')
      .then((response) => {
        setHistoryData(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました', error);
      });
  }, []);

  return (
    <div className={styles.allHistory}>
      <div className={styles.fixedHeader}>
        <h1 className={styles.header}>修正履歴</h1>
        <HomeButton />
      </div>
      <div className={styles.content}>
        {historyData.map((item, index) => (
          <div key={index}>
            <hr className={styles.horizontalLine} />
            <p className={styles.textStyle}>
              <strong>修正方法:</strong> {item.operation}
            </p>
            <p className={styles.textStyle}>
              <strong>ID:</strong> {item.data._id}
            </p>
            <p className={styles.textStyle}>
              <strong>管理事務所:</strong> {item.data.Inspector}
            </p>
            <p className={styles.textStyle}>
              <strong>電話番号:</strong> {item.data.Tel}
            </p>
            <p className={styles.textStyle}>
              <strong>緯度経度:</strong> {item.data.Id}
            </p>
            <p className={styles.textStyle}>
              <strong>名前:</strong> {item.data.Name}
            </p>
            <p className={styles.textStyle}>
              <strong>ﾅﾏｴ:</strong> {item.data.Kana}
            </p>
            <p className={styles.textStyle}>
              <strong>道路:</strong> {item.data.Road}
            </p>
            <p className={styles.textStyle}>
              <strong>住所:</strong> {item.data.address}
            </p>
            <p className={styles.textStyle}>
              <strong>橋の形式:</strong> {item.data.Keisiki}
            </p>
            <p className={styles.textStyle}>
              <strong>建設年度:</strong> {item.data.birth}
            </p>
            <p className={styles.textStyle}>
              <strong>橋の長さ:</strong> {item.data.length}
            </p>
            <p className={styles.textStyle}>
              <strong>橋の幅:</strong> {item.data.width}
            </p>
            <p className={styles.textStyle}>
              <strong>使用用途:</strong> {item.data.HowUse}
            </p>
            <p className={styles.textStyle}>
              <strong>点検年度:</strong> {item.data.Date}
            </p>
            <p className={styles.textStyle}>
              <strong>健全度:</strong> {item.data.Rank}
            </p>
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
        ))}
      </div>
    </div>
  );
};
export default History;
