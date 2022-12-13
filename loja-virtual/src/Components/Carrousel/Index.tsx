import './Carrousel.css';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import Category from '../../Inteface/Category';

interface Props {
    menuHidden: string,
    setModalCategory: () => void,
    setModalSubCategory: () => void,
    setModalCreateProduct: () => void,
    banner1: string,
    banner2: string,
}

export default function Carrousel({menuHidden, setModalCategory, setModalSubCategory, setModalCreateProduct, banner1, banner2}: Props) {

    return (

        <>
            
            <div className={menuHidden}>
                <ul className='list-menu'>
                    <li className='item-list-menu pb-2 ' onClick={setModalCategory}>
                        Categoria
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-node-plus-fill" viewBox="0 0 16 16">
                            <path d="M11 13a5 5 0 1 0-4.975-5.5H4A1.5 1.5 0 0 0 2.5 6h-1A1.5 1.5 0 0 0 0 7.5v1A1.5 1.5 0 0 0 1.5 10h1A1.5 1.5 0 0 0 4 8.5h2.025A5 5 0 0 0 11 13zm.5-7.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </li>
                    <li className='item-list-menu py-2' onClick={setModalSubCategory} >
                        Sub categoria
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-node-plus-fill" viewBox="0 0 16 16">
                            <path d="M11 13a5 5 0 1 0-4.975-5.5H4A1.5 1.5 0 0 0 2.5 6h-1A1.5 1.5 0 0 0 0 7.5v1A1.5 1.5 0 0 0 1.5 10h1A1.5 1.5 0 0 0 4 8.5h2.025A5 5 0 0 0 11 13zm.5-7.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </li>
                    <li className='item-list-menu py-2' onClick={setModalCreateProduct}>
                        Produto
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-node-plus-fill" viewBox="0 0 16 16">
                            <path d="M11 13a5 5 0 1 0-4.975-5.5H4A1.5 1.5 0 0 0 2.5 6h-1A1.5 1.5 0 0 0 0 7.5v1A1.5 1.5 0 0 0 1.5 10h1A1.5 1.5 0 0 0 4 8.5h2.025A5 5 0 0 0 11 13zm.5-7.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </li>

                </ul>
            </div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className='d-block img-fluid size-image'
                        src={banner1}
                        alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block img-fluid size-image'
                        src={banner2}
                        alt="Third slide" />
                </Carousel.Item>
            </Carousel>
        </>
    
    )

}