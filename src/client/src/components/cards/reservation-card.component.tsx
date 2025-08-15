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
        <article className="reservation-card">

            <header className="reservation-card__dates">
                <span className="date-label">Estancia</span>
                <span className="date-range">
                    {new Date(reservation.check_in).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {" — "}
                    {new Date(reservation.check_out).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
            </header>

            <section className="reservation-card__data">

                <article className="reservation-card__client">
                    {/* <h3 className="reservation-card__client">{reservation.client_name}</h3> */}
                    <h3>Pedro Domingo</h3>
                    <span className={`status-badge ${statusClass}`}>
                        {reservation.status}
                    </span>
                </article>

                <section className="reservation-card__info">
                    <article className="reservation-card__total">
                        <p><strong>Total:</strong> {formattedTotal} </p>
                    </article>

                    <article className="reservation-card__occupancy">
                        <p><strong>Guests:</strong> {reservation.adults + reservation.children} </p>
                    </article>
                </section>
            </section>

            <footer className="reservation-card__footer">
                <button
                    className="btn-details"
                    onClick={() => onViewDetails && onViewDetails(reservation.id, reservation.user_id, reservation.reservation_code)}>
                    Ver detalles
                </button>
            </footer>
        </article>
    );
};

export default ReservationCard;
