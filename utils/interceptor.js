import axios from 'axios';
import promise from 'promise';
import AsyncStorage from "@react-native-community/async-storage";

// Add a request interceptor 
var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async function (config) {
        // config.headers
        // console.log(">>>>mmmm>>>>>>>>>", config)
        // Do something before request is sent 
        //If the header does not contain the token and the url not public, redirect to login  
        var accessToken = await AsyncStorage.getItem('token');
        if (accessToken) {
            if (config.method !== 'OPTIONS') {
                config.headers.authorization = accessToken;
            }
        }
        return config;
    },
    function (error) {
        // Do something with request error 
        return promise.reject(error);
    });

export {axiosInstance};