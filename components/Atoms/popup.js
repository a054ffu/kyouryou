import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://bridge-backend-09fde0d4fb8f.herokuapp.com/';

const NotificationPopup = ({ changes, onClose }) => {
  return (
    <div style={popupStyles.container}>
      <div style={popupStyles.content}>
        <h2>変更された情報</h2>
        <ul>
          {changes.map((change, index) => (
            <li key={index}>
              <strong>ID:</strong> {change._id} が変更されました。
            </li>
          ))}
        </ul>
        <button style={popupStyles.button} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [changes, setChanges] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        // 前回ログイン時刻を取得（例: ローカルストレージから）
        const lastLogin =
          localStorage.getItem('lastLogin') || new Date().toISOString();

        // 今回のログイン時刻を保存
        const currentLogin = new Date().toISOString();
        localStorage.setItem('lastLogin', currentLogin);

        // サーバーから変更履歴を取得
        const response = await axios.get('/gethistory');
        const recentChanges = response.data.filter(
          (item) => new Date(item.timestamp) > new Date(lastLogin)
        );

        if (recentChanges.length > 0) {
          setChanges(recentChanges);
          setShowPopup(true);
        }
      } catch (error) {
        console.error('変更履歴の取得に失敗しました', error);
      }
    };

    fetchChanges();
  }, []);

  return (
    <div>
      <h1>アプリケーション</h1>
      {showPopup && (
        <NotificationPopup
          changes={changes}
          onClose={() => setShowPopup(false)}
        />
      )}
      )}
    </div>
  );
};

// ポップアップのスタイル
const popupStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default App;
