import React, { useState } from 'react';

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

interface IProps {
    show: boolean;
    close: () => void;
};

export default function UploadAvatar({ show, close }: IProps){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const avatarRef = useAppSelector((state) => state.user?.userinfo?.avatar?.ref);
    const [ image, setImage ] = useState<File | null>(null);

    const upload = () => {
        if(!image) return;
        
        const fileExt = image.name.split('.').pop();

        const randomName = `${uuidv4()}.${fileExt}`;
        const imageRef = ref(storage, `/avatars/${randomName}`);

        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                dispatch(fetchNewAvatar(url, imageRef.fullPath));
                close();
            }).catch((error) => {
                console.log(error);
            });

            if(avatarRef){
                const oldAvatarRef = ref(storage, avatarRef);
                deleteObject(oldAvatarRef).then(() => {
                    console.log('old image deleted');
                }).catch((error) => {
                    console.log(error);
                });
            }

            toast.success(t('Аватарка успешно изменена.')); //уведомление
        });
    };

    return(
        <Modal centered show={show} onHide={close}>
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
                <Button variant="secondary" onClick={close}>
                    {t('Закрыть')}
                </Button>

                <Button variant="success" onClick={upload}>
                    {t('Изменить аватарку')}
                </Button>
            </Modal.Footer>
      </Modal>
    );
}