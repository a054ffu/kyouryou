import React, { useState } from 'react';
import Modal from '../Organisms/Modal';
import InputField from '../Atoms/InputField';

const AddModal = ({ isOpen, onClose, onCancel, onConfirm }) => {
  const [formData, setFormData] = useState({
    _id: '',
    bridge: '',
    Inspector: '',
    Tel: '',
    Id: '',
    Name: '',
    Kana: '',
    Road: '',
    address: '',
    Keisiki: '',
    birth: '',
    length: '',
    width: '',
    HowUse: '',
    Date: '',
    Rank: '',
    Schedule: '',
    New: '',
    Record: '',
    Co: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title="新しい橋を追加"
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={() => onConfirm(formData)}
    >
      <div style={{ maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }}>
        <InputField
          title="ID"
          label="ハイフン込みで12文字を入力"
          value={formData._id}
          onChange={(e) => handleInputChange('_id', e.target.value)}
        />
        <InputField
          title="管理事務所"
          label="ここに入力"
          value={formData.Inspector}
          onChange={(e) => handleInputChange('Inspector', e.target.value)}
        />
        <InputField
          title="電話番号"
          label="ここに入力"
          value={formData.Tel}
          onChange={(e) => handleInputChange('Tel', e.target.value)}
        />
        <InputField
          title="緯度経度"
          label="ここに入力"
          value={formData.Id}
          onChange={(e) => handleInputChange('Id', e.target.value)}
        />
        <InputField
          title="名前"
          label="ここに入力"
          value={formData.Name}
          onChange={(e) => handleInputChange('Name', e.target.value)}
        />
        <InputField
          title="ﾅﾏｴ"
          label="ここに入力"
          value={formData.Kana}
          onChange={(e) => handleInputChange('Kana', e.target.value)}
        />
        <InputField
          title="道路"
          label="ここに入力"
          value={formData.Road}
          onChange={(e) => handleInputChange('Road', e.target.value)}
        />
        <InputField
          title="住所"
          label="ここに入力"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
        <InputField
          title="橋の形式"
          label="ここに入力"
          value={formData.Keisiki}
          onChange={(e) => handleInputChange('Keisiki', e.target.value)}
        />
        <InputField
          title="建設年度"
          label="例: 2000"
          value={formData.birth}
          onChange={(e) => handleInputChange('birth', e.target.value)}
        />
        <InputField
          title="橋の長さ"
          label="ここに入力"
          value={formData.length}
          onChange={(e) => handleInputChange('length', e.target.value)}
        />
        <InputField
          title="橋の幅"
          label="ここに入力"
          value={formData.width}
          onChange={(e) => handleInputChange('width', e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'left', marginRight: '8px' }}>使用用途:</div>
          <select
            style={{ width: '62%', textAlign: 'left' }}
            value={formData.HowUse}
            onChange={(e) => handleInputChange('HowUse', e.target.value)}
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="長大橋">長大橋</option>
            <option value="特殊橋">特殊橋</option>
            <option value="重要物流道路">重要物流道路</option>
            <option value="緊急輸送道路">緊急輸送道路</option>
            <option value="跨線橋">跨線橋</option>
            <option value="跨道橋">跨道橋</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <InputField
          title="点検年度"
          label="例: 2023"
          value={formData.Date}
          onChange={(e) => handleInputChange('Date', e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'left', marginRight: '8px' }}>健全度:</div>
          <select
            style={{ width: '62%', textAlign: 'left' }}
            value={formData.Rank}
            onChange={(e) => handleInputChange('Rank', e.target.value)}
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="Ⅰ">Ⅰ</option>
            <option value="Ⅱ">Ⅱ</option>
            <option value="Ⅲ">Ⅲ</option>
            <option value="Ⅳ">Ⅳ</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
