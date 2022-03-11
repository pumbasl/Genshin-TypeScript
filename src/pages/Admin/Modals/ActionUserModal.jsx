import React, { useEffect } from 'react';

//componentns
import {
    Modal,
    Button,
    Form,
    InputGroup,
    Image
} from 'react-bootstrap';
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
import { setUsers } from '../../../store/actions/adminActions';
import { fetchLogOutUser, fetchEditUser } from '../../../store/thunks/adminThunks';
//

//icons
import { LoginIcon } from '../../../media';
//

//notify
import { toast } from 'react-hot-toast';
//

export default function ActionUswerModal({ show, close, data }){
    const dispatch = useDispatch();
    const errorsAuth = useSelector((state) => state.user.errorsAuth);
    const users = useSelector((state) => state.admin.users);

    const schema = yup.object({
        login: yup.string().required("Это поле обязательно для заполнения!").min(4, "Логин не может быть меньше 4 символов!").max(25, "Логин не может быть больше 25 символов!"),
        role: yup.string().required("Это поле обязательно для заполнения!")
    }).required();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = resultForm => {
        resultForm.id = data._id;
        dispatch(fetchEditUser(resultForm));

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
            toast({title: "Уведомление", body: errorsAuth, time: "Несколько секунд назад"}); //уведомление
            dispatch(setErrors(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsAuth]);

    useEffect(() => {
        (() => {
            reset({
                login: data.login,
                role: RolesParse(data.roles)
            });
        })()
    }, [data, reset]);

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
                            <Form.Control type="text" placeholder="Логин" {...register("login", { minLength: 4, maxLength: 24 })} />
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
                            {...register("role")}
                        />

                        <Form.Check
                            inline
                            type='radio'
                            label='User'
                            value='User'
                            {...register("role")}
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