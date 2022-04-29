import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const FixedComponent = styled.div`
    position: fixed;
`;

interface IProps {
    fixed?: boolean;
};

export default function Preloader({ fixed }: IProps){
    if(!fixed) return <Spinner animation="grow" variant="purple" />;

    return(
        <FixedComponent>
            <Spinner animation="grow" variant="purple" />
        </FixedComponent>
    );
}