import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ContainerForForm } from '../../style/style';
import { ErrorsForm } from '../../components';
import { LoginIcon, PasswordIcon } from '../../media';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRegistration } from '../../store/thunks/userThunks';
import { userSlice } from '../../store/reducers/userSlice';
import { IRegistradionData } from '../../types';

const setErrors = userSlice.actions.setErrors;

export default function Registration(){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.user.token);
    const errorsAuth = useAppSelector((state) => state.user.errorsAuth);

    const { register, handleSubmit, formState: { errors } } = useForm<IRegistradionData>({
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
        if(token){
            toast.success(t('Вы успешно зарегистрировались.')); //уведомление
            navigate('/', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const onSubmit: SubmitHandler<IRegistradionData> = data => {
        data.server = "Europe";
        dispatch(fetchRegistration(data));
    };

    return(
        <ContainerForForm>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="loginForm">
                    <Form.Label>
                        {t('Логин')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={LoginIcon} width="100%" height="100%" />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder={t('Логин')}
                            {...register("login", { 
                                required: t('Это поле обязательно для заполнения!'),
                                minLength: {
                                    value: 4,
                                    message: t('Логин не может быть меньше 4 символов!')
                                },
                                maxLength: {
                                    value: 25,
                                    message: t('Логин не может быть больше 25 символов!')
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: t('Логин может состоять только из латинских символов и цифр.')
                                }
                            })} />
                    </InputGroup>

                    <ErrorsForm message={errors.login?.message} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        {t('Пароль')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={PasswordIcon} width="100%" height="100%" />
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder={t('Пароль')}
                            {...register("password", {
                                required: t('Это поле обязательно для заполнения!'),
                                minLength: {
                                    value: 4,
                                    message: t('Пароль не может быть меньше 4 символов!')
                                }
                            })} />
                    </InputGroup>

                    <ErrorsForm message={errors.password?.message} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={PasswordIcon} width="100%" height="100%" />
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder={t('Повторите пароль')}
                            {...register("re_password", {
                                required: t('Это поле обязательно для заполнения!'),
                                minLength: {
                                    value: 4,
                                    message: t('Пароль не может быть меньше 4 символов!')
                                }
                            })} />
                    </InputGroup>

                    <ErrorsForm message={errors.re_password?.message} />
                </Form.Group>

                <Button type="submit" className="mt-3" variant='dark-custom'>{t('Создать профиль')}</Button>
            </Form>
        </ContainerForForm>
    );
}