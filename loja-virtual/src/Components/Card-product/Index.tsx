import './CardProduct.css';
import imageTeste from './products/teste.webp';

export default function CardProduct() {


    return (

        <>
        <div className="col-6 col-md-4 p-0 d-flex justify-content-center align-items-stretch mx-1 col-height">
                <div className="card text-center mb-3 card-product card-size my-3"> {/* width 100% */}
                    <div className="ratio ratio-1x1">
                        <img className="card-img-top" src={imageTeste} alt="Card image cap" />
                        </div>
                    <div className="card-body">
                        <p className="card-title">Vestido longo</p>
                        <p className="card-text">R$ 230.00</p>
                    </div>
                    <div className="background-button-product">
                        <a href="#" className="btn btn-sm py-2 text-white"><strong>Ver produto</strong></a>
                    </div>
                </div>
        </div>
        </>



    )


}