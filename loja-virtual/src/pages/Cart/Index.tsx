import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../http/http';
import Products from '../../Inteface/Product';
import './Index.css';

export default function IndexCart() {
    
    const [productsCart, setProductsCart] = useState<Products[][]>([]);
    const [productsChecked, setProductsChecked] = useState<Products[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        http.get('getProductsThisUser/1').then((response) => {

            setProductsCart(response.data);
        
        });

    }, []);

    // Total de produtos $
    const selectProducts = (product: Products) => {

        var element = document.getElementById(product.name);

        if(element?.getAttribute('checked')){

            element.removeAttribute('checked');
            setTotal(total - parseFloat(product.price));
        
        } else {

            element?.setAttribute('checked', 'checked');
            setTotal(total + parseFloat(product.price));
            
        }

    }

    return (
        <section className="h-100 h-custom mt-1 ">
            <div className="container-fluid p-0">
                <div className="row d-flex justify-content-center align-items-center w-100 m-0">
                    <div className="col">
                        <div className="card border border-white">
                            <div className="card-body p-4">

                                <div className="row">

                                    <div className="col-lg-7 roll-y my-3">
                                        <h5 className="mb-3"><Link to="/" className="color">Voltar</Link></h5>
                                        <hr className='text-danger' />

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1 color">Carrinho de compras</p>
                                                <p className="mb-0 color">Você tem {productsCart.length} items em seu carrinho</p>
                                            </div>
                                        </div>

                                        {productsCart.map((productCart) => {
                                            return (
                                                <div className="card-border mb-3" key={productCart[0]['id']}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <input type="checkbox" name={productCart[0]['name']} className='m-2' id={productCart[0]['name']} onClick={() => selectProducts(productCart[0])}/>
                                                            <div className="d-flex color flex-row align-items-center col-7 col-lg-6 col-sm-5 col-md-4">
                                                                <div>
                                                                    <img
                                                                        src={"http://127.0.0.1:8000/storage/"+productCart[0]['imageOne']}
                                                                        className="img-fluid rounded-3 wid" alt="Shopping item" />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5 className='responsive'>{productCart[0]['name']}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-end flex-row align-items-center col-3 col-lg-3 col-sm-3 col-md-4">
                                                                <div className=''>
                                                                    <h5 className='mb-0 color responsive'>R$:{productCart[0]['price']}</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>


                                    <div className="col-lg-5">

                                        <div className="back text-white rounded-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-0">
                                                    <h5 className="mb-0">Método de pagamento</h5>
                                                </div>
                                                <form className="mt-3">
                                                    <div className="form-outline form-white mb-4">
                                                        <input type="text" id="typeName" className="form-control form-control-lg"
                                                            placeholder="Nome do titular do cartão" />
                                                        <label className="form-label" htmlFor="typeName">Nome do titular do cartão</label>
                                                    </div>

                                                    <div className="form-outline form-white mb-4">
                                                        <input type="text" id="" className="form-control form-control-lg"
                                                            placeholder="1234 5678 9012 3457" />
                                                        <label className="form-label" htmlFor="typeText">Número do cartão</label>
                                                    </div>

                                                    <div className="row mb-4">
                                                        <div className="col-md-6">
                                                            <div className="form-outline form-white">
                                                                <input type="text" id="typeExp" className="form-control form-control-lg"
                                                                    placeholder="MM/YYYY" />
                                                                <label className="form-label" htmlFor="typeExp">Expiração</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-outline form-white">
                                                                <input type="password" id="typeText" className="form-control form-control-lg"
                                                                    placeholder="&#9679;&#9679;&#9679;" />
                                                                <label className="form-label" htmlFor="typeText">Ccv</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Total</p>
                                                    <p className="mb-2">R$ {total}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Envio</p>
                                                    <p className="mb-2">$20.00</p>
                                                </div>
                                                <button type="button" className="btn text-white back border border-white btn-block btn-lg">
                                                    <div className="d-flex justify-content-between">
                                                        <span>Finalizar Compra</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}