import axios from "axios";
import TokenService from "./token.services";
import { NotificationManager } from 'react-notifications';

const instance = axios.create({
    baseURL: "https://boshaapi.site",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        }            
        console.log(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/SignIn" && originalConfig.url !== "/SignUp" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const refreshToken = TokenService.getLocalRefreshToken()
                    const rs = await instance.get(`/Authen/GetAccessToken?token=${refreshToken}`);
                    if(rs.data){
                        const accessToken = rs.data.accessToken;
                        const firebase = rs.data.firebaseToken;
                        TokenService.updateLocalAccessToken(accessToken, firebase);
                        return instance(originalConfig);
                    }else{
                        NotificationManager.error("Hãy đăng nhập để thực hiện","Chưa đăng nhập", 2000)
                        return Promise.reject();
                    }
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;