import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Preloader(){
    return(
        <Spinner animation="grow" variant="purple" />
    );
}