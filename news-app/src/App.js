import './App.css';
import React, { useState } from 'react';
import Navbar from './componets/Navbar';
import News from './componets/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 16; 
  const country = "us"; 
  const apiKey = "86e52f51942247099ba8f833d963f9bf"; 
  const [progress, setProgress] = useState(0); 

  const setProgressBar = (progress) => {
    setProgress(progress)
  }

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgressBar} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="General" />} />
          <Route path="/technology" element={<News setProgress={setProgressBar} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="Technology" />} />
          <Route path="/health" element={<News setProgress={setProgressBar} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="Health" />} />
          <Route path="/sports" element={<News setProgress={setProgressBar} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="Sports" />} />
          <Route path="/business" element={<News setProgress={setProgressBar} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="Business" />} />
          <Route path="/science" element={<News setProgress={setProgressBar} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="Science" />} /> {/* Removed extra space before "science" */}
          <Route path="/entertainment" element={<News setProgress={setProgressBar} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="Entertainment" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
