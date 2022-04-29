import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounse';

//components
import { Form } from 'react-bootstrap';
//

//redux
import { useAppDispatch } from '../../hooks/redux';
import { fetchSearchUsers } from '../../store/thunks/adminThunks';
//

export default function Search(){
    const dispatch = useAppDispatch();
    const [ search, setSearch ] = useState('');
    const debouncedValue = useDebounce<string>(search, 1000)

    useEffect(() => {
        dispatch(fetchSearchUsers(search));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, debouncedValue]);

    return(
        <div className="w-50">
            <Form.Control
                type="search"
                onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder="Поиск пользователей"
            />
        </div>
    );
}