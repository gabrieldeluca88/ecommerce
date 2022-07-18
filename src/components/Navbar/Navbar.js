import './Navbar.css'

const Navbar = () => {
    return (
        <nav className='Navbar'>
            <div className='logo'>
                Ecommerce
            </div>
            <div className='NavbarButton'>
                <button>Remeras</button>
                <button>Buzos</button>
                <button>Camperas</button>
                <button>Zapatillas</button>
            </div>
        </nav>
    )
}


export default Navbar