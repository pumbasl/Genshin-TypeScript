import React from 'react';
import dayjs from 'dayjs';

interface IProps {
    children?: React.ReactNode;
    time: number;
    customFormat?: string;
};

export default function TimeSee({ children, time, customFormat }: IProps){
    const newDate = dayjs(time).format(customFormat || 'DD.MM.YYYY HH:mm');

    return(
        <b>
            {children}
            {newDate}
        </b>
    );
}