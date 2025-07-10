import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function IdDeleteButton({ disabled = false }) {
  const router = useRouter();
  const handleClick = () => {
    console.log('_idDeleteButton');
  };
  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      text="ID指定でまとめて削除"
    />
  );
}

export default IdDeleteButton;
