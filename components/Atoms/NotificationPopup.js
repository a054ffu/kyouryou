import React from 'react';

const NotificationPopup = ({ changes, onClose }) => {
    return (
        <div style={popupStyles.container}>
            <div style={popupStyles.content}>
                <h2>他のユーザーによる変更通知</h2>
                <ul style={popupStyles.list}>
                    {changes.map((change, index) => (
                        <li key={index} style={popupStyles.listItem}>
                            <span style={popupStyles.user}>[{change.user?.username || '不明'}]</span>
                            <span style={popupStyles.dataId}>ID: {change.data?._id || 'N/A'}</span>
                            <span>が変更されました。</span>
                            <span style={popupStyles.timestamp}>({new Date(change.timestamp).toLocaleString()})</span>
                        </li>
                    ))}
                </ul>
                <button style={popupStyles.button} onClick={onClose}>
                    閉じる
                </button>
            </div>
        </div>
    );
};

const popupStyles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    content: {
        backgroundColor: '#fff',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        maxWidth: '600px',
        textAlign: 'center',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        textAlign: 'left',
        maxHeight: '300px',
        overflowY: 'auto',
    },
    listItem: {
        marginBottom: '10px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
    user: {
        fontWeight: 'bold',
        color: '#d9534f',
        marginRight: '8px',
    },
    dataId: {
        fontFamily: 'monospace',
        backgroundColor: '#f0f0f0',
        padding: '2px 4px',
        borderRadius: '3px',
    },
    timestamp: {
        fontSize: '0.8em',
        color: '#777',
        marginLeft: '8px',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#c9fdd7',
        color: '#8c7676',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default NotificationPopup;
