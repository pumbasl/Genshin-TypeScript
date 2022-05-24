import React, { useEffect } from 'react';
import {
    Modal,
    Button,
    Form,
    InputGroup,
    Image
} from 'react-bootstrap';
import { ErrorsForm } from '../../../components';
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { userSlice } from '../../../store/reducers/userSlice';
import { adminSlice } from '../../../store/reducers/adminSlice';
import { fetchLogOutUser, fetchEditUser } from '../../../store/thunks/adminThunks';
import { LoginIcon } from '../../../media';
import { toast } from 'react-hot-toast';

//actions
const setErrors = userSlice.actions.setErrors;
const setUsers = adminSlice.actions.setAdminUsers;

export default function ActionUswerModal({ show, close, data }){
    const dispatch = useAppDispatch();
    const errorsAuth = useAppSelector((state) => state.user.errorsAuth);
    const users = useAppSelector((state) => state.admin.users);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    const onSubmit = resultForm => {
        resultForm.id = data._id;
        dispatch(fetchEditUser(resultForm));
        console.log(resultForm)

        users.forEach((value, index) => {
            if(value._id === data._id){
                users[index].login = resultForm.login;
                users[index].roles = [resultForm.role];
                dispatch(setUsers(users));
            }
        });

        close(); //закрыть модальное окно
    };

    const LogOutUser = data => {
        dispatch(fetchLogOutUser(data._id));
    };
 
    const RolesParse = (data) => {
        if(data?.constructor === Array){
            return data[0];
        } else {
            return false;
        }
    };

    useEffect(() => {
        if(errorsAuth){
            toast.error(errorsAuth); //уведомление
            dispatch(setErrors(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsAuth]);

    useEffect(() => {
        (() => {
            if(data){
                reset({
                    login: data.login,
                    role: RolesParse(data.roles)
                });
            }
        })()
    }, [data, reset]);

    if(!data) return null;

    return(
        <Modal show={show} onHide={close} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Изменение пользователя: <b>{ data.login }</b>
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="actionFormLogin">
                        <Form.Label>
                            Логин:
                        </Form.Label>

                        <InputGroup>
                            <InputGroup.Text>
                                <Image src={LoginIcon} width="100%" height="100%" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Логин"
                                {...register("login", {
                                    required: 'Это поле обязательно для заполнения!',
                                    minLength: {
                                        value: 4,
                                        message: 'Логин не может быть меньше 4 символов!'
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: 'Логин не может быть больше 25 символов!'
                                    }
                                })} />
                        </InputGroup>

                        <ErrorsForm message={errors.login?.message} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="actionFormAccess">
                        <Form.Label>
                            Доступ: &nbsp;
                        </Form.Label>

                        <Form.Check
                            inline
                            type='radio'
                            label='Admin'
                            value='Admin'
                            {...register("role", { required: 'Это поле обязательно для заполнения!'})}
                        />

                        <Form.Check
                            inline
                            type='radio'
                            label='User'
                            value='User'
                            {...register("role", { required: 'Это поле обязательно для заполнения!'})}
                        />

                        <ErrorsForm message={errors.role?.message} />
                    </Form.Group>

                    <Button variant="dark-custom" onClick={() => LogOutUser(data)}>Сбросить авторизацию</Button>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={close}>
                        Закрыть
                    </Button>

                    <Button type="submit" className="text-light" variant="info">
                        Сохранить
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    );
}