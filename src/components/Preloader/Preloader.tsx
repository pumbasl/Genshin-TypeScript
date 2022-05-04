import React from 'react';
import { Spinner } from 'react-bootstrap';
import ContentLoader from "react-content-loader";
import styled from 'styled-components';

const FixedComponent = styled.div`
    position: fixed;
`;

interface IProps {
    fixed?: boolean;
    skeleton?: boolean;
    skeletonSmall?: boolean;
};

export default function Preloader({ fixed, skeleton, skeletonSmall }: IProps){
    if(skeleton){
        return(
            <ContentLoader 
                speed={2}
                width={400}
                height={150}
                viewBox="0 0 400 150"
                backgroundColor="#a09494"
                foregroundColor="#ecebeb"
            >
                <circle cx="10" cy="20" r="8" /> 
                <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
                <circle cx="10" cy="50" r="8" /> 
                <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
                <circle cx="10" cy="80" r="8" /> 
                <rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> 
                <circle cx="10" cy="110" r="8" /> 
                <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
            </ContentLoader>
        );
    }

    if(skeletonSmall){
        return(
            <ContentLoader 
                speed={2}
                width={400}
                height={60}
                viewBox="0 0 400 60"
                backgroundColor="#a09494"
                foregroundColor="#ecebeb"
            >
                <circle cx="10" cy="20" r="8" /> 
                <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
                <circle cx="10" cy="50" r="8" /> 
                <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
            </ContentLoader>
        );
    }

    if(fixed){
        return(
            <FixedComponent>
                <Spinner animation="grow" variant="purple" />
            </FixedComponent>
        );
    }

    return(
        <div>
            <Spinner animation="grow" variant="purple" />
        </div>
    );
}