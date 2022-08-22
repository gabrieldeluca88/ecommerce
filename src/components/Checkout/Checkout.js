import { useContext, useState } from "react"
import { CartContext } from '../../context/CartContext'
import { addDoc, collection, Timestamp,  getDocs, query, where, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase/index'


const Checkout = () => {
    const { cart, clearCart, total } = useContext(CartContext)  

    const [name, setName] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const createOrder = async () => {
        try {
            const objOrder = {
                cliente: {
                    name: name,
                    dni: dni,
                    phone: phone,
                    email: email,
                },
                items: cart,
                total:`${total}`,
                date: Timestamp.fromDate(new Date())
            }

            const ids = cart.map(prod => prod.id)

            const productsRef = collection(db, 'products')

            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))
            
            const { docs } = productsAddedFromFirestore

            const outOfStock = []

            const batch = writeBatch(db)

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAdded = cart.find(prod => prod.id === doc.id)
                const prodQuaantity = productAdded?.quantity

                if(stockDb >= prodQuaantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuaantity})
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0) {
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                batch.commit()
                console.log(orderAdded.id)
                clearCart();

                return(
                    <div className='ticketContainer'>
                        <h1>Su orden a sido generada con éxito !</h1>
                        <div className='ticketSubContainer'>
                            <h3>Comprobante N°:</h3><span className='numTicket'>{orderAdded.id}</span>
                        </div>
                    </div>
                );
            } else {
                console.log('Hay productos fuera de stock')
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log('se termino la ejecucion de la funcion createOrder')
        }

    }

    return (
        <form>
        <div className='inputContainers'>
            <div className='buyerContainer'>
                <h2>Ultimo paso</h2>
                <label>Nombre:
                    <input type='text' onChange={(e) => setName(e.target.value)} required placeholder='Introduzca su nombre'/>
                </label>
                <label>DNI:
                    <input type='number' onChange={(e) => setDni(e.target.value)} required placeholder='Introduzca su DNI'/>
                </label>
                <label>Email:
                    <input type='email' onChange={(e) => setEmail(e.target.value)} required placeholder='Introduzca su email'/>
                </label>
                <label>Numero de telefono:
                    <input type='number' onChange={(e) => setPhone(e.target.value)} required placeholder='Introduzca su telefono'/>
                </label>
            </div>
            
        </div>
        <input className="buttonSubmit" type="button" value="Submit" onClick={createOrder}/>
    </form>
    )
}

export default Checkout