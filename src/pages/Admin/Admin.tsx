import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//components
import { Row, Col } from 'react-bootstrap';
import UsersTable from './UsersTable';
import ActionButtons from './ActionButtons';
import { Container } from '../../components';
//

//redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';
//

export default function Admin(){
    document.title = 'Genshin Promo | Admin Panel';

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.user.token);
    const userinfo = useAppSelector((state) => state.user.userinfo);
    
    if(!token) navigate('/');
    if(userinfo && !userinfo.roles.includes('Admin')) navigate('/');

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return(
        <Container>
            <Row>
                <Col>
                    <UsersTable />
                </Col>
                <Col>
                    <ActionButtons />
                </Col>
            </Row>
        </Container>
    );
}