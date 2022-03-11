import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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

//notify
import { toast } from 'react-hot-toast';
//

//locales
import { useTranslation } from 'react-i18next';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegistration } from '../../store/thunks/userThunks';
import { setErrors } from '../../store/actions/userActions';
//

export default function Registration(){
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
        .min(4, t('Пароль не может быть меньше 4 символов!')),

        re_password: yup.string()
        .required(t('Это поле обязательно для заполнения!'))
        .min(4, t('Пароль не может быть меньше 4 символов!'))
        .oneOf([yup.ref('password'), null], t('Пароли не совпадают.'))
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
            toast({title: t('Уведомление'), body: t('Вы успешно зарегистрировались.'), time: t('Несколько секунд назад')}); //уведомление
            history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const onSubmit = data => {
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
                        <Form.Control type="text" placeholder={t('Логин')} {...register("login", { required: true, minLength: 4, maxLength: 24 })} />
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
                        <Form.Control type="password" placeholder={t('Пароль')} {...register("password", { required: true, minLength: 4 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.password?.message} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={PasswordIcon} width="100%" height="100%" />
                        </InputGroup.Text>
                        <Form.Control type="password" placeholder={t('Повторите пароль')} {...register("re_password", { required: true, minLength: 4 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.re_password?.message} />
                </Form.Group>

                <Button type="submit" className="mt-3" variant='dark-custom'>{t('Создать профиль')}</Button>
            </Form>
        </ContainerForForm>
    );
}