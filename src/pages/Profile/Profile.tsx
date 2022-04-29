import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { IStateButton } from '../../types';

//components
import { Container, Avatar, TableWithInfo, Preloader } from '../../components';
import { Row, Col, Button, ButtonGroup, Badge } from 'react-bootstrap';
//

//locales
import { useTranslation } from 'react-i18next';
//

//redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';
//

export default function Profile(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const token = useAppSelector((state) => state.user.token);
    const data = useAppSelector((state) => state.user.userinfo);
    const [ stateButton, setStateButton ] = useState<IStateButton>({
        text: 'Изменить аватарку',
        disabled: false
    });
    
    document.title = 'Genshin Promo | Profile';

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    if(!token) navigate('/');

    if(!data){
        return(
            <Container>
                <Preloader />
            </Container>
        );
    }

    const handleOpenModal = () => {
        setStateButton({
            text: 'Загрузка...',
            disabled: true
        });
        navigate('upload');
    };

    return(
        <Container>
            <Suspense fallback={<Preloader fixed />}>
                <Outlet context={{ setStateButton }} />
            </Suspense>

            <Row>
                <Col className="text-center">
                    <Avatar type="rounded"/>
                    <div>
                        <Badge bg="info">{t('1MB максимальный размер фотографии.')}</Badge>
                    </div>
                    <div className="mt-2">
                        <Button
                            variant="dark-custom"
                            onClick={handleOpenModal}
                            disabled={stateButton.disabled}
                        >
                            {t(stateButton.text)}
                        </Button>

                    </div>
                </Col>
                <Col>
                    <TableWithInfo data={data} />  
                    <div className="text-center">
                        <ButtonGroup>
                            <Button as={Link as any} to="/profile/settings" variant="dark-custom">
                                {t('Изменить данные')}
                            </Button>
                            {
                                data.roles.includes('Admin') ? (
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