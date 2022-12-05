import { useState } from 'react';
import CardProduct from '../../Components/Card-product/Index';
import Carrousel from '../../Components/Carrousel/Index';
import Footer from '../../Components/Footer/Index';
import ListCategory from '../../Components/List-category/Index';
import ModalCategory from '../../Components/ModalCategory/Index';
import ModalSubCategory from '../../Components/ModalSubCategory/Index';
import Navbar from '../../Components/Navbar/Index';
import './Index.css';

export default function Index() {

    // esconder ou mostrar menu para cadastrar categoria, sub categoria e produto
    const [menuHidden, setMenuHidden] = useState<string>('hidden');

    // Modal categoria
    const [modalCategory, setModalCategory] = useState<boolean>(false);

    // Modal sub category
    const [modalSubCategory, setModalSubCategory] = useState<boolean>(false);

    return (
        <>

            <ModalCategory
                modalCategory={modalCategory}
                setModalCategory={() => setModalCategory(false)}
            />

            <ModalSubCategory 
                modalSubCategory={modalSubCategory}
                setModalSubCategory={() => setModalSubCategory(false)}
            />

            <Navbar 
                menuHidden={menuHidden}
                setMenuHidden={(classe) => setMenuHidden(classe)}
            />

            <Carrousel
                menuHidden={menuHidden}
                setModalCategory={() => setModalCategory(true)}
                setModalSubCategory={() => setModalSubCategory(true)}
            />

            <ListCategory />

            <CardProduct />

            <Footer />

        </>

    )
}