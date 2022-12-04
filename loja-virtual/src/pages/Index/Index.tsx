import { useState } from 'react';
import CardProduct from '../../Components/Card-product/Index';
import Carrousel from '../../Components/Carrousel/Index';
import Footer from '../../Components/Footer/Index';
import ListCategory from '../../Components/List-category/Index';
import Navbar from '../../Components/Navbar/Index';
import './Index.css';

export default function Index() {

    // esconder ou mostrar menu para cadastrar categoria, sub categoria e produto
    const [menuHidden, setMenuHidden] = useState<string>('hidden');


    return (
        <>
            <Navbar 
                menuHidden={menuHidden}
                setMenuHidden={(classe) => setMenuHidden(classe)}
            />

            <Carrousel 
                menuHidden={menuHidden}
            />

            <ListCategory />

            <CardProduct />

            <Footer />

        </>

    )
}