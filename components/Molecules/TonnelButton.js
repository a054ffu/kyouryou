import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function TonnelButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/Tonnel');
  };
  return <Button onClick={handleClick} text="トンネル管理" />;
}

export default TonnelButton;
