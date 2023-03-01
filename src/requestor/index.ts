import axios, { Axios, AxiosInstance, AxiosRequestConfig } from "axios";
import { RawResponse } from "../type";
import { RestError } from "../error";

export default class Rest {
    protected __requestor: AxiosInstance;
    constructor(provide: string | AxiosInstance) {
        if (typeof provide == 'string') {
            this.__requestor = axios.create({
                baseURL: 'https://www.kookapp.cn/api/v3',
                headers: {
                    Authorization: `Bot ${provide}`,
                }
            });
        } else {
            this.__requestor = provide;
        }
    }
    async get(endpoint: string, params?: any, config?: AxiosRequestConfig): Promise<any> {
        const data: RawResponse = (await this.__requestor.get(endpoint, { params, ...config })).data;
        if (data.code == 0) return data.data;
        else throw new RestError(data.code, data.message);
    }
    async post(endpoint: string, body?: any, config?: AxiosRequestConfig): Promise<any> {
        const data: RawResponse = (await this.__requestor.post(endpoint, body, config)).data;
        if (data.code == 0) return data.data;
        else throw new RestError(data.code, data.message);
    }
    async put(endpoint: string, body?: any, config?: AxiosRequestConfig): Promise<any> {
        const data: RawResponse = (await this.__requestor.put(endpoint, body, config)).data;
        if (data.code == 0) return data.data;
        else throw new RestError(data.code, data.message);
    }
}