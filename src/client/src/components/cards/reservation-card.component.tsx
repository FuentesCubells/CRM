import type { IReservation } from "../../models/reservation.model";
import './reservation-card.component.scss';

interface ReservationCardProps {
    reservation: IReservation;
    onViewDetails?: (id: number, userId: number, reservation_code: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onViewDetails }) => {

    const statusClass = {
        confirmed: 'status--confirmed',
        pending: 'status--pending',
        cancelled: 'status--cancelled'
    }[reservation.status.toLowerCase()] || 'status--pending';

    // Formatear precio según país y moneda
    const formattedTotal = new Intl.NumberFormat(
        'es-ES', // idioma / región
        {
            style: 'currency',
            currency: 'EUR',
        }
    ).format(parseInt(reservation.total));

    return (
        <article className="reservation-card" onClick={() => onViewDetails && onViewDetails(reservation.id, reservation.user_id, reservation.reservation_code)}>

            <figure className="reservation-card__figure">
                <img></img>
            </figure>

            <header className="reservation-card__header">
                <article>
                    <span>ID - {reservation.reservation_code}</span>
                    <span className={`status-badge ${statusClass}`}>
                        {reservation.status}
                    </span>
                </article>
                <h3>Pedro Domingo</h3>
            </header>

            <section className="reservation-card__data">
                <article className="reservation-card__room">
                    <span>{'Habitacion'.toUpperCase()}</span>
                    <p>{'Suite Deluxe'.toUpperCase()}</p>
                </article>

                <section className="reservation-card__dates">
                    <article>
                        <span>{'Check In'.toUpperCase()}</span>
                        <span>
                            {new Date(reservation.check_in).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </article>
                    <article>
                        <span>{'Check Out'.toUpperCase()}</span>
                        <span>
                            {new Date(reservation.check_out).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </article>
                </section>

                <section className="reservation-card__info">
                    <article>
                        <span>{'Huespedes'.toUpperCase()}</span>
                        <span>
                            {reservation.adults + reservation.children} 
                        </span>
                    </article>
                    <article>
                        <span>{'Total'.toUpperCase()}</span>
                        <span>
                            {formattedTotal} 
                        </span>
                    </article>
                </section>
            </section>

        </article>
    );
};

export default ReservationCard;
