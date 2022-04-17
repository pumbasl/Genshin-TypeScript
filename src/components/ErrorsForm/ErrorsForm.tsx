import React from 'react';

//style
import { Badge } from 'react-bootstrap';
//

interface IProps {
    message?: string;
};

export default function ErrorsForm({ message }: IProps){
    if(!message) return null;

    return(
        <Badge bg="danger">
            {message}
        </Badge>
    );
}