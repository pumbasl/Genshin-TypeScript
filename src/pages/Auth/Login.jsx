import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

//useform
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//

//components
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ContainerForForm } from '../../style/style';
import { ErrorsForm } from '../../components';
//

//icons
import { LoginIcon, PasswordIcon } from '../../media';
//

//locales
import { useTranslation } from 'react-i18next';
//

//notify
import { toast } from 'react-hot-toast';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../store/thunks/userThunks';
import { setErrors } from '../../store/actions/userActions';
//

export default function Login(){
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector((state) => state.user.token);
    const errorsAuth = useSelector((state) => state.user.errorsAuth);

    const schema = yup.object({
        login: yup.string()
        .required(t('Это поле обязательно для заполнения!'))
        .min(4, t('Логин не может быть меньше 4 символов!'))
        .max(25, t('Логин не может быть больше 25 символов!'))
        .matches(/^[a-zA-Z0-9]+$/, t('Логин может состоять только из латинских символов и цифр.')),

        password: yup.string()
        .required(t('Это поле обязательно для заполнения!'))
        .min(4, t('Пароль не может быть меньше 4 символов!'))
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if(errorsAuth){
            toast({title: t('Уведомление'), body: errorsAuth, time: t('Несколько секунд назад')}); //уведомление
            dispatch(setErrors(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsAuth]);

    useEffect(() => {
        if(token){
            toast({title: t('Уведомление'), body: t('Вы успешно авторизовались.'), time: t('Несколько секунд назад')}); //уведомление
            history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const onSubmit = data => {
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
                        <Form.Control type="text" placeholder={t('Логин')} {...register("login", { required: true, minLength: 4, maxLength: 24 })} />
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
                        <Form.Control type="password" placeholder={t('Пароль')} {...register("password", { required: true, minLength: 4 })} />
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