import CardProduct from '../../Components/Card-product/Index';
import Carrousel from '../../Components/Carrousel/Index';
import Footer from '../../Components/Footer/Index';
import ListCategory from '../../Components/List-category/Index';
import Navbar from '../../Components/Navbar/Index';
import './Index.css';

export default function Index() {
    return (
        <>
            <Navbar />

            <Carrousel />

            <ListCategory />

            <CardProduct />

            <Footer />

        </>

    )
}