import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { userSlice } from '../../../store/reducers/userSlice';
import { fetchAddNews } from '../../../store/thunks/adminThunks';
import { toast } from 'react-hot-toast';

//actions
const setErrors = userSlice.actions.setErrors;

interface IAddNews {
    title: string;
    subtitle: string;
    text: string;
};

export default function AddNews(){
    const dispatch = useAppDispatch();
    const errorsAuth = useAppSelector((state) => state.user.errorsAuth);

    const { register, handleSubmit, formState: { errors } } = useForm<IAddNews>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<IAddNews> = data => {
        dispatch(fetchAddNews(data));
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
            <Form.Group className="mb-3" controlId="actionFormAddNews">
                <Form.Label>
                    Заголовок:
                </Form.Label>

                <Form.Control
                    type="text"
                    placeholder="Заголовок"
                    {...register("title", {
                        required: "Это поле обязательно для заполнения!"
                    })} />

                <ErrorsForm message={errors.title?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormAddNews">

                <Form.Control
                    type="text"
                    placeholder="Под заголовок"
                    {...register("subtitle", {
                        required: "Это поле обязательно для заполнения!"
                    })} />

                <ErrorsForm message={errors.subtitle?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormAddNews">
                <Form.Label>
                    Текст новости:
                </Form.Label>
                
                <Form.Control
                    as="textarea"
                    placeholder="Текст новости"
                    {...register("text", {
                        required: "Это поле обязательно для заполнения!"
                    })} />

                <ErrorsForm message={errors.text?.message} />
            </Form.Group>

            <Button variant="dark-custom" type="submit">
                Создать
            </Button>
        </Form>
    );
}