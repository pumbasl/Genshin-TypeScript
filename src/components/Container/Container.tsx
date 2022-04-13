import React from 'react';

import { Container } from 'react-bootstrap';

//Style
import { BackgroundContainer as Style } from '../../style/style';
//

interface PropsTypes {
    children: React.ReactNode;
    nostyled?: boolean;
};

export default function ContainerComp({ children, nostyled }: PropsTypes){
    if(!nostyled){
        return(
            <Container>
                <Style>
                    {children}
                </Style>
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