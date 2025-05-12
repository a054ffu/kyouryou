import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

// ページをリロードするボタン
function HomeButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/main');
  };
  return <Button onClick={handleClick} text="ホーム画面に戻る" />;
}

export default HomeButton;
