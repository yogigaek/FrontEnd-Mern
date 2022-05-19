import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/index';
import Home from './pages/Home/index';
import Detail from './pages/Detail/index';
import Edit from './pages/Edit/index';
import Tambah from './pages/Tambah/index';

const App = () => {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes >
          <Route path="/" element={ <Home />} />
          <Route path="/detail/:id" element={ <Detail />} />
          <Route path="/edit/:id" element={ <Edit />} />
          <Route path="/tambah" element={ <Tambah />} />
        </Routes >
      </Router>
    </div>

  )
}

export default App;