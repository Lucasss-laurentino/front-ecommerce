import Products from '../../Inteface/Product';
import './CardProduct.css';

interface Props {
    product: Products | undefined,
    urlImage: string,
    setModalProductInfo: () => void,
    setProductInfo: (product: Products) => void,
}

export default function CardProduct({ product, urlImage, setModalProductInfo, setProductInfo }: Props) {

    const sendProductInfo = (product: Products | undefined) => {
        if (product) {
            setProductInfo(product)
            setModalProductInfo()
        }
    }

    return (
        <>
            <div className="card text-center mb-3 card-product card-size my-3 border border-white">
                <div className="ratio ratio-1x1">
                    <img className="card-img-top" src={urlImage + product?.imageOne} alt="Card image cap" />
                </div>
                <div className="card-body">
                    <p className="card-title color">{product?.name}</p>
                    <p className="card-text color">R$ {product?.price} </p>
                </div>
                <div className="background-button-product">
                    <a href="#" className="btn btn-sm py-2 text-white" onClick={() => sendProductInfo(product)}><strong>Ver produto</strong></a>
                </div>
            </div>

        </>
    )
}