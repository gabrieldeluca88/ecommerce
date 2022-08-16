import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='Navbar'>
            <Link to='/' className='logo'>Ecommerce</Link>
            <div className='NavbarButton'>
                <Link to='/category/remeras'>Remeras</Link>
                <Link to='/category/buzos'>Buzos</Link>
                <Link to='/category/zapatillas'>Zapatillas</Link>
            </div>
            <CartWidget />
        </nav>
    )
}


export default Navbar