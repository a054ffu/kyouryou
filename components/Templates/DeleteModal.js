import React, { useState } from 'react';
import Modal from '../Organisms/Modal';
import InputField from '../Atoms/InputField';
import axios from 'axios';

const DeleteModal = ({ isOpen, onClose, onCancel, onConfirm }) => {
  const [formData, setFormData] = useState({
    _id: '',
    _id1: '',
    _id2: '',
    _id3: '',
    _id4: '',
    _id5: '',
    _id6: '',
    _id7: '',
    _id8: '',
    _id9: '',
    _id10: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleConfirm = async () => {
    if (!window.confirm('削除しますか？')) {
      return;
    }

    const ids = Object.values(formData).filter((id) => id !== '');
    for (const id of ids) {
      try {
        await axios.delete(`/deleteopendata/${id}`);
      } catch (error) {
        console.error(`Failed to delete ID: ${id}`, error);
      }
    }
    onConfirm();
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="橋梁の削除"
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={handleConfirm}
    >
      <div style={{ maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }}>
        <InputField
          title="ID"
          label="ハイフン込みで12文字を入力"
          value={formData._id}
          onChange={(e) => handleInputChange('_id', e.target.value)}
        />
        <InputField
          title="ID 1"
          label="ハイフン込みで12文字を入力"
          value={formData._id1}
          onChange={(e) => handleInputChange('_id1', e.target.value)}
        />
        <InputField
          title="ID 2"
          label="ハイフン込みで12文字を入力"
          value={formData._id2}
          onChange={(e) => handleInputChange('_id2', e.target.value)}
        />
        <InputField
          title="ID 3"
          label="ハイフン込みで12文字を入力"
          value={formData._id3}
          onChange={(e) => handleInputChange('_id3', e.target.value)}
        />
        <InputField
          title="ID 4"
          label="ハイフン込みで12文字を入力"
          value={formData._id4}
          onChange={(e) => handleInputChange('_id4', e.target.value)}
        />
        <InputField
          title="ID 5"
          label="ハイフン込みで12文字を入力"
          value={formData._id5}
          onChange={(e) => handleInputChange('_id5', e.target.value)}
        />
        <InputField
          title="ID 6"
          label="ハイフン込みで12文字を入力"
          value={formData._id6}
          onChange={(e) => handleInputChange('_id6', e.target.value)}
        />
        <InputField
          title="ID 7"
          label="ハイフン込みで12文字を入力"
          value={formData._id7}
          onChange={(e) => handleInputChange('_id7', e.target.value)}
        />
        <InputField
          title="ID 8"
          label="ハイフン込みで12文字を入力"
          value={formData._id8}
          onChange={(e) => handleInputChange('_id8', e.target.value)}
        />
        <InputField
          title="ID 9"
          label="ハイフン込みで12文字を入力"
          value={formData._id9}
          onChange={(e) => handleInputChange('_id9', e.target.value)}
        />
        <InputField
          title="ID 10"
          label="ハイフン込みで12文字を入力"
          value={formData._id10}
          onChange={(e) => handleInputChange('_id10', e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default DeleteModal;
