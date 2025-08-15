import './detail-form.component.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import UIInputText from '../../ui/inputs/text-input.ui';
import { Button } from "primereact/button";
import type { IReservation } from '../../models/reservation.model';
import UIDateInput from '../../ui/inputs/date-input.ui';
import UINumberInput from '../../ui/inputs/number-input.ui';
import UIDropdown from '../../ui/inputs/dropdown-input.ui';

// Validación del formulario
const schema = yup.object({
    user_name: yup.string().required('Es necesario el nombre del cliente'),
    email: yup.string().email().required('Correo requerido').default(''),
    phone: yup.string().matches(/^[0-9]{9}$/).required('Teléfono requerido'),
    check_in: yup.date().required('Fecha de check-in requerida'),
    check_out: yup.date().required('Fecha de check-out requerida'),
    adults: yup.number().min(1, 'Debe haber al menos 1 adulto').required(),
    children: yup.number().min(0).required(),
    total: yup.number().min(0).required('Total requerido').default(0),
    status: yup.string().required('El estado es necesario'),
    reservation_code: yup.string().required('Código de reserva requerido'),
});
const statusOptions = [
    { label: 'Confirmada', value: 'confirmed' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'Cancelada', value: 'cancelled' }
];

type FormData = yup.InferType<typeof schema>;

interface DetailFormComponentProps {
    reservation_details: IReservation,
    closeAside: () => void
}

const DetailFormComponent: React.FC<DetailFormComponentProps> = ({ reservation_details, closeAside }) => {

    
    const { register, handleSubmit, control, formState: { errors, isValid } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            user_name: 'Pedro Domingo',
            email: 'pedro.garcia@example.com',
            phone: '692585147',
            check_in: new Date(reservation_details.check_in),
            check_out: new Date(reservation_details.check_out),
            adults: reservation_details.adults,
            children: reservation_details.children,
            total: parseInt(reservation_details.total, 10),
            status: reservation_details.status,
            reservation_code: reservation_details.reservation_code
        }
    });

    const statusClass = {
        confirmed: 'status--confirmed',
        pending: 'status--pending',
        cancelled: 'status--cancelled'
    }[reservation_details.status] || 'status--pending';

    const onSubmit = (data: FormData) => {
        console.log('Datos enviados:', data);
    }

    return (
        <form className="detail-form" onSubmit={handleSubmit(onSubmit)} noValidate>

            <header className="detail-form__header">
                <Button
                    icon="pi pi-times"
                    text
                    severity="secondary"
                    className="aside-close"
                    onClick={closeAside}
                />

                <article>
                    <span>ID - {reservation_details.reservation_code}</span>
                    <span className={`status-badge ${statusClass}`}>
                        {reservation_details.status}
                    </span>
                </article>
                <h3>Detalles de la reserva</h3>
            </header>

            <figure className='detail-form__figure'>
                <img src="" alt="" />
            </figure>

            <section className="detail-form__client">
                <h3>Información del Huésped</h3>
                <article>
                    <UIInputText
                        id="user_name"
                        label="Nombre completo"
                        placeholder="Nombre del cliente"
                        registration={register('user_name')}
                        error={errors.user_name?.message}
                    />
                    <UIInputText
                        id="email"
                        label="Email"
                        placeholder="Email del cliente"
                        registration={register('email')}
                        error={errors.email?.message}
                    />
                    <UIInputText
                        id="phone"
                        label="Télefono"
                        placeholder="Teléfono"
                        registration={register('phone')}
                        error={errors.phone?.message}
                    />
                </article>
            </section>

            <span className="detail-form__spacer"></span>

            <section className="detail-form__reservation">
                <h3>Detalles de la reserva</h3>
                <article>

                    <Controller
                        name="check_in"
                        control={control}
                        render={({ field }) => (
                            <UIDateInput
                                id="check_in"
                                label="Check in"
                                placeholder="Fecha de salida"
                                value={field.value}
                                registration={field}
                                error={errors.check_in?.message}
                            />
                        )}
                    />

                    <Controller
                        name="check_out"
                        control={control}
                        render={({ field }) => (
                            <UIDateInput
                                id="check_out"
                                label="Check out"
                                placeholder="Fecha de salida"
                                value={field.value}
                                registration={field}
                                error={errors.check_out?.message}
                            />
                        )}
                    />

                    <p>{reservation_details.room_id}</p>

                    <Controller
                        name="adults"
                        control={control}
                        render={({ field }) => (
                            <UINumberInput
                                id="adultos"
                                label="Adultos"
                                placeholder="Número de adultos"
                                value={field.value}
                                registration={field}
                                error={errors.adults?.message}
                            />
                        )}
                    />

                    <Controller
                        name="children"
                        control={control}
                        render={({ field }) => (
                            <UINumberInput
                                id="children"
                                label="Niños"
                                placeholder="Número de niños"
                                value={field.value}
                                registration={field}
                                error={errors.children?.message}
                            />
                        )}
                    />

                    <Controller
                        name="total"
                        control={control}
                        render={({ field }) => (
                            <UINumberInput
                                id="total"
                                label="Importe total"
                                placeholder="Total de la reserva"
                                value={field.value}
                                registration={field}
                                error={errors.total?.message}
                            />
                        )}
                    />

                    <Controller
                        name="status"
                        control={control}
                        defaultValue={reservation_details.status}
                        render={({ field, fieldState }) => (
                            <UIDropdown
                                id="status"
                                label="Estado de la reserva"
                                placeholder={field.value}
                                options={statusOptions}
                                value={field.value}
                                error={fieldState.error?.message}
                                registration={register('status')}
                            />
                        )}
                    />

                </article>
            </section>

            <section className="detail-form__actions">
                <Button type="submit" label="Enviar" />
            </section>

        </form>
    )
}

export default DetailFormComponent;
