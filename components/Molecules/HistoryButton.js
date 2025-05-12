import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function HistoryButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/history');
  };
  return <Button onClick={handleClick} text="変更履歴" />;
}

export default HistoryButton;
