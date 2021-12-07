import { Table } from "../components/Table/Table";
import { Card } from "../components/Card/Card";
import { heads, data } from "../helpers/HeadTable";

import '../Styles/Dashboard/dashboard.scss';

export const Dashboard = () => {
    return (
        <>
            <h1>
                Dashboard
            </h1>
            <div className="card-container">
                <Card title={ 'Running' } body={ '100' } />
                <Card title={ 'Sleeping' } body={ '2' } />
                <Card title={ 'Stopped' } body={ '0' } />
                <Card title={ 'Zombie' } body={ '0' } />
                <Card title={ 'Total' } body={ '250' } />
            </div>
            <Table headers={heads} data={data} />
        </>
    )
}
