import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Dashboard } from './pages/Dashboard';
import { RamScreen } from './pages/RamScreen';
import { CPUScreen } from './pages/CPUScreen';
import { Layout } from './Layout/Layout'

import './Styles/app.scss';


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ram" element={<RamScreen />} />
          <Route path="/cpu" element={<CPUScreen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
