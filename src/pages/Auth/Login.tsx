import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ContainerForForm } from '../../style/style';
import { ErrorsForm } from '../../components';
import { LoginIcon, PasswordIcon } from '../../media';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchLogin } from '../../store/thunks/userThunks';
import { userSlice } from '../../store/reducers/userSlice';

const setErrors = userSlice.actions.setErrors;

interface ILoginForm {
    login: string;
    password: string;
};

export default function Login(){
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.user.token);
    const errorsAuth = useAppSelector((state) => state.user.errorsAuth);

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
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
            toast.success(t('Вы успешно авторизовались.')); //уведомление
            navigate('/', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const onSubmit: SubmitHandler<ILoginForm> = data => {
        dispatch(fetchLogin(data));
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

                <Form.Group>
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

                    <br />

                    <Form.Text className="text-light">
                        <Link to="/auth/restore_password" className="custom-link">{t('Забыли пароль')}?</Link>
                    </Form.Text>
                </Form.Group>

                <Button type="submit" className="mt-3" variant='dark-custom'>{t('Авторизоваться')}</Button>
            </Form>
        </ContainerForForm>
    );
}