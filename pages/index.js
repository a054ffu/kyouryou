import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
<<<<<<< HEAD
    // async を追加
=======
>>>>>>> a3755153b18f213484fb891de0f8d4915c16fb92
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください。');
      return;
    }

    try {
<<<<<<< HEAD
      // バックエンドのログインAPIを呼び出す
      // 実際のAPIエンドポイントに合わせてURLを調整してください
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          username,
          password,
        }
      );
=======
      // --- ★ここからデバッグログを追加 ---
      console.log(`[Login Debug] 1. Attempting login for user: "${username}"`);

      const rawTimestamps = localStorage.getItem('loginTimestamps');
      console.log(
        '[Login Debug] 2. Raw loginTimestamps from localStorage:',
        rawTimestamps
      );

      const loginTimestamps = JSON.parse(rawTimestamps) || {};
      console.log(
        '[Login Debug] 3. Parsed loginTimestamps object:',
        loginTimestamps
      );

      const previousLoginTime = loginTimestamps[username];
      console.log(
        `[Login Debug] 4. Retrieved previous login time for "${username}":`,
        previousLoginTime
      );

      if (previousLoginTime) {
        console.log(
          '[Login Debug] 5. Previous login time found. Setting notificationCheckTime.'
        );
        localStorage.setItem('notificationCheckTime', previousLoginTime);
      } else {
        console.log(
          '[Login Debug] 5. No previous login time found for this user.'
        );
      }
      // --- ★ここまでデバッグログ ---

      const response = await api.post('/api/auth/login', {
        username,
        password,
      });
>>>>>>> a3755153b18f213484fb891de0f8d4915c16fb92

      console.log('ログイン成功:', response.data);

<<<<<<< HEAD
      // ログイン後のリダイレクト先を決定
      // 例: バックエンドがユーザー種別を返す場合
      // if (response.data.userType === 'admin') {
      //   router.push('/main');
      // } else {
      //   router.push('/userpage');
      // }
      // 今回は一律で /main にリダイレクトします
=======
      // このユーザーの最終ログイン時刻を更新
      loginTimestamps[username] = new Date().toISOString();
      localStorage.setItem('loginTimestamps', JSON.stringify(loginTimestamps));
      console.log(
        '[Login Debug] 6. Saved updated loginTimestamps:',
        localStorage.getItem('loginTimestamps')
      );

      // トークンとユーザー情報を保存
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

>>>>>>> a3755153b18f213484fb891de0f8d4915c16fb92
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
        style={{
          ...styles.button,
          marginTop: '20px',
          backgroundColor: '#e0e0e0',
        }}
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
<<<<<<< HEAD
    display: 'block', // ラベルをブロック要素にして改行
    textAlign: 'left', // ラベルを左寄せ
    width: '100%', // 幅をinputに合わせる
=======
    display: 'block',
    textAlign: 'left',
    width: '100%',
>>>>>>> a3755153b18f213484fb891de0f8d4915c16fb92
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
