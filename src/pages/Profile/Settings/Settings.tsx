import React, { useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { IGameInfo } from '../../../types';
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
import { ContainerForForm } from '../../../style/style';
import { useForm, SubmitHandler } from "react-hook-form";
import { Rank, Id, Name } from '../../../media';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchNewUserGameInfo, fetchUserInfo } from '../../../store/thunks/userThunks';
import { userSlice } from '../../../store/reducers/userSlice';

const setErrors = userSlice.actions.setErrors;

export default function Settings(){
    document.title = 'Genshin Promo | Settings';
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { token, errorsAuth, userinfo } = useAppSelector((state) => state.user);

    const { register, handleSubmit, formState: { errors } } = useForm<IGameInfo>({
        mode: 'onChange'
    });

    useEffect(() => {
        if(errorsAuth){
            toast.error(errorsAuth); //уведомление
            dispatch(setErrors(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsAuth]);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

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
                        <Form.Control
                            type="text"
                            placeholder={t('Игровой ник')}
                            defaultValue={userinfo?.gameInfo?.gameNickName}
                            {...register("gameNickName", {
                                required: t('Это поле обязательно для заполнения!'),
                                minLength: {
                                    value: 1,
                                    message: t('Игровое имя не может быть меньше 1 символа!')
                                },
                                maxLength: {
                                    value: 25,
                                    message: t('Игровое имя  не может быть больше 25 символов!')
                                }
                            })} />
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
                        <Form.Control
                            type="number"
                            placeholder={t('Ранг приключений')}
                            defaultValue={userinfo?.gameInfo?.adventureLvl}
                            {...register("adventureLvl", {
                                required: t('Это поле обязательно для заполнения!'),
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: t('Уровень приключений не может быть меньше 1 уровня!')
                                },
                                max: {
                                    value: 60,
                                    message: t('Уровень приключений не может быть больше 60 уровня!')
                                }
                            })} />
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
                        <Form.Control 
                            type="text"
                            placeholder={t('Ваш мейн персонаж')}
                            defaultValue={userinfo?.gameInfo?.mainChar}
                            {...register("mainChar", {
                                required: t('Это поле обязательно для заполнения!'),
                                minLength: {
                                    value: 2,
                                    message: t('Это поле не может быть меньше 2 символов!')
                                },
                                maxLength: {
                                    value: 24,
                                    message: t('Это поле не может быть больше 24 символов!')
                                }
                            })} />
                    </InputGroup>

                    <ErrorsForm message={errors.mainChar?.message} />
                </Form.Group>

                <Button type="submit" className="mt-3" variant='dark-custom'>{t('Сохранить')}</Button>
            </Form>
        </ContainerForForm>
    );
}