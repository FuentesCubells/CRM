import { Children } from 'react';
import './aside.ui.scss';



const AsideUI: React.FC<any> = ({ children }) => {
    return (
        <aside className='aside-wrapper'>
            {children}
        </aside>
    )
}

export default AsideUI