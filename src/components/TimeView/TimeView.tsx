import React from 'react';
import dayjs from 'dayjs';
import { IChildren } from '../../types';

interface IProps extends IChildren {
    time: number;
    customFormat?: string;
};

function TimeSee({ children, time, customFormat }: IProps){
    const newDate = dayjs(time).format(customFormat || 'DD.MM.YYYY HH:mm');

    return(
        <b>
            {children}
            {newDate}
        </b>
    );
}

export default React.memo(TimeSee);