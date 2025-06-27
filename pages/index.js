import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api'; // ★ 修正: axiosの代わりにapiヘルパーをインポート

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください。');
      return;
    }

    try {
      // ★ 修正: apiヘルパーを使用してリクエストを送信
      const response = await api.post('/api/auth/login', {
        username,
        password,
      });

      console.log('ログイン成功:', response.data);

      // トークンとユーザー情報をlocalStorageに保存
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 前回ログイン時刻を記録
      localStorage.setItem('lastLogin', new Date().toISOString());

      router.push('/main');

    } catch (err) {
      console.error('ログインエラー:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('サーバーからの応答がありません。');
      } else {
        setError('ログイン中にエラーが発生しました。');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>橋梁情報管理システム</h1>
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>
            ユーザー名:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            パスワード:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          ログイン
        </button>
      </form>
      <button
        type="button"
        style={{ ...styles.button, marginTop: '20px', backgroundColor: '#e0e0e0' }}
        onClick={() => router.push('/signup')}
      >
        新規アカウント登録
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fdffe7',
    color: '#8c7676',
  },
  title: {
    marginBottom: '30px',
    fontSize: '3em',
    marginTop: '-50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '250px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#c9fdd7',
    color: '#8c7676',
    border: 'none',
    borderRadius: '5px',
    outline: '1px solid #99f0ca',
    cursor: 'pointer',
    minWidth: '150px',
  },
};

export default LoginPage;
