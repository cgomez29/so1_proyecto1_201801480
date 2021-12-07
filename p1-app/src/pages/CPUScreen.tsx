import { Card } from '../components/Card/Card'
import GraphLine from '../components/graphs/Test'

export const CPUScreen = () => {
    return (
        <>
            <h1>
                CPUScreen
            </h1>
            <Card title={ 'Running' } body={ '100' } />
            <Card title={ 'Running' } body={ '100' } />
            <Card title={ 'Running' } body={ '100' } />
            <Card title={ 'Running' } body={ '100' } />
            <GraphLine />
        </>
    )
}
