import React from "react";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { collection, addDoc, Timestamp, writeBatch, where, query, getDocs, documentId, } from "firebase/firestore";
import { db } from "../../services/firebase";
import './Checkout.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Checkout = () => {
const [status, setStatus] = useState(0);
const [orderNumber, setorderNumber] = useState("");
const [outStock, setOutStock] = useState([]);
const { cart, clearProductCart, totalPrice} = useContext(CartContext);
const [name, setName] = useState("");
const [dni, setDni] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState(0);

const { removeProduct } = useContext(CartContext);

const Remove = (id) => {
    removeProduct(id);
};

if (status === 1) {
    return (
    <div>
        <p>Compraste con exito!</p>
        <div className="OrderNumber">
            <p>Se ha realizado la orden exitosamente</p>
            <p>Tu número de orden es : {orderNumber}</p>
            <Link to='/' className='buttonBack'>Ir a inicio</Link>
        </div>
    </div>
    );
}


if (status === 2) {
    return (
    <div>
        <p>Opps! Ocurrio un error</p>
        <div className="fail">
            <p>Los siguientes productos ya no estan disponibles</p>
            {outStock.map((item) => {
            return (
            <div className='detailCart' key={item.id}>
                <Link  to={`/detail/${item.id}`}> <img src={item.img} alt={item.name}/></Link>
                <Link to={`/detail/${item.id}`}> {item.name}</Link>
                <Link to={`/detail/${item.id}`}> <p>$ {item.price}</p></Link>
                <Link className='buttonBack'to={"/cart"}  onClick={() => Remove(item.id)}>Quitar</Link>
            </div>
            );
            })}
        </div>
    </div>
    );
}

const createOrder = async (e) => {
    try {
    e.preventDefault();

    if (!validate()) return;
    
    if (cart.length === 0) return;
    
    const order = {
        buyer: {
        name: name,
        dni: dni,
        email: email,
        phone: phone,
        
        },
        items: cart,
        date: Timestamp.fromDate(new Date()),
        total:totalPrice(),
    };

    const ids = cart.map((e) => e.id);
    const productRef = collection(db, "products");
    const prodOnFirestore = await getDocs(query(productRef, where(documentId(), "in", ids)));

    const { docs } = prodOnFirestore;
    const outOfStock = [];
    const batch = writeBatch(db);

    docs.forEach((doc) => {
        const dataDoc = doc.data();
        const dbStock = dataDoc.stock;
        const itemToAdd = cart.find((prod) => prod.id === doc.id);
        const localQuantity = itemToAdd?.quantity;
        
        if (dbStock >= localQuantity) {
        batch.update(doc.ref, { stock: dbStock - localQuantity });
        } else {
        outOfStock.push({ id: doc.id, ...dataDoc });
        }
    });
    if (outOfStock.length === 0) {
        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, order);
        batch.commit();

        toast.success('Compraste con exito!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        clearProductCart();
        setStatus(1);
        setorderNumber(orderAdded.id);
    } else {
        setOutStock(outOfStock);
        setStatus(2);
    }
    } catch (error) {
    console.log(error);
    }
};
const validate = () => {
    if (name.length <= 0) {
        toast.error('Completar nombre!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        return false;
    }
    if (dni.length <= 0) {
        toast.error('Completar DNI!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        return false;
        }
    if (email.length <= 0 || !String(email).includes("@")) {
        toast.error('Inserte un correo electrónico valido!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        return false;
    }
    if (phone <= 0 || isNaN(parseInt(phone))) {
        toast.error('Completar con numero de telefono!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        return false;
        }
    return true;
};

return (
    <form>
        
            <div className='FormContainer'>
                <h2>Completa los siguientes datos</h2>

                <label>Nombre: 
                    <input type='text' onChange={(e) => setName(e.target.value)} required placeholder='Introduzca su nombre'/>
                </label>
                <label>DNI: 
                    <input type='number' onChange={(e) => setDni(e.target.value)} required placeholder='Introduzca su DNI'/>
                </label>
                <label>Email: 
                    <input type='email' onChange={(e) => setEmail(e.target.value)} required placeholder='Introduzca su email'/>
                </label>
                <label>Telefono: 
                    <input type='phone' onChange={(e) => setPhone(e.target.value)} required placeholder='Introduzca su telefono'/>
                </label>
                
            </div>
            
            

            <div className="detalle">
                <h2>Detalle de tu compra</h2>
                {cart.map((item) => {
                return (
                <div className='detailCart'key={item.id}>
                    <Link  to={`/detail/${item.id}`}> <img src={item.img} alt={item.name}/></Link>
                    <Link to={`/detail/${item.id}`}> {item.name}</Link>
                    <Link to={`/detail/${item.id}`}> <p>precio $ {item.price}</p></Link>
                </div>);
                })}<h3>Total: ${totalPrice()}</h3>
                <Link className='buttonBack'to='/cart'>Volver al carrito</Link>
                <button className="buttonFinally" type="submit" onClick={createOrder}>Finalizar compra</button>
                <ToastContainer/>
            </div>
    </form>
);
};

export default Checkout;