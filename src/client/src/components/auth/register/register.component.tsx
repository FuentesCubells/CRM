import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { registerUser } from '../../../services/auth.service';

import UIInputText from '../../../ui/inputs/text-input.ui';
import UIInputPassword from '../../../ui/inputs/password-input.ui';
import { Button } from "primereact/button";

import '../auth.component.scss';

const schema = yup.object({
    first_name: yup.string().required('Nombre requerido').default(''),
    last_name: yup.string().required('Apellido requerido').default(''),
    email: yup.string().email('Correo inválido').required('Correo requerido').default(''),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida').default(''),
    confirm_password: yup.string()
        .oneOf([yup.ref('password'), ''], 'Las contraseñas deben coincidir')
        .required('Confirmación de contraseña requerida')
        .default(''),
});

type FormData = yup.InferType<typeof schema>;


const RegisterComponent: React.FC<any> = ({ hasAuthCallback }) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>(
        {
            resolver: yupResolver(schema),
            mode: 'onChange',
            reValidateMode: 'onChange',
            defaultValues: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: '',
            },
        }
    );

    const onSubmit = async (data: FormData) => {
        try {
            const result = await registerUser(data);
            console.log('Registration successful:', result);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const hasAuth = () => {
        hasAuthCallback(true);
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>

            <section className="auth-form__header">
                <h1 className="auth-form__title">Register</h1>
                <p className="auth-form__subtitle">Create a new account</p>
            </section>

            <section className="auth-form__input-two-columns">
                <UIInputText
                    id="first_name"
                    label='Nombre'
                    placeholder='Tu nombre'
                    registration={register('first_name')}
                    error={errors.first_name?.message}
                />

                <UIInputText
                    id="last_name"
                    label='Apellido'
                    placeholder='Tu apellido'
                    registration={register('last_name')}
                    error={errors.last_name?.message}
                />
            </section>

            <UIInputText
                id="email"
                label='Email'
                placeholder='ejemplo@email.com'
                registration={register('email')}
                error={errors.email?.message}
            />

            <section className='auth-form__input-two-columns'>
                <UIInputPassword
                    id="password"
                    label='Contraseña'
                    placeholder='Contraseña'
                    registration={register('password')}
                    error={errors.password?.message}
                />

                <UIInputPassword
                    id="confirm_password"
                    label='Confirmar Contraseña'
                    placeholder='Confirmar Contraseña'
                    registration={register('confirm_password')}
                    error={errors.confirm_password?.message}
                />
            </section>

            <fieldset className="auth-form__actions">
                <Button type="submit" label="Register" icon="pi pi-user-plus" disabled={!isValid} />
            </fieldset>

            <footer className="auth-form__footer">
                <p>¿Tienes una cuenta?</p>
                <p onClick={() => hasAuth()}>Iniciar sesión</p>
            </footer>
        </form>
    )
};


export default RegisterComponent;