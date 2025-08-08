import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './auth.view.scss';
import 'swiper/swiper-bundle.css'

import LoginComponent from '../../components/auth/login/login.component';
import RegisterComponent from '../../components/auth/register/register.component';


const AuthView: React.FC = () => {
    const swiperRef = useRef<any>(null);

    function hasAuthCallBack(hasAuthCalback: boolean) {
        if (hasAuthCalback) {
            // Ir al login
            swiperRef.current?.slideTo(0);
        } else {
            // Ir al registro
            swiperRef.current?.slideTo(1);
        }
    }

    return (
        <section className="auth-view">
            <Swiper
                className='auth-view__swiper'
                onSwiper={(swiper: any) => (swiperRef.current = swiper)}
                spaceBetween={50}
                slidesPerView={1}
                allowTouchMove={false}>

                <SwiperSlide>
                    <LoginComponent hasAuthCallback={hasAuthCallBack} />
                </SwiperSlide>
                <SwiperSlide>
                    <RegisterComponent hasAuthCallback={hasAuthCallBack} />
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default AuthView;
