import React from 'react';
import { Badge as BadgeHOC, DeleteCol } from '../index';
import { Badge } from 'react-bootstrap';
import { CardStyle } from './style';
import getDays from '../../service/getDays';
import { IPromoCode, IWebEvents } from '../../types';

interface ICard{
    children: React.ReactNode;
    data: IPromoCode | IWebEvents;
    handleClick?: (data: IPromoCode | IWebEvents) => Promise<void>;
    expiredText: React.ReactNode;
};

export const Card = ({ data, children, handleClick, expiredText }: ICard) => {
    return(
        <CardStyle className="row">
            <div className='col' { ...(handleClick ? { onClick: () => handleClick(data) } : {}) }>
                {children} &nbsp; 
                <BadgeHOC check={ getDays(data.created) <= 2 }>
                    New!
                </BadgeHOC>
            </div>

            <div className='col text-end'>
                <Badge bg="purple">
                    {expiredText}
                </Badge>

                <DeleteCol data={data} />
            </div>
        </CardStyle>
    );
};

export default Card;