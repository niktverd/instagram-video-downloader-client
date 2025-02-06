import React from 'react';

import {getRootClassName} from '@gravity-ui/uikit/server';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';

// import logo from './logo.svg';
import {Accounts} from './pages/Accounts';
import {Home} from './pages/Home';
import {MediaPosts} from './pages/MediaPosts';
import {Policy} from './pages/Policy';
import {Scenarios} from './pages/Scenarios';
import {Test} from './pages/Test';

import './App.css';

const theme = 'dark';
const rootClassName = getRootClassName({theme});

function App() {
    return (
        <div className={`App g-root ${rootClassName}`}>
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
                            <li>
                                <Link to="/scenarios">Scenarios</Link>
                            </li>
                            <li>
                                <Link to="/accounts">Accounts</Link>
                            </li>
                            <li>
                                <Link to="/test">Test</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/policy" element={<Policy />} />
                        <Route path="/media-posts" element={<MediaPosts />} />
                        <Route path="/scenarios" element={<Scenarios />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/accounts" element={<Accounts />} />
                        {/* If you want a default/fallback route when no other route matches */}
                        <Route path="*" element={<h2>Page Not Found</h2>} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
