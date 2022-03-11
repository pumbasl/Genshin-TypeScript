import React from 'react';

//components
import { TimeView } from '../index';
//

//Style
import { Badge } from 'react-bootstrap';
import { PromoCardBlock, PromoExpired, PromoCard } from '../../style/style';
//


const Card = {

    Label: function Label({ children, ...props }){
        return(
            <PromoCard {...props}>
                {children}
            </PromoCard>
        );
    },

    Body: function Body({ children, ...props }){
        return(
            <PromoCardBlock {...props}>
                {children}
            </PromoCardBlock>
        );
    },

    Time: function Time({ children, expired, ...props }){
        return(
            <PromoExpired {...props}>
                <Badge bg="purple">
                    <TimeView time={expired}>
                        {children}
                    </TimeView>
                </Badge>
            </PromoExpired>
        );
    }
};

export default Card;