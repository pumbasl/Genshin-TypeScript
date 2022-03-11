import React from 'react';

//style
import { Badge } from 'react-bootstrap';
//

export default function ErrorsForm({ message }){
    return(
        <Badge bg="danger">
            {message}
        </Badge>
    );
}