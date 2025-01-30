import React from 'react';

import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';

// import logo from './logo.svg';
import {Home} from './pages/Home';
import {MediaPosts} from './pages/MediaPosts';
import {Policy} from './pages/Policy';

import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Instagram Schedule And Analytics</h1>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/policy">Policy</Link>
                            </li>
                            <li>
                                <Link to="/media-posts">Media Posts</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/policy" element={<Policy />} />
                        <Route path="/media-posts" element={<MediaPosts />} />
                        {/* If you want a default/fallback route when no other route matches */}
                        <Route path="*" element={<h2>Page Not Found</h2>} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
