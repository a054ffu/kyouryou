import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function LogoutButton() {
  const router = useRouter();
  const handleClick = () => {
    // ★ localStorageから認証情報を削除
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('lastLogin');

    router.push('/');
  };
  return <Button onClick={handleClick} text="ログアウト" />;
}

export default LogoutButton;
