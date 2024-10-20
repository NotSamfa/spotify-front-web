import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Song from "./pages/Song";
import Artist from "./pages/Artist";
import Genre from "./pages/Genre";
import Album from "./pages/Album";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentLayout from "./components/ContentLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Results from "./pages/Results";

function App() {
  const[sidebarOpen, setSidebarOpen] = useState(true);
  

  return (
    <Router>
      <Navbar />
      <ContentLayout sidebarOpen={sidebarOpen}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
        <Routes>
          <Route path="/" element={<Home sidebarOpen={sidebarOpen} />} />

          <Route path="/search/" element={<Explore sidebarOpen={sidebarOpen} />} />
          <Route path="/search/:query" element={<Results sidebarOpen={sidebarOpen}/>} />

          <Route path="/song/:name" element={<Song />} />
          <Route path="/artist/:name" element={<Artist />} />
          <Route path="/genre/:name" element={<Genre />} />
          <Route path="/album/:name" element={<Album />} /> 
        </Routes>
      </ContentLayout>
    </Router>
  );
}

export default App;
