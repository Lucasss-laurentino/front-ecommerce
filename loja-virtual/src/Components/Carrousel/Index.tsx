import './Carrousel.css';
import Carousel from 'react-bootstrap/Carousel';
import Banner1 from './img/Banner1.png';
import Banner2 from './img/Banner2.png';

export default function Carrousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block img-fluid size-image"
                    src={Banner1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block img-fluid size-image"
                    src={Banner2}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}