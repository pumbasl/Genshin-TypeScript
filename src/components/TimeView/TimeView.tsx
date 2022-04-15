import React from 'react';
import { format } from 'date-fns';

interface IProps {
    children?: React.ReactNode;
    time: number;
    customFormat?: string;
};

export default function TimeSee({ children, time, customFormat }: IProps){
    const date = format(time, customFormat || 'dd.MM.yyyy HH:mm')

    return(
        <b>
            {children}
            {date}
        </b>
    );
}