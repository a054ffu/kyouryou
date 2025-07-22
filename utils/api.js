import axios from 'axios';

// baseURLを設定しておくと、api.get('/gethistory') のように短いパスで記述できます
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

// Axiosのインターセプター（リクエストを送信する前に行う共通処理）を設定
api.interceptors.request.use(
    (config) => {
        // localStorageなどから認証トークンを取得します
        const token = localStorage.getItem('token'); // 'token'はトークンを保存しているキー名です

        // トークンが存在すれば、リクエストヘッダーにAuthorizationヘッダーを追加
        if (token) {
            // 'Bearer ' スキームは一般的ですが、APIの仕様に合わせてください
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // リクエスト設定でエラーが発生した場合の処理
        return Promise.reject(error);
    }
);

export default api;