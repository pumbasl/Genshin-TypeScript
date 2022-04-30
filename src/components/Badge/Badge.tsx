import React from 'react';
import { Badge as BadgeBootstrap } from 'react-bootstrap';

interface BadgeProps {
    children: React.ReactNode;
    check: boolean;
}

const Badge = ({ check, children }: BadgeProps) => {
    if(check) return <BadgeBootstrap bg='purple'>{children}</BadgeBootstrap>;

    return null;
}

export default Badge;