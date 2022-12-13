import { useEffect } from 'react';
import http from '../../http/http';
import Category from '../../Inteface/Category';
import SubCategory from '../../Inteface/SubCategory';
import './List-category.css';

interface Props {
    categories: Category[],
    setCategories: (categories: Category[]) => void,
    setBanner1: (path: string) => void,
    setBanner2: (path: string) => void,
    setSubCategories: (subCategories: SubCategory[]) => void,
}

export default function ListCategory({categories, setCategories, setBanner1, setBanner2, setSubCategories}: Props) {

    useEffect(() => {
        http.get('getCategories').then((response) => {
            setCategories([...response.data])
        })
    }, [])

    const setBanner = (category: Category) => {
        setBanner1('http://localhost:8000/storage/'+category.banner1)
        setBanner2('http://localhost:8000/storage/'+category.banner2)
    }

    const selectCategory = (category: Category) => {

        http.get('getSubCategories/'+category.name).then((response) => {
            setSubCategories([...response.data])
        })

        setBanner(category)

    }

    return (
        <div className="container-fluid mt-3">
            <ul className="list-inline border-list p-3 d-flex justify-content-around">
                {categories.map((category) => {
                    return (
                        <li key={category.id} className="list-inline-item font-list" onClick={() => selectCategory(category)}>{category.name}</li>
                    )
                })}
            </ul>
        </div>
    )
} 