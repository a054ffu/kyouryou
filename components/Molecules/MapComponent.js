import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import InfoWindowContent from '../Atoms/InfoWindowContent';
import NumberOfPins from '../Atoms/NumberOfPins';

const MapComponent = ({ data, selected, onMarkerClick }) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const handleMarkerClick = (item) => {
    if (onMarkerClick) {
      onMarkerClick(item);
    }
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '97vw', height: '100vh', marginRight: '10px' }}
        defaultCenter={{ lat: 34.2941965, lng: 131.6204442 }}
        defaultZoom={9}
        gestureHandling={'cooperative'}
        disableDefaultUI={true}
      >
        {data.map((item) => {
          const [lat, lng] = item.Id.split(',').map((coord) =>
            parseFloat(coord.trim())
          );

          // Rankに応じてアイコンのURLを切り替える
          const iconUrl = (() => {
            switch (item.Rank) {
              case 'Ⅰ':
                return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; // 赤色
              case 'Ⅱ':
                return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'; // 青色
              case 'Ⅲ':
                return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'; // 緑色
              case 'Ⅳ':
                return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'; // 黄色
              default:
                return 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'; // デフォルト色
            }
          })();

          return (
            <Marker
              icon={iconUrl} // 動的にアイコンを設定
              key={item._id}
              position={{ lat, lng }}
              onClick={() => handleMarkerClick(item)}
            />
          );
        })}

        {selected && <InfoWindowContent selected={selected} />}
      </Map>
      {/* <NumberOfPins count={data.length} /> */}
    </APIProvider>
  );
};

export default MapComponent;
