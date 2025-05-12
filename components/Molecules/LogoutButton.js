import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

// ページをリロードするボタン
function LogoutButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };
  return <Button onClick={handleClick} text="ログアウト" />;
}

export default LogoutButton;
