import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function LogoutButton() {
  const router = useRouter();
  const handleClick = () => {
    // セッションに紐づく情報のみを削除
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('notificationCheckTime');

    // ユーザーごとのログイン履歴(loginTimestamps)は削除しない

    router.push('/');
  };
  return <Button onClick={handleClick} text="ログアウト" />;
}

export default LogoutButton;
