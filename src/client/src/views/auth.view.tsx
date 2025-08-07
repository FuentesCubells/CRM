import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../services/auth.service';

import './auth.view.scss';
import LoginComponent from '../components/auth/login/login.component';

const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo requerido').default(''),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida').default(''),
});

type FormData = yup.InferType<typeof schema>;

const CRMAuthView: React.FC = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm<FormData>(
        {
            resolver: yupResolver(schema),
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

    return (
        <LoginComponent></LoginComponent>
        // <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        //     <section className="auth-form__header">
        //         <h1>Sign In</h1>
        //         <p>Welcome back! Please login to your account.</p>
        //     </section>
            
        //     <fieldset className="auth-form__fieldset">
        //         <label htmlFor="email">Email</label>
        //         <InputText
        //             id="email"
        //             {...register('email')}
        //             aria-describedby="email-help"
        //             className={errors.email ? 'p-invalid' : ''}
        //         />
        //         <small id="email-help">
        //             {errors.email?.message || 'Enter your email'}
        //         </small>
        //     </fieldset>

            // <fieldset className="auth-form__fieldset">
            //     <label htmlFor="password">Password</label>
            //     <Password
            //         id="password"
            //         feedback={false}
            //         toggleMask
            //         value={watch('password')}
            //         onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
            //         className={errors.password ? 'p-invalid' : ''}
            //         aria-describedby="password-help"
            //     />
            //     <small id="password-help">
            //         {errors.password?.message || 'Enter your password'}
            //     </small>
            // </fieldset>

        //     <fieldset className="auth-form__fieldset">
        //         <span>Don't have an account? <a href="/register">Sign up</a></span>
        //     </fieldset>

        //     <fieldset className="auth-form__fieldset">
        //         <Button type="submit" label="Login" />
        //     </fieldset>

        // </form>
    );
};

export default CRMAuthView;
