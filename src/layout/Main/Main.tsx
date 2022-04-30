import React from 'react';
import styled from 'styled-components';
import Routers from '../../routers/Routers';

//style
const Main = styled.div`
    flex: 1 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;
`;
//

export default function MainComponent(){
    return(
        <Main>
            <Routers />
        </Main>
    );
}