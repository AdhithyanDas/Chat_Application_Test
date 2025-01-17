import base_url from "./baseUrl";
import commonApi from "./commonApi";

export const registerApi = async (data) => {
    return await commonApi(`${base_url}/reg`, 'POST', "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/log`, 'POST', "", data)
}

export const createRoomApi = async (header, data) => {
    return await commonApi(`${base_url}/addroom`, 'POST', header, data)
}

export const fetchRoomsApi = async (header) => {
    return await commonApi(`${base_url}/getrooms`, 'GET', header, "")
}