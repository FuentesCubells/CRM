import { useEffect, useState } from 'react';
import { getReservationByCode, getReservations } from '../../services/reservation.service';
import './dashboar.view.scss'
import type { IReservation } from '../../models/reservation.model';
import ReservationCard from '../../components/cards/reservation-card.component';
import AsideUI from '../../ui/aside/aside.ui';
import DetailFormComponent from '../../components/forms/detail-form.component';



const DashboarbView: React.FC = () => {

    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [reservation_detail, setReservationDetail] = useState<any>({})
    const [openAside, setOpenAside] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReservations();

            if (data.data.length > 0 && data.success) {
                setReservations(data.data);
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = async (id: number, userId: number, reservation_code: string) => {
        const reservation_detail = await getReservationByCode(id, userId, reservation_code);
        if (reservation_detail.data) {
            setReservationDetail(reservation_detail.data);
            setOpenAside(true);
        }
    }

    const handleCloseAside = () => {
        setOpenAside(false);
    }

    return (
        <section className='dashboard-view'>
            <p className='dashboard-view__info'>{reservations.length} {'reservas encontradas'.toUpperCase()}</p>

            <section className='dashboard-view__cards-wrapper'>                {reservations.map(reservation => (
                <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onViewDetails={handleViewDetails}
                />
            ))}
            </section>
            {openAside &&
                <AsideUI>
                    <DetailFormComponent closeAside={handleCloseAside} reservation_details={reservation_detail}></DetailFormComponent>
                </AsideUI>
            }
        </section>
    )
}

export default DashboarbView