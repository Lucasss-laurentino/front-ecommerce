import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Quantity from '../../Components/Quantity/Index';
import http from '../../http/http';
import Products from '../../Inteface/Product';
import './Index.css';
import Address from '../../Inteface/Address';
import ModalAddress from '../../Components/ModalAddress';

export default function IndexCart() {

    const [productsCart, setProductsCart] = useState<Products[][]>([]);
    const [total, setTotal] = useState<number>(0);
    const [classQuantity, setClassQuantity] = useState<string>('d-none justify-content-around my-2');
    const [address, setAddress] = useState<Address>();
    const [send, setSend] = useState<string>('');
    
    const [modalAddress, setModalAddress] = useState<boolean>(false);

    <ModalAddress 
        modalAddress={modalAddress}
        setModalAddress={() => setModalAddress(false)}
    />

    useEffect(() => {

        const id = localStorage.getItem('user');

        http.get('getProductsThisUser/'+id).then((response) => {
            if(response.data != 'false'){
                setProductsCart(response.data);
            }
        });


            http.get('getAddress/'+id).then((response) => {
                setAddress(response.data)

                var cep = response.data.cep

                let args = {
                    sCepOrigem: '01153 000',
                    sCepDestino: cep,
                    nVlPeso: '1',
                    nCdFormato: '1',
                    nVlComprimento: '20',
                    nVlAltura: '20',
                    nVlLargura: '20',
                    nVlDiametro: '0',
                    nCdServico: '04014',
                    nCdEmpresa: '',
                    sDsSenha: '',
                    sCdMaoPropria: 'n',
                    nVlValorDeclarado: '0',
                    sCdAvisoRecebimento: 'n',
                    StrRetorno: 'xml',
                    nIndicaCalculo: '3',
                };
    
                http.post('getPriceCor', {args}).then((response) => {
                    setSend(response.data.cServico.Valor)
                })

            })


    }, []);

    // Total de produtos $
    const selectProducts = (product: Products) => {

        var element = document.getElementById(product.name);
        var quantity = document.getElementById('produto'+product.id);

        if (element?.getAttribute('checked')) {

            element.removeAttribute('checked');

            quantity?.setAttribute('class', 'd-none justify-content-around my-2');
            
            setTotal(total - parseFloat(product.price));

        } else {

            element?.setAttribute('checked', 'checked');
                        
            quantity?.setAttribute('class', 'd-flex justify-content-around my-2');
            
            setTotal(total + parseFloat(product.price));

        }

    }

    const deleteItemCart = (product: Products) => {

        var element = document.getElementById(product.name);

        if(element?.getAttribute('checked')){
            setTotal(0);
        }

        http.delete('deleteItemCart/'+product.id).then((response) => {
            http.get('getProductsThisUser/1').then((response) => {
                setProductsCart(response.data);
    
            });
        });
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
                                                        <div className="d-flex justify-content-end align-items-center">
                                                            <button className='btn-trash-product-cart' onClick={() => deleteItemCart(productCart[0])}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <input type="checkbox" name={productCart[0]['name']} className='m-2' id={productCart[0]['name']} onClick={() => selectProducts(productCart[0])} />
                                                            <div className="d-flex color flex-row align-items-center col-7 col-lg-6 col-sm-5 col-md-4">
                                                                <div>
                                                                    <img
                                                                        src={"http://127.0.0.1:8000/storage/" + productCart[0]['imageOne']}
                                                                        className="img-fluid rounded-3 wid" alt="Shopping item" />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5 className='responsive'>{productCart[0]['name']}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-end flex-row align-items-center col-3 col-lg-3 col-sm-3 col-md-4">
                                                                <div className=''>
                                                                    <h5 className='mb-0 color responsive'>R$:{productCart[0]['price']}</h5>

                                                                    <Quantity
                                                                        total={total}
                                                                        setTotal={(total) =>  setTotal(total)}
                                                                        productCart={productCart[0]}
                                                                        classQuantity={classQuantity}
                                                                    />
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
                                                    <p className="mb-2">$ {send}</p>
                                                </div>
                                                {address ?
                                                <div className="my-3">
                                                    <p className="m-0">{address?.state+', '+address?.city}</p>
                                                    <p className="m-0">
                                                        {address?.district + ', ' + address?.street + ', número ' + address?.number}
                                                    </p>
                                                </div>
                                                : <p className='my-4' onClick={() => setModalAddress(true)}>Cadastre um endereço</p>}
                                                <button type="button" disabled={true} className="btn text-white back border border-white btn-block btn-lg">
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