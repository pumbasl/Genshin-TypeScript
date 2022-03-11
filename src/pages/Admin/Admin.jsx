import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//components
import { Row, Col } from 'react-bootstrap';
import UsersTable from './UsersTable';
import ActionButtons from './ActionButtons';
import { Container } from '../../components';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';
//

export default function Admin(){
    document.title = 'Genshin Promo | Admin Panel';

    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector((state) => state.user.token);
    const userinfo = useSelector((state) => state.user.userinfo);
    
    if(!token) history.push('/');
    if(userinfo && !userinfo.roles.includes('Admin')) history.push('/');

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