import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Dashboard } from './pages/Dashboard';
import { Layout } from './Layout/Layout'

import './Styles/app.scss';


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
