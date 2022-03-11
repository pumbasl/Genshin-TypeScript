import React, { useEffect } from 'react';

//components
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
//

//icons
import { TextIcon, LinkIcon } from '../../../media';
//

//useform
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setErrors } from '../../../store/actions/userActions';
import { fetchAddWebEvent } from '../../../store/thunks/adminThunks';
//

//notify
import { toast } from 'react-hot-toast';
//

export default function AddPromo(){
    const dispatch = useDispatch();
    const errorsAuth = useSelector((state) => state.user.errorsAuth);
    
    const schema = yup.object({
        name: yup.string()
        .required("Это поле обязательно для заполнения!"),

        expired: yup.string()
        .required("Это поле обязательно для заполнения!")

    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        data.expired = Date.parse(data.expired);
        dispatch(fetchAddWebEvent(data));
    };
    
    useEffect(() => {
        if(errorsAuth){
            toast({title: "Уведомление", body: errorsAuth, time: "Несколько секунд назад"}); //уведомление
            dispatch(setErrors(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsAuth]);

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="actionFormAddCode">
                <Form.Label>
                    Название ивента:
                </Form.Label>

                <InputGroup>
                    <InputGroup.Text>
                        <Image src={TextIcon} width="100%" height="100%" />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Ивент" {...register("name", { required: true })} />
                </InputGroup>

                <ErrorsForm message={errors.code?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormAddCode">
                <Form.Label>
                    Ссылка:
                </Form.Label>

                <InputGroup>
                    <InputGroup.Text>
                        <Image src={LinkIcon} width="100%" height="100%" />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Ссылка" {...register("link", { required: true })} />
                </InputGroup>

                <ErrorsForm message={errors.code?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormDate">
                <Form.Label className="me-2">
                    Дата окончания:
                </Form.Label>

                <Form.Control
                    type="datetime-local"
                    {...register("expired", { required: true })}
                />

                <ErrorsForm message={errors.date?.message} />
            </Form.Group>

            <Button variant="dark-custom" type="submit">Создать</Button>
        </Form>
    );
}