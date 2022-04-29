import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IStateButton } from '../../../types';

//components
import { Modal, Button, Form } from 'react-bootstrap';
//

//locales
import { useTranslation } from 'react-i18next';
//

//firebase
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from '../../../config/firebase';
//

//notify
import { toast } from 'react-hot-toast';
//

//uuid
import { v4 as uuidv4 } from 'uuid';
//

//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchNewAvatar } from '../../../store/thunks/userThunks';
//

interface IStateContext {
    setStateButton: React.Dispatch<React.SetStateAction<IStateButton>>;
};

export default function UploadAvatar(){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { setStateButton } = useOutletContext<IStateContext>();
    const avatarRef = useAppSelector((state) => state.user?.userinfo?.avatar?.ref);
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
        
        const fileExt = image.name.split('.').pop();

        const randomName = `${uuidv4()}.${fileExt}`;
        const imageRef = ref(storage, `/avatars/${randomName}`);

        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                dispatch(fetchNewAvatar(url, imageRef.fullPath));
                handleClose();
            }).catch((error) => {
                console.log(error);
                toast.error(error);
            });

            if(avatarRef){
                const oldAvatarRef = ref(storage, avatarRef);
                deleteObject(oldAvatarRef).then(() => {
                    console.log('old image deleted');
                }).catch((error) => {
                    console.log(error);
                    toast.error(error);
                });
            }

            toast.success(t('Аватарка успешно изменена.')); //уведомление
        });
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