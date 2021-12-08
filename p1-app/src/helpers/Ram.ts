import { soapi } from '../api/soapi';

export const getRamState = async () => {
    return await soapi.get('/ram');
}