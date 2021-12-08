import { useEffect, useState } from 'react';
import { ChartRam } from '../components/graphs/ChartRam';
import { Card } from '../components/Card/Card';
import { getRamState } from '../helpers/Ram';
import { RAMData } from '../interfaces/RamScreen';
import { AxiosResponse } from 'axios'


export const RamScreen = () => {
    
    const [ram, setRam] = useState<RAMData>({
        total: '',
        used: '',
        percentage: ''
    })

    const { total, used, percentage } = ram;

    useEffect(() => {
       getRamState().then(({ data } : AxiosResponse) => {
           console.log(data)
           setRam(data)
       })
        
    }, [])

    return (
        <>
            <h1>
                RamScreen
            </h1>
            <Card title={ 'Total RAM (MB)' } body={ total } />
            <Card title={ 'Used RAM (MB)' } body={ used } />
            <Card title={ '%RAM' } body={ percentage } />
            <ChartRam />
        </>
    )
}
