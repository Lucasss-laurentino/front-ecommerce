import { useEffect, useState } from 'react';
import Carrousel from '../../Components/Carrousel/Index';
import Footer from '../../Components/Footer/Index';
import ListCategory from '../../Components/List-category/Index';
import ListSubCategories from '../../Components/ListSubCategories/Index';
import ModalAddress from '../../Components/ModalAddress';
import ModalCategory from '../../Components/ModalCategory/Index';
import ModalCreateProduct from '../../Components/ModalCreateProduct/Index';
import ModalLogin from '../../Components/ModalLogin';
import ModalProductInfo from '../../Components/ModalProductInfo/Index';
import ModalSubCategory from '../../Components/ModalSubCategory/Index';
import Navbar from '../../Components/Navbar/Index';
import http from '../../http/http';
import Address from '../../Inteface/Address';
import Category from '../../Inteface/Category';
import Products from '../../Inteface/Product';
import SubCategory from '../../Inteface/SubCategory';

import './Index.css';

export default function Index() {

    // esconder ou mostrar menu para cadastrar categoria, sub categoria e produto
    const [menuHidden, setMenuHidden] = useState<string>('hidden');

    // Modal login
    const [modalLogin, setModalLogin] = useState<boolean>(false);

    // Modal categoria
    const [modalCategory, setModalCategory] = useState<boolean>(false);

    // Modal sub category
    const [modalSubCategory, setModalSubCategory] = useState<boolean>(false);

    // Modal create Product
    const [modalCreateProduct, setModalCreateProduct] = useState<boolean>(false);

    // Modal Product Info
    const [modalProductInfo, setModalProductInfo] = useState<boolean>(false);
    const [productInfo, setProductInfo] = useState<Products>();

    // Modal Address
    const [modalAddress, setModalAddress] = useState<boolean>(false);

    // Categories
    const [categories, setCategories] = useState<Category[]>([]);

    // Path banner carrousel
    const [banner1, setBanner1] = useState<string>('');
    const [banner2, setBanner2] = useState<string>('');

    const [urlImage, setUrlImage] = useState('http://localhost:8000/storage/');

    // Sub categories row
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    // Category default init page
    const [categoryDefault, setCategoryDefault] = useState<string>('');

    // Products
    const [products, setProducts] = useState<Products[]>([]);

    const [productsThisCategory, setProductsThisCategory] = useState<Products[]>([]);

    const [logado, setLogado] = useState<boolean>(false);

    useEffect(() => {

        http.get('getCategoryDefault').then((response) => {
            setCategoryDefault(response.data.name)
            setBanner1(urlImage + response.data.banner1)
            setBanner2(urlImage + response.data.banner2)
        });

        if (categoryDefault) {

            http.get('getSubCategories/' + categoryDefault).then((response) => {
                setSubCategories([...response.data]);
            })

        }

    }, [categoryDefault])

    return (
        <>

            <ModalLogin
                modalLogin={modalLogin}
                setModalLogin={() => setModalLogin(false)}

            />

            <ModalCategory
                modalCategory={modalCategory}
                setModalCategory={() => setModalCategory(false)}
                categories={categories}
                setCategories={(categories) => setCategories(categories)}
                setBanner1={setBanner1}
                setBanner2={setBanner2}
            />

            <ModalSubCategory
                modalSubCategory={modalSubCategory}
                setModalSubCategory={() => setModalSubCategory(false)}
                categories={categories}
            />

            <ModalCreateProduct
                modalCreateProduct={modalCreateProduct}
                setModalCreateProduct={() => setModalCreateProduct(false)}
                categories={categories}
                setProducts={(products: Products[]) => setProducts(products)}
                setProductsThisCategory={(products) => setProductsThisCategory(products)}
            />

            <ModalProductInfo
                modalProductInfo={modalProductInfo}
                setModalProductInfo={() => setModalProductInfo(false)}
                productInfo={productInfo}
                urlImage={urlImage}
            />

            <ModalAddress
                modalAddress={modalAddress}
                setModalAddress={() => setModalAddress(false)}
            />

            <Navbar
                menuHidden={menuHidden}
                setMenuHidden={(classe) => setMenuHidden(classe)}
                setModalLogin={() => setModalLogin(true)}
                logado={logado}
                setLogado={setLogado}
                modalAddress={modalAddress}
                setModalAddress={() => setModalAddress(true)}
            />

            <Carrousel
                menuHidden={menuHidden}
                setModalCategory={() => setModalCategory(true)}
                setModalSubCategory={() => setModalSubCategory(true)}
                setModalCreateProduct={() => setModalCreateProduct(true)}
                banner1={banner1}
                banner2={banner2}
            />

            <ListCategory
                categories={categories}
                setCategories={(categories) => setCategories(categories)}
                setBanner1={setBanner1}
                setBanner2={setBanner2}
                setSubCategories={(subCategories) => setSubCategories(subCategories)}
            />

            {subCategories.map((subCategory) => {
                
                {/* card products dentro de list sub categories  */}

                return (
                    <ListSubCategories
                        key={subCategory.id}
                        subCategory={subCategory}
                        urlImage={urlImage}
                        setModalProductInfo={() => setModalProductInfo(true)}
                        setProductInfo={(product) => setProductInfo(product)}
                        setProductsThisCategory={(products) => setProductsThisCategory(products)}
                        productsThisCategory={productsThisCategory}
                    />
                )
            })}

            <Footer />

        </>

    )
}