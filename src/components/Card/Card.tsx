import React from 'react';
import { Badge as BadgeHOC } from '../index';
import { Badge, Row, Col } from 'react-bootstrap';
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
        <Row as={CardStyle}>
            <Col sm={8} { ...(handleClick ? { onClick: () => handleClick(data) } : {}) }>
                {children} &nbsp; 
                <BadgeHOC check={ getDays(data.created) <= 2 }>
                    New!
                </BadgeHOC>
            </Col>

            <Col className='text-end'>
                <Badge bg="purple">
                    {expiredText}
                </Badge>
            </Col>
        </Row>
    );
};

export default Card;