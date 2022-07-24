import React, { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Container, Avatar, TableWithInfo, Preloader } from '../../components';
import { Row, Col, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';
import UploadAvatar from './Modals/UploadAvatar';

export default function Profile(){
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { token, userinfo } = useAppSelector((state) => state.user);
    const [ show, setShow ] = useState(false);
    
    document.title = 'Genshin Promo | Profile';

    useEffect(() => {
        if(token) dispatch(fetchUserInfo());
    }, [dispatch, token]);

    if(!token) return <Navigate to="/auth/login" state={{ from: location }} replace />;

    if(!userinfo){
        return(
            <Container>
                <Preloader />
            </Container>
        );
    }

    return(
        <Container>
            <UploadAvatar show={show} setShow={setShow} />

            <Row>
                <Col className="text-center">
                    <Avatar type="rounded"/>
                    <div>
                        <Badge bg="info">{t('1MB максимальный размер фотографии.')}</Badge>
                    </div>
                    <div className="mt-2">
                        <Button
                            variant="dark-custom"
                            onClick={() => setShow(true)}
                        >
                            {t('Изменить аватарку')}
                        </Button>

                    </div>
                </Col>
                <Col>
                    <TableWithInfo data={userinfo} />  
                    <div className="text-center">
                        <ButtonGroup>
                            <Button as={Link as any} to="/profile/settings" variant="dark-custom">
                                {t('Изменить данные')}
                            </Button>
                            {
                                userinfo.roles.includes('Admin') ? (
                                    <Button as={Link as any} to="/admin" variant="danger">
                                        Admin Panel
                                    </Button>
                                ) : (
                                    null
                                )
                            }
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}