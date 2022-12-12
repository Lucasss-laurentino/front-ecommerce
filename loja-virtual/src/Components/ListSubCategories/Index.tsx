import { useEffect, useState } from 'react';
import http from '../../http/http';
import Products from '../../Inteface/Product';
import SubCategory from '../../Inteface/SubCategory';
import CardProduct from '../Card-product/Index';
import './ListSubCategories.css';

interface Props {
    subCategory: SubCategory,
    urlImage: string,
    setModalProductInfo: () => void,
    setProductInfo: (product: Products) => void,
}

export default function ListSubCategories({subCategory, urlImage, setModalProductInfo, setProductInfo}: Props) {

    const [products, setProducts] = useState<Products[]>([]);

    useEffect(() => {
        http.get('getProductThisSubCategory/'+subCategory.id).then((response) => {
            setProducts([...response.data])
        })
    }, [])

    return (
        <div className="row m-0 my-5">
            <h2 className='color'>{subCategory.name}</h2>
            <div className="container">
                <div className="col-6 col-md-4 p-0 d-flex justify-content-center align-items-stretch mx-1 col-height">
                    {products.map((product) => {
                        if(product.sub_categories_id === subCategory.id) {
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
        </div>
    )
}