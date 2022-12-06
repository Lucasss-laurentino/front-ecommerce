import { useState } from 'react';
import CardProduct from '../../Components/Card-product/Index';
import Carrousel from '../../Components/Carrousel/Index';
import Footer from '../../Components/Footer/Index';
import ListCategory from '../../Components/List-category/Index';
import ModalCategory from '../../Components/ModalCategory/Index';
import ModalCreateProduct from '../../Components/ModalCreateProduct/Index';
import ModalSubCategory from '../../Components/ModalSubCategory/Index';
import Navbar from '../../Components/Navbar/Index';
import Category from '../../Inteface/Category';
import './Index.css';

export default function Index() {

    // esconder ou mostrar menu para cadastrar categoria, sub categoria e produto
    const [menuHidden, setMenuHidden] = useState<string>('hidden');

    // Modal categoria
    const [modalCategory, setModalCategory] = useState<boolean>(false);

    // Modal sub category
    const [modalSubCategory, setModalSubCategory] = useState<boolean>(false);

    // Modal create Product
    const [modalCreateProduct, setModalCreateProduct] = useState<boolean>(false);

    // Categories
    const [categories, setCategories] = useState<Category[]>([]);

    return (
        <>

            <ModalCategory
                modalCategory={modalCategory}
                setModalCategory={() => setModalCategory(false)}
                setCategories={(categories) => setCategories(categories)}
            />

            <ModalSubCategory 
                modalSubCategory={modalSubCategory}
                setModalSubCategory={() => setModalSubCategory(false)}
            />

            <ModalCreateProduct
                modalCreateProduct={modalCreateProduct}
                setModalCreateProduct={() => setModalCreateProduct(false)}
            />

            <Navbar 
                menuHidden={menuHidden}
                setMenuHidden={(classe) => setMenuHidden(classe)}
            />

            <Carrousel
                menuHidden={menuHidden}
                setModalCategory={() => setModalCategory(true)}
                setModalSubCategory={() => setModalSubCategory(true)}
                setModalCreateProduct={() => setModalCreateProduct(true)}
            />

            <ListCategory 
                categories={categories}
                setCategories={(categories) => setCategories(categories)}
            />

            <CardProduct />

            <Footer />

        </>

    )
}