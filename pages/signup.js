import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // axios をインポート

const SignupPage = () => {
  const [username, setUsername] = useState('');
<<<<<<< HEAD
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // エラーメッセージ用
    const router = useRouter();

  const handleSignup = async (e) => {
        e.preventDefault();
    setError(''); // エラーメッセージをリセット

    if (!username || !password) {
            setError('ユーザー名とパスワードを入力してください。');
            return;
        }

    try {
            // ここでバックエンドの新規登録APIを呼び出します。
            await axios.post('http://localhost:8000/api/auth/signup', { username, password });
      });
      // 上記URLは実際のAPIエンドポイントに置き換えてください。
      console.log('新規登録試行:', { username, password });
            alert('新規登録リクエストを送信しました。\n（実際の登録処理はバックエンドに実装が必要です）');
      );
      // 登録成功後、ログインページにリダイレクトするなどの処理
      router.push('/');
        } catch (err) {
      console.error('新規登録エラー:', err);
      setError(err.response?.data?.message || '新規登録中にエラーが発生しました。');
=======
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // エラーメッセージ用
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください。');
      return;
    }

    try {
      // ここでバックエンドの新規登録APIを呼び出します。
      await axios.post('http://localhost:8000/api/auth/signup', {
        username,
        password,
      });
      // 上記URLは実際のAPIエンドポイントに置き換えてください。
      console.log('新規登録試行:', { username, password });
      alert(
        '新規登録リクエストを送信しました。\n（実際の登録処理はバックエンドに実装が必要です）'
      );
      // 登録成功後、ログインページにリダイレクトするなどの処理
      router.push('/');
    } catch (err) {
      console.error('新規登録エラー:', err);
      setError(
        err.response?.data?.message || '新規登録中にエラーが発生しました。'
>>>>>>> a3755153b18f213484fb891de0f8d4915c16fb92
      );
    }
  };

<<<<<<< HEAD
  return (
        <div style={styles.container}>
            <h1 style={styles.title}>新規アカウント登録</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignup} style={styles.form}>
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
                    登録
                </button>
            </form>
            <button
                type="button"
        style={{
          ...styles.button,
          marginTop: '10px',
          backgroundColor: '#f0f0f0',
        onClick={() => router.push('/')}
            >
                ログインページに戻る
            </button>
        </div>
    );
};

// LoginPageのスタイルを流用または新規作成
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
        marginBottom: '50px',
        fontSize: '2.5em', // 少し小さく
        marginTop: '-50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
        alignItems: 'center',
=======
  // LoginPageのスタイルを流用または新規作成
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
      marginBottom: '50px',
      fontSize: '2.5em', // 少し小さく
      marginTop: '-50px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
>>>>>>> a3755153b18f213484fb891de0f8d4915c16fb92
    },
    inputGroup: {
      marginBottom: '15px',
    },
<<<<<<< HEAD
  label: {
    marginBottom: '5px',
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
        minWidth: '120px', // ボタンの最小幅
  },
=======
    label: {
      marginBottom: '5px',
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
      minWidth: '120px', // ボタンの最小幅
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>新規アカウント登録</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup} style={styles.form}>
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
          登録
        </button>
      </form>
      <button
        type="button"
        style={{
          ...styles.button,
          marginTop: '10px',
          backgroundColor: '#f0f0f0',
        }}
        onClick={() => router.push('/')}
      >
        ログインページに戻る
      </button>
    </div>
  );
>>>>>>> a3755153b18f213484fb891de0f8d4915c16fb92
};

export default SignupPage;
