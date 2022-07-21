import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IStateButton } from '../../../types';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchNewAvatar } from '../../../store/thunks/userThunks';

interface IStateContext {
    setStateButton: React.Dispatch<React.SetStateAction<IStateButton>>;
};

export default function UploadAvatar(){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { setStateButton } = useOutletContext<IStateContext>();
    const [ image, setImage ] = useState<File | null>(null);

    const handleClose = () => {
        setStateButton({
            text: 'Изменить аватарку',
            disabled: false
        });
        navigate('/profile');
    };

    const upload = () => {
        if(!image) return;

        const newAvatarForm = new FormData();
        newAvatarForm.append('avatar', image);
        
        dispatch(fetchNewAvatar({ newAvatarForm }));
        
        setStateButton({
            text: 'Изменить аватарку',
            disabled: false
        });
        navigate('/profile');
        
    };

    return(
        <Modal centered show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {t('Изменение аватарки')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setImage(e.currentTarget.files![0]) }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('Закрыть')}
                </Button>

                <Button variant="success" onClick={upload}>
                    {t('Изменить аватарку')}
                </Button>
            </Modal.Footer>
      </Modal>
    );
}