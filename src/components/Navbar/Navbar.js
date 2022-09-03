import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCategory } from '../../services/firebase/firestore'

const Navbar = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
    getCategory().then((categories) => {
        setCategory(categories);
    });
    }, []);


    return (
        <nav className='Navbar'>
            <Link to='/' className='logo'>Ecommerce</Link>
            <div className='NavbarButton'>
                {category.map((categ) => (<Link key={categ} to={'/category/' + (categ).toLowerCase()}>{categ}</Link>))}
            </div>
            <CartWidget />
        </nav>
    )
}


export default Navbar