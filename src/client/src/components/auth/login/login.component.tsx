import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { login } from '../../../services/auth.service';

import UIInputText from '../../../ui/inputs/text-input.ui';
import UIInputPassword from '../../../ui/inputs/password-input.ui';
import { Button } from "primereact/button";

import '../auth.component.scss';

const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo requerido').default(''),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida').default(''),
});

type FormData = yup.InferType<typeof schema>;


interface LoginComponentProps {
  hasAuthCallback: (value: boolean) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ hasAuthCallback }) => {

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
                email: '',
                password: '',
            },
        }
    );

    const onSubmit = async (data: FormData) => {
        try {
            const result = await login(data);
            console.log('Login successful:', result);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    const hasAuth = () => {
        hasAuthCallback(false);
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>

            <section className="auth-form__header">
                <h1 className="auth-form__title">Sign In</h1>
                <p className="auth-form__subtitle">Login to your account</p>
            </section>

            <UIInputText
                id="email"
                label='Email'
                placeholder='ejemplo@email.com'
                registration={register('email')}
                error={errors.email?.message}
            />

            <UIInputPassword
                id="password"
                label='Contraseña'
                placeholder='Contraseña'
                registration={register('password')}
                error={errors.password?.message}
            />

            <fieldset className="auth-form__actions">
                <Button type="submit" label="Sign In" disabled={!isValid} />
                <Button type="button" label="Register" outlined onClick={() => hasAuth()} />
            </fieldset>
        </form>
    )
};


export default LoginComponent;