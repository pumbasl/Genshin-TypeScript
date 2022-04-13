import React from 'react';

//components
import { TimeView } from '../index';
//

//Style
import { Badge } from 'react-bootstrap';
import { PromoCardBlock, PromoExpired, PromoCard } from '../../style/style';
//

interface ICard extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
};

interface ICardTime extends ICard {
    expired: number;
};

const Card = {

    Label: function Label({ children, ...props }: ICard){
        return(
            <PromoCard {...props}>
                {children}
            </PromoCard>
        );
    },

    Body: function Body({ children, ...props }: ICard){
        return(
            <PromoCardBlock {...props}>
                {children}
            </PromoCardBlock>
        );
    },

    Time: function Time({ children, expired, ...props }: ICardTime){
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