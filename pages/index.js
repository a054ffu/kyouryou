import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // axios をインポート

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // エラーメッセージ用
  const router = useRouter();

  const handleLogin = async (e) => { // async を追加
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください。');
      return;
    }

    try {
      // バックエンドのログインAPIを呼び出す
      // 実際のAPIエンドポイントに合わせてURLを調整してください
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        username,
        password,
      });

      // ログイン成功時の処理
      // バックエンドからのレスポンスに応じて、トークンを保存したり、
      // ユーザー情報を取得したりする処理をここに追加できます。
      console.log('ログイン成功:', response.data);

      // ログイン後のリダイレクト先を決定
      // 例: バックエンドがユーザー種別を返す場合
      // if (response.data.userType === 'admin') {
      //   router.push('/main');
      // } else {
      //   router.push('/userpage');
      // }
      // 今回は一律で /main にリダイレクトします
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
    marginBottom: '30px', // エラーメッセージ表示スペースを考慮
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
    display: 'block', // ラベルをブロック要素にして改行
    textAlign: 'left', // ラベルを左寄せ
    width: '100%',     // 幅をinputに合わせる
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '250px', // 幅を調整
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#c9fdd7',
    color: '#8c7676',
    border: 'none',
    borderRadius: '5px',
    outline: '1px solid #99f0ca',
    cursor: 'pointer',
    minWidth: '150px', // ボタンの最小幅を調整
  },
};

export default LoginPage;
