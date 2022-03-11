import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//components
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
import { ContainerForForm } from '../../../style/style';
//

//useform
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//

//icons
import { LoginIcon } from '../../../media';
//

//locales
import { useTranslation } from 'react-i18next';
//

//notify
import { toast } from 'react-hot-toast';
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewUserGameInfo } from '../../../store/thunks/userThunks';
import { setErrors } from '../../../store/actions/userActions';
//

export default function Settings(){
    document.title = 'Genshin Promo | Settings';
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const errorsAuth = useSelector((state) => state.user.errorsAuth);

    const schema = yup.object({
        gameNickName: yup.string().min(1, t('Игровое имя не может быть меньше 1 символа!')).max(25, t('Игровое имя  не может быть больше 25 символов!')),
        adventureLvl: yup.number().min(1, t('Уровень приключений не может быть меньше 1 символа!')).max(60, t('Уровень приключений не может быть больше 2 символов!')),
        mainChar: yup.string().min(2, t('Это поле не может быть меньше 2 символов!')).max(24, t('Это поле не может быть больше 24 символов!'))
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

    const onSubmit = data => {
        toast({title: t('Уведомление'), body: t('Успешно сохранено.'), time: t('Несколько секунд назад')}); //уведомление
        dispatch(fetchNewUserGameInfo(data));
        history.push('/profile');
    };

    if(!token){
        history.push('/');
    }

    return(
        <ContainerForForm>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="settingForm">
                    <Form.Label>
                        {t('Игровой ник')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={LoginIcon} width="100%" height="100%" />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder={t('Игровой ник')} {...register("gameNickName", { minLength: 1, maxLength: 25 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.gameNickName?.message} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="settingForm">
                    <Form.Label>
                        {t('Ранг приключений')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={LoginIcon} width="100%" height="100%" />
                        </InputGroup.Text>
                        <Form.Control type="text" defaultValue={1} placeholder={t('Ранг приключений')} {...register("adventureLvl", { minLength: 1, maxLength: 2 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.adventureLvl?.message} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="settingForm">
                    <Form.Label>
                        {t('Ваш мейн персонаж')}: 
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Image src={LoginIcon} width="100%" height="100%" />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder={t('Ваш мейн персонаж')} {...register("mainChar", { minLength: 2, maxLength: 24 })} />
                    </InputGroup>

                    <ErrorsForm message={errors.mainChar?.message} />
                </Form.Group>

                <Button type="submit" className="mt-3" variant='dark-custom'>{t('Сохранить')}</Button>
            </Form>
        </ContainerForForm>
    );
}