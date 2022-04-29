import React, { useEffect } from 'react';

//components
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
//

//icons
import { TextIcon } from '../../../media';
//

//useform
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//

//redux
import { userSlice } from '../../../store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchAddPromoCode } from '../../../store/thunks/adminThunks';
//

//notify
import { toast } from 'react-hot-toast';
//


//actions
const setErrors = userSlice.actions.setErrors;

interface IAddPromo {
    code: string;
    server: 'All' | 'Europe' | 'America' | 'Asia';
    expired: string;
};

export default function AddPromo(){
    const dispatch = useAppDispatch();
    const errorsAuth = useAppSelector((state) => state.user.errorsAuth);
    
    const schema = yup.object({
        code: yup.string()
        .required("Это поле обязательно для заполнения!"),

        server: yup.string()
        .required("Это поле обязательно для заполнения!"),

        expired: yup.string()
        .required("Это поле обязательно для заполнения!")

    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<IAddPromo>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IAddPromo> = data => {
        dispatch(fetchAddPromoCode(data));
    };
    
    useEffect(() => {
        if(errorsAuth){
            toast.error(errorsAuth); //уведомление
            dispatch(setErrors(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsAuth]);

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="actionFormAddCode">
                <Form.Label>
                    Промокод:
                </Form.Label>

                <InputGroup>
                    <InputGroup.Text>
                        <Image src={TextIcon} width="100%" height="100%" />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Промокод" {...register("code", { required: true })} />
                </InputGroup>

                <ErrorsForm message={errors.code?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormServer">
                <Form.Label>
                    Выберите сервер:
                </Form.Label>

                <Form.Select {...register("server", { required: true })}>
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>America</option>
                    <option>All</option>
                </Form.Select>

                <ErrorsForm message={errors.server?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormDate">
                <Form.Label className="me-2">
                    Дата просрочки кода:
                </Form.Label>

                <Form.Control
                    type="datetime-local"
                    {...register("expired", { required: true })}
                />

                <ErrorsForm message={errors.expired?.message} />
            </Form.Group>

            <Button variant="dark-custom" type="submit">Создать</Button>
        </Form>
    );
}