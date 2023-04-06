import HomeDefaultLandingComponent from "./HomeDefaultLandingComponent";
import {useEffect, useState} from "react";
import './homeSliderStyle.sass'
import HomeLanLandingComponent from "./HomeLanLandingComponent";

export default function HomeSliderComponent() {

    const timePerPage = 10000;

    const amount = 2
    const [currentElem, setCurrentElem] = useState(0)


    useEffect(() => {
        let current = currentElem
        const timer = setInterval(() => {
            if(current === amount-1) {
                setCurrentElem(0)
                current = 0
            } else {
                setCurrentElem(current+1)
                current++
            }
        }, timePerPage)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="landing-section">
            <div className="carousel-container">
                <div className="carousel-content" style={{left: `-${currentElem*100}vw`}}>

                    <div className="carousel-elem">
                        <HomeLanLandingComponent />
                    </div>
                    <div className="carousel-elem">
                        <HomeDefaultLandingComponent />
                    </div>

                </div>

                    <CarouselIndicator amount={amount} />

            </div>

        </section>
    )

    function changeCurrentElement(newValue) {
        setCurrentElem(newValue)
    }

    function CarouselIndicator({amount}) {
        let array:number[] = []
        for(let i = 0; i < amount; i++) {
            array.push(i)
        }

        return (
            <div className="carousel-indicator">
                {array.map((index) => (
                    <a key={index} className={`in-elem ${currentElem === index ? "active" : ""}`} onClick={() => changeCurrentElement(index)}></a>
                ))}
            </div>
        )

    }
}

