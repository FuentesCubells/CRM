export interface IReservation {
  id: number;
  user_id: number;
  room_id: number;
  check_in: string;
  check_out: string; 
  adults: number;
  children: number;
  total: string; 
  created_at: string;
  rate_per_night: string;
  reservation_code: string;
  status: 'confirmed' | 'pending' | 'cancelled' | string;
};
