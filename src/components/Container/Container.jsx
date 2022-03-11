import React from 'react';

import { Container } from 'react-bootstrap';

//Style
import { BackgroundContainer as Style } from '../../style/style';
//

export default function ContainerComp({ children, nostyled }){
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