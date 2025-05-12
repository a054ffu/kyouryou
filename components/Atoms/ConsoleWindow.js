import React from 'react';
import Button from './Button';

const ConsoleWindow = ({ data, onEdit, onDelete }) => {
  const cellStyle = { backgroundColor: '#99f0ca' };

  return (
    <table
      border="1"
      style={{ width: '100%', textAlign: 'center', tableLayout: 'fixed' }}
    >
      <thead>
        <tr>
          <th style={cellStyle}>ID</th>
          <th style={cellStyle}>名前</th>
          <th style={cellStyle}>緯度経度</th>
          <th style={cellStyle}>操作</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          <tr>
            <td style={cellStyle}>{data._id}</td>
            <td style={cellStyle}>{data.Name}</td>
            <td style={cellStyle}>{data.Id}</td>
            <td style={cellStyle}>
              <Button text="修正" onClick={onEdit} />
              <Button text="削除" onClick={onDelete} />
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan="4" style={{ ...cellStyle, textAlign: 'center' }}>
              データが選択されていません
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ConsoleWindow;
