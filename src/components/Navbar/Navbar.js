import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'

const Navbar = () => {
    return (
        <nav className='Navbar'>
            <div className='logo'>
                Ecommerce
            </div>
            <div className='NavbarButton'>
                <button>Remeras</button>
                <button>Buzos</button>
                <button>Zapatillas</button>
            </div>
            <CartWidget />
        </nav>
    )
}


export default Navbar