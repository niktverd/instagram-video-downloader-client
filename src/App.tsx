import React, {useEffect, useState} from 'react';

// import logo from './logo.svg';
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
        </div>
    );
}

export default App;
