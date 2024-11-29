import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <Router basename="/news-viewer">
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar />
        <main className="pl-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;