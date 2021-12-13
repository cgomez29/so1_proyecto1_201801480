import { soapi } from '../api/soapi';

export const getCPUState = async () => {
    return await soapi.get('/cpu');
}

export const killProcess = async ( id : string ) => {
    return await soapi.get(`/kill/${id}`);
}