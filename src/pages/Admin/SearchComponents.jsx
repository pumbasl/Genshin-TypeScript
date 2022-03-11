import React, { useEffect, useState, useMemo, useCallback } from 'react';
import debounce from "lodash.debounce";

//components
import { Form } from 'react-bootstrap';
//

//redux
import { useDispatch } from 'react-redux';
import { fetchSearchUsers } from '../../store/thunks/adminThunks';
//

export default function Search(){
    const dispatch = useDispatch();
    const [ search, setSearch ] = useState('');
    const [ firstRender, setFirstRender ] = useState(true);

    const changeHandler = useCallback(
        event => {
            setSearch(event.target.value);
        }, []);

    const debouncedChangeHandler = useMemo(() => debounce(val => {
        changeHandler(val);
    }, 1000), [changeHandler]);

    useEffect(() => {
        if(firstRender){
            setFirstRender(false);
        } else {
            dispatch(fetchSearchUsers(search));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, search]);

    return(
        <div className="w-50">
            <Form.Control
                type="search"
                onChange={debouncedChangeHandler}
                placeholder="Поиск пользователей"
            />
        </div>
    );
}