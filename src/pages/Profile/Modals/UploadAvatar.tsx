import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchNewAvatar } from '../../../store/thunks/userThunks';

interface IPropsUploadAvatar {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UploadAvatar({ show, setShow }: IPropsUploadAvatar){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [ image, setImage ] = useState<File | null>(null);

    const handleClose = () => {
        setShow(false);
    };

    const upload = () => {
        if(!image) return;

        const newAvatarForm = new FormData();
        newAvatarForm.append('avatar', image);
        
        dispatch(fetchNewAvatar({ newAvatarForm }));
    };

    return(
        <Modal centered show={show} onHide={handleClose}>
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