import axios from 'axios';

// axiosのインスタンスを作成
const api = axios.create({
    // 環境変数からAPIのベースURLを取得
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// リクエストインターセプターを追加
api.interceptors.request.use(
    (config) => {
        // localStorageからトークンを取得
        const token = localStorage.getItem('token');
        if (token) {
            // トークンが存在すれば、Authorizationヘッダーに設定
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // リクエストエラーの処理
        return Promise.reject(error);
    }
);

export default api;
