import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import UsersTable from './UsersTable';
import ActionButtons from './ActionButtons';
import { Container } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';

export default function Admin(){
    document.title = 'Genshin Promo | Admin Panel';

    const dispatch = useAppDispatch();
    const location = useLocation();
    const token = useAppSelector((state) => state.user.token);
    const userinfo = useAppSelector((state) => state.user.userinfo);

    useEffect(() => {
        if(token) dispatch(fetchUserInfo());
    }, [dispatch, token]);
    
    if(!token) return <Navigate to="/" state={{ from: location }} replace />;
    if(userinfo && !userinfo.roles.includes('Admin')) return <Navigate to="/" state={{ from: location }} replace />;

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