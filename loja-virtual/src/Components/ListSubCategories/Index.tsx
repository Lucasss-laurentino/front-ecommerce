import { useEffect, useState } from 'react';
import http from '../../http/http';
import Products from '../../Inteface/Product';
import SubCategory from '../../Inteface/SubCategory';
import CardProduct from '../Card-product/Index';
import './ListSubCategories.css';
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

interface Props {
    subCategory: SubCategory,
    urlImage: string,
    setModalProductInfo: () => void,
    setProductInfo: (product: Products) => void,
    setProductsThisCategory: (products: Products[]) => void,
    productsThisCategory: Products[],
}

export default function ListSubCategories({ subCategory, urlImage, setModalProductInfo, setProductInfo, setProductsThisCategory, productsThisCategory }: Props) {

    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)

    const [hoverBtn, setHoverBtn] = useState('btn-left-vertical-hiden');

    useEffect(() => {
        http.get('getProductThisSubCategory/' + subCategory.id).then((response) => {
            setProductsThisCategory([...response.data])
        })

        if (isHover) {

            setHoverBtn('btn-left-vertical-show');

        } else {
            setHoverBtn('btn-left-vertical-hiden');
        }

    }, [isHover])

    const scrollL = (name: string) => {

        var elementSlider = document.getElementById(name);

        if(elementSlider){
            elementSlider.scrollLeft = elementSlider.scrollLeft - 200;
        }


    }

    const scrollR = (name: string) => {

        var elementSlider = document.getElementById(name);

        if(elementSlider){
            elementSlider.scrollLeft = elementSlider.scrollLeft + 200;
        }
    }

    return (
        <div className="row m-0 my-5" ref={hoverRef}>
            <div className="container container-btn-scroll-vertical col-1 w-100 justify-content-between">
                <button className={hoverBtn} onClick={() => scrollL(subCategory.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-arrow-left-circle-fill color" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                </button>
                <button className={hoverBtn} onClick={() => scrollR(subCategory.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-arrow-right-circle-fill color" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                </button>
            </div>
            <h2 className='color'>{subCategory.name}</h2>
            <div className="container d-flex roll" id={subCategory.name}>
                {productsThisCategory.map((product) => {
                    if (product.sub_categories_id === subCategory.id) {
                        return (
                            
                            <CardProduct
                                key={product.id}
                                product={product}
                                urlImage={urlImage}
                                setModalProductInfo={setModalProductInfo}
                                setProductInfo={setProductInfo}
                            />
                        )

                    }
                })}
            </div>

        </div>
    )
}