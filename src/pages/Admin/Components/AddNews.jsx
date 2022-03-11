import React, { useEffect } from 'react';

//components
import { Form, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
//

//useform
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setErrors } from '../../../store/actions/userActions';
import { fetchAddNews } from '../../../store/thunks/adminThunks';
//

//notify
import { toast } from 'react-hot-toast';
//

export default function AddNews(){
    const dispatch = useDispatch();
    const errorsAuth = useSelector((state) => state.user.errorsAuth);
    
    const schema = yup.object({
        title: yup.string().required("Это поле обязательно для заполнения!"),
        subtitle: yup.string().required("Это поле обязательно для заполнения!"),
        text: yup.string().required("Это поле обязательно для заполнения!")
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        dispatch(fetchAddNews(data));
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
            <Form.Group className="mb-3" controlId="actionFormAddNews">
                <Form.Label>
                    Заголовок:
                </Form.Label>

                <Form.Control type="text" placeholder="Заголовок" {...register("title", { required: true })} />

                <ErrorsForm message={errors.title?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormAddNews">

                <Form.Control type="text" placeholder="Под заголовок" {...register("subtitle", { required: true })} />

                <ErrorsForm message={errors.subtitle?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormAddNews">
                <Form.Label>
                    Текст новости:
                </Form.Label>
                
                <Form.Control as="textarea" placeholder="Текст новости" {...register("text", { required: true })} />

                <ErrorsForm message={errors.text?.message} />
            </Form.Group>

            <Button variant="dark-custom" type="submit">
                Создать
            </Button>
        </Form>
    );
}