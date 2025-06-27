import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function PinDeleteButton({disabled = false}) {
  const router = useRouter();
  const handleClick = () => {
    console.log('PinDeleteButton');
  };
  return <Button onClick={handleClick} disabled={disabled} text="ピンをまとめてクリックで削除" />;
}

export default PinDeleteButton;
