const products = [
    { 
        id: '1', 
        name: 'remera puma', 
        price: 1000, 
        category: 'remeras', 
        img:'images/remeraPuma.webp', 
        stock: 25, 
        description:'Descripcion de remera puma'
    },
    {
        id: '2', 
        name: 'buzo adidas', 
        price: 800, 
        category: 'buzos', 
        img:'images/buzoAdidas.webp', 
        stock: 16, 
        description:'Descripcion de buzo adidas'},
    { 
        id: '3', 
        name: 'zapatilla nike air max 90', 
        price: 1200, 
        category: 'zapatillas', 
        img:'images/nikeAirMax90.webp', 
        stock: 10, 
        description:'Descripcion de zapatilla nike air max 90'}
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 2000)
    })
}