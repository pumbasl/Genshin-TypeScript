import React from 'react';
import styled from 'styled-components';

import { Container } from 'react-bootstrap';

//Style
const BackgroundContainer = styled.div`
    padding: 15px;
    color: black;
    // background-color: rgba(223, 215, 215, .6);
    background-color: rgba(241, 212, 212, .6);
    // background-color: rgba(75, 93, 103, .9);
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;
//

interface PropsTypes {
    children: React.ReactNode;
    nostyled?: boolean;
};

export default function ContainerComp({ children, nostyled }: PropsTypes){
    if(!nostyled){
        return(
            <Container>
                <BackgroundContainer>
                    {children}
                </BackgroundContainer>
            </Container>
        );
    } else {
        return(
            <Container>
                {children}
            </Container>
        );
    }
}