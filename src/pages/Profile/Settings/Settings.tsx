import React, { useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { IGameInfo } from '../../../types';

//components
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
import { ContainerForForm } from '../../../style/style';
//

//useform
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//

//icons
import { Rank, Id, Name } from '../../../media';
//

//locales
import { useTranslation } from 'react-i18next';
//

//notify
import { toast } from 'react-hot-toast';
//

//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchNewUserGameInfo } from '../../../store/thunks/userThunks';
import { userSlice } from '../../../store/reducers/userSlice';
//

const setErrors = userSlice.actions.setErrors;

export default function Settings(){
    document.title = 'Genshin Promo | Settings';
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.user.token);
    const errorsAuth = useAppSelector((state) => state.user.errorsAuth);

    const schema = yup.object({
        gameNickName: yup.string().min(1, t('Игровое имя не может быть меньше 1 символа!')).max(25, t('Игровое имя  не может быть больше 25 символов!')),
        adventureLvl: yup.number().min(1, t('Уровень приключений не может быть меньше 1 символа!')).max(60, t('Уровень приключений не может быть больше 2 символов!')),
        mainChar: yup.string().min(2, t('Это поле не может быть меньше 2 символов!')).max(24, t('Это поле не может быть больше 24 символов!'))
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<IGameInfo>({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if(errorsAuth){
            toast.error(errorsAuth); //уведомление
            dispatch(setErrors(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsAuth]);

    const onSubmit: SubmitHandler<IGameInfo> = data => {
        toast.success(t('Успешно сохранено.')); //уведомление
        dispatch(fetchNewUserGameInfo(data));
        navigate('/profile');
    };

    if(!token) return <Navigate to="/auth/login" state={{ from: location }} replace />;

    return(
        <ContainerForForm>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="settingForm">
                    <Form.Label>
                        {t('Игровой ник')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={Name} width="18px" height="100%" />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder={t('Игровой ник')} {...register("gameNickName", { required: true, minLength: 1, maxLength: 25 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.gameNickName?.message} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="settingForm">
                    <Form.Label>
                        {t('Ранг приключений')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={Rank} width="18px" height="100%" />
                        </InputGroup.Text>
                        <Form.Control type="text" defaultValue={1} placeholder={t('Ранг приключений')} {...register("adventureLvl", { required: true, minLength: 1, maxLength: 2 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.adventureLvl?.message} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="settingForm">
                    <Form.Label>
                        {t('Ваш мейн персонаж')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={Id} width="18px" height="100%" />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder={t('Ваш мейн персонаж')} {...register("mainChar", { required: true, minLength: 2, maxLength: 24 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.mainChar?.message} />
                </Form.Group>

                <Button type="submit" className="mt-3" variant='dark-custom'>{t('Сохранить')}</Button>
            </Form>
        </ContainerForForm>
    );
}