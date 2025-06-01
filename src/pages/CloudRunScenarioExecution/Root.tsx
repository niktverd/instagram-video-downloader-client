import React from 'react';

import {Route, Routes} from 'react-router-dom';

import {Form} from './Form';
import {List} from './List';
import {Overview} from './Overview';
import {Statistics} from './Statistics';

const Root = () => (
    <Routes>
        <Route path="" element={<List />} />
        <Route path="new" element={<Form />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path=":id" element={<Overview />} />
        <Route path=":id/edit" element={<Form />} />
    </Routes>
);

export default Root;
