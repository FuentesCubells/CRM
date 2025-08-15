import './aside.ui.scss';



const AsideUI: React.FC<any> = ({ children }) => {
    return (
        <section className='overlay'>
            <aside className='overlay__aside-wrapper'>
                {children}
            </aside>
        </section>
    )
}

export default AsideUI