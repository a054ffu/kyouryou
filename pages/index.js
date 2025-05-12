import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // 簡単なログイン処理
    if (username === 'admin' && password === 'password') {
      // ログイン成功時の処理
      router.push('/main');
    } else {
      // ログイン失敗時の処理
      alert('ユーザー名またはパスワードが違います。');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>橋梁情報管理システム</h1>
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
          />
        </div>
        <button type="submit" style={styles.button}>
          ログイン
        </button>
      </form>
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
    marginBottom: '50px',
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
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#c9fdd7',
    color: '#8c7676',
    border: 'none',
    borderRadius: '5px',
    outline: '1px solid #99f0ca',
    cursor: 'pointer',
  },
};

export default LoginPage;
