import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

//components
import { Container, Avatar, TableWithInfo, Preloader } from '../../components';
import { Row, Col, Button, ButtonGroup, Badge } from 'react-bootstrap';
//

//locales
import { useTranslation } from 'react-i18next';
//

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../store/thunks/userThunks';
import UploadAvatar from './Modals/UploadAvatar';
//

export default function Profile(){
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [ showModal, setShowModal ] = useState(false);
    const token = useSelector((state) => state.user.token);
    const data = useSelector((state) => state.user.userinfo);
    document.title = 'Genshin Promo | Profile';

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    if(!token){
        history.push('/');
    }

    if(!data){
        return(
            <Container>
                <Preloader fetch />
            </Container>
        );
    }

    const handleOpenModal = () => setShowModal(true);

    return(
        <Container>
            <UploadAvatar show={showModal} close={() => setShowModal(false)} />
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
                        >
                            {t('Изменить аватарку')}
                        </Button>

                    </div>
                </Col>
                <Col>
                    <TableWithInfo data={data} />  
                    <div className="text-center">
                        <ButtonGroup>
                            <Button as={Link} to="/profile/settings" variant="dark-custom">
                                {t('Изменить данные')}
                            </Button>
                            {
                                data.roles.includes('Admin') ? (
                                    <Button as={Link} to="/admin" variant="danger">
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