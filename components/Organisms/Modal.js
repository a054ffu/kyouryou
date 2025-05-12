import React from 'react';

const Modal = ({ isOpen, title, children, onClose, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          width: '400px',
          padding: '20px',
          borderRadius: '4px',
        }}
      >
        {/* タイトル(左上に配置) */}
        <h2 style={{ margin: 0 }}>{title}</h2>

        {/* 右上にモーダルを閉じるボタン */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* モーダルの中身 */}
        <div style={{ marginTop: '20px' }}>{children}</div>

        {/* 一番下にキャンセルボタンと確認ボタン */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <button onClick={onCancel} style={{ marginRight: '8px' }}>
            キャンセル
          </button>
          <button onClick={onConfirm}>確認</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
