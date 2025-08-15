import axios from 'axios';


export const getReservations = async () => {
  try {
    const response = await axios.get('/api/reservations/all-reservations', { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Error no data' };
  }
};

export const getReservationByCode = async ( id: number, user_id: number,  reservation_code: string ) => {
    try {
    const response = await axios.post(`/api/reservations/client-reservation-list/${id}`, {
        user_id: user_id,
        reservation_code: reservation_code
    }, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Error no data' };
  }
}

