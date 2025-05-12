import React, { useState } from 'react';
import { InfoWindow } from '@vis.gl/react-google-maps';
import Button from './Button';

const InfoWindowContent = ({ selected, onClose = () => {} }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleCloseClick = () => {
    setShowDetails(false);
    onClose();
  };

  return (
    <InfoWindow
      position={{
        lat: parseFloat(selected.Id.split(',')[0]),
        lng: parseFloat(selected.Id.split(',')[1]),
      }}
      onCloseClick={handleCloseClick}
    >
      <div>
        <h3
          style={{
            textAlign: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1,
          }}
        >
          {selected.Name}
        </h3>
        <div style={{ textAlign: 'left' }}>
          <p>管理事務所名: {selected.Inspector}</p>
          <p>所在地: {selected.address}</p>
          <p>路線: {selected.Road}</p>
          <p>最新点検年度: {selected.Date}</p>
          <p>健全度: {selected.Rank}</p>
          {showDetails && (
            <div>
              <p>施設ID: {selected._id}</p>
              <p>管理先電話番号: {selected.Tel}</p>
              <p>緯度,経度: {selected.Id}</p>
              <p>施設名カナ: {selected.Kana}</p>
              <p>橋梁の種類: {selected.Keisiki}</p>
              <p>架設年（西暦）: {selected.birth}</p>
              <p>橋長（m）: {selected.length}</p>
              <p>幅員（m）: {selected.width}</p>
              <p>種類: {selected.Howuse}</p>
              <p>次回点検年: {selected.Schedule}</p>
              {/* 他の詳細情報をここに追加 */}
            </div>
          )}
          <Button
            onClick={toggleDetails}
            text={showDetails ? '閉じる' : 'もっとみる'}
          />
        </div>
      </div>
    </InfoWindow>
  );
};

export default InfoWindowContent;
