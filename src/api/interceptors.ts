import apiClient from "./apiClient";

const TOKEN_KEY = "toystore.token";
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
},

    (error) => {
        return Promise.reject(error)
    }

)