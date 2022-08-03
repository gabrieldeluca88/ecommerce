const products = [
    { 
        id: '1', 
        name: 'remera puma', 
        price: 1000, 
        category: 'remeras', 
        img:'../images/remeraPuma.webp', 
        stock: 25, 
        description:'Con un clásico efecto jaspeado y nuestro icónico logotipo en el pecho, este modelo básico encarna el estilo atemporal. Además, está elaborado en poliéster reciclado y algodón BCI prémium, para apoyar la sustentabilidad. DETALLES •Corte normal •Cuello redondo acanalado •Logotipo PUMA N.º 1 en el pecho •Poliéster reciclado y algodón'
    },
    {
        id: '2', 
        name: 'buzo adidas', 
        price: 8000, 
        category: 'buzos', 
        img:'../images/buzoAdidas.webp', 
        stock: 16, 
        description:'Buzo Adidas Originals Monograma Estampado De Moda Para Hombre'},
    { 
        id: '3', 
        name: 'zapatilla nike air max 90', 
        price: 17000, 
        category: 'zapatillas', 
        img:'../images/nikeAirMax90.webp', 
        stock: 10, 
        description:'DETALLES •La unidad Max Air en el talón, diseñada originalmente para el running de alto rendimiento, agrega una amortiguación increíble. •El cuello acolchado con diseño low crea un look elegante y se siente cómodo. •La suela tipo wafle de goma agrega un look tradicional, tracción y durabilidad. •Los revestimientos cosidos y los detalles de TPU en el talón y los ojales agregan durabilidad, comodidad y un look icónico. •La entresuela de espuma proporciona una sensación de suavidad.'}
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 2000)
    })
}


export const getProduct = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === id))
        }, 2000)
    })
}

export const getProductByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 2000)
    })
}