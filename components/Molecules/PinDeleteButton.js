import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function PinDeleteButton() {
  const router = useRouter();
  const handleClick = () => {
    console.log('PinDeleteButton');
  };
  return <Button onClick={handleClick} text="ピンをまとめてクリックで削除" />;
}

export default PinDeleteButton;
