import { useEffect } from 'react';
import http from '../../http/http';
import Category from '../../Inteface/Category';
import './List-category.css';

interface Props {
    categories: Category[],
    setCategories: (categories: Category[]) => void,
}

export default function ListCategory({categories, setCategories}: Props) {

    useEffect(() => {
        http.get('getCategories').then((response) => {
            setCategories([...response.data])
        })

    }, [])


    return (
        <div className="container-fluid mt-3">
            <ul className="list-inline border-list p-3 d-flex justify-content-around">
                {categories.map((category) => {
                    return (
                        <li key={category.id} className="list-inline-item font-list">{category.name}</li>
                    )
                })}
            </ul>
        </div>
    )
} 