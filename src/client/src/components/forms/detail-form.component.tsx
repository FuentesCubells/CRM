import './detail-form.component.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import UIInputText from '../../ui/inputs/text-input.ui';
import { Button } from "primereact/button";
import type { IReservation } from '../../models/reservation.model';

// Validación del formulario
const schema = yup.object({
    check_in: yup.string().required('Fecha de check-in requerida'),
    check_out: yup.string().required('Fecha de check-out requerida'),
    adults: yup.number().min(1, 'Debe haber al menos 1 adulto').required(),
    children: yup.number().min(0).required(),
    total: yup.number().min(0).required('Total requerido'),
    reservation_code: yup.string().required('Código de reserva requerido'),
});

type FormData = yup.InferType<typeof schema>;

interface DetailFormComponentProps {
    reservation_details: IReservation
}

const DetailFormComponent: React.FC<DetailFormComponentProps> = ({reservation_details}) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            check_in: new Date(reservation_details.check_in).toLocaleDateString('es-ES'),
            check_out: new Date(reservation_details.check_out).toLocaleDateString('es-ES'),
            adults: reservation_details.adults,
            children: reservation_details.children,
            total: parseFloat(reservation_details.total),
            reservation_code: reservation_details.reservation_code
        }
    });

    const onSubmit = (data: FormData) => {
        console.log('Datos enviados:', data);
    }

    return (
        <form className="detail-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>Detalle de la Reserva</h2>

            <UIInputText
                id="check-in"
                label="Check-in"
                placeholder="Fecha de llegada"
                registration={register('check_in')}
                error={errors.check_in?.message}
            />

            <UIInputText
                id="check-out"
                label="Check-out"
                placeholder="Fecha de salida"
                registration={register('check_out')}
                error={errors.check_out?.message}
            />

            <UIInputText
                id="adults"
                label="Adultos"
                placeholder="Número de adultos"
                registration={register('adults')}
                error={errors.adults?.message}
            />

            <UIInputText
                id="children"
                label="Niños"
                placeholder="Número de niños"
                registration={register('children')}
                error={errors.children?.message}
            />

            <UIInputText
                id="total"
                label="Total"
                placeholder="Total de la reserva"
                registration={register('total')}
                error={errors.total?.message}
            />

            <UIInputText
                id="reservation-code"
                label="Código de reserva"
                placeholder="Código de reserva"
                registration={register('reservation_code')}
                error={errors.reservation_code?.message}
            />

            <span className={`reservation-status ${reservation_details.status}`}>
                {reservation_details.status}
            </span>

            <fieldset className="detail-form__actions">
                <Button type="submit" label="Actualizar Reserva" disabled={!isValid} />
            </fieldset>
        </form>
    )
}

export default DetailFormComponent;
