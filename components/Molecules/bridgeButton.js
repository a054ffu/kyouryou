import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function BridgeButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/main');
  };
  return <Button onClick={handleClick} text="橋梁管理" />;
}

export default BridgeButton;
