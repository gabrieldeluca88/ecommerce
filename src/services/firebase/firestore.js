import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore'
import { db } from '.'
import { createAdaptedProductFromFirestore } from '../../adapters/productAdapter'

export const getProducts = (categoryId) => {
    const collectionRef = !categoryId 
            ? collection(db, 'products')
            : query(collection(db, 'products'), where('category', '==', categoryId))

        return getDocs(collectionRef).then(response => {
            const products = response.docs.map(doc => {
                return createAdaptedProductFromFirestore(doc)
            })
            return products
        }).catch(error => {
            return error
        })
}


export const getProductById = (id) => {
    return getDoc(doc(db, 'products', id)).then(response =>{
        const data = response.data()
        const productDB = { id : response.id, ...data}
        return productDB
    }).catch(error => {
        return error
    })
}


export const getCategory = () => {
    const collectionRef = collection(db, "categories");
    return getDocs(collectionRef)
    .then((response) => {
        const categories = [];
        response.docs.forEach((category) => {
        categories.push(category.data().description);
        });
        return categories;
    })
    .catch((error) => {
        return error;
    });
};