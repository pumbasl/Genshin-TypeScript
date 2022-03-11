import React from 'react';
import { format } from 'date-fns';

export default function TimeSee({ children, time, customFormat }){
    const date = format(time, customFormat || 'dd.MM.yyyy HH:mm')

    return(
        <b>
            {children}
            {date}
        </b>
    );
}