import React, { useEffect } from 'react';
import { Form, InputGroup, Image, Button } from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
import { TextIcon, LinkIcon } from '../../../media';
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { userSlice } from '../../../store/reducers/userSlice';
import { fetchAddWebEvent } from '../../../store/thunks/adminThunks';
import { toast } from 'react-hot-toast';
import { IWebEventsData } from '../../../types';

//actions
const setErrors = userSlice.actions.setErrors;

export default function AddPromo(){
    const dispatch = useAppDispatch();
    const errorsAuth = useAppSelector((state) => state.user.errorsAuth);

    const { register, handleSubmit, formState: { errors } } = useForm<IWebEventsData>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<IWebEventsData> = data => {
        if(data.expired) dispatch(fetchAddWebEvent(data));
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
                    Название ивента:
                </Form.Label>

                <InputGroup>
                    <InputGroup.Text>
                        <Image src={TextIcon} width="100%" height="100%" />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Ивент"
                        {...register("name", {
                            required: "Это поле обязательно для заполнения!"
                        })} />
                </InputGroup>

                <ErrorsForm message={errors.name?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormAddCode">
                <Form.Label>
                    Ссылка:
                </Form.Label>

                <InputGroup>
                    <InputGroup.Text>
                        <Image src={LinkIcon} width="100%" height="100%" />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Ссылка"
                        {...register("link", {
                            required: "Это поле обязательно для заполнения!"
                        })} />
                </InputGroup>

                <ErrorsForm message={errors.link?.message} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actionFormDate">
                <Form.Label className="me-2">
                    Дата окончания:
                </Form.Label>

                <Form.Control
                    type="datetime-local"
                    {...register("expired", {
                        required: "Это поле обязательно для заполнения!",
                        valueAsDate: true
                    })}
                />

                <ErrorsForm message={errors.expired?.message} />
            </Form.Group>

            <Button variant="dark-custom" type="submit">Создать</Button>
        </Form>
    );
}