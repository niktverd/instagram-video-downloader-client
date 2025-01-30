import React, {useEffect, useState} from 'react';

import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';

// import logo from './logo.svg';
import {Home} from './pages/Home';
import {Policy} from './pages/Policy';

import './App.css';
function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3030/webhooks', {
                // const response = await fetch('https://instagram-video-downloader-e0875c65c071.herokuapp.com/webhooks', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            setData(json);
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Instagram Schedule And Analytics</h1>
            <pre>{JSON.stringify(data)}</pre>
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
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/policy" element={<Policy />} />
                        {/* If you want a default/fallback route when no other route matches */}
                        <Route path="*" element={<h2>Page Not Found</h2>} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
