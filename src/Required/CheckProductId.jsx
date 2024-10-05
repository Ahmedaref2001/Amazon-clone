import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const CheckProductId = () => {
    const { id,category } = useParams();
    return (
        (id&&isNaN(id)&&!category) ? <NotFound/> : <Outlet />
    );
}

export default CheckProductId;
