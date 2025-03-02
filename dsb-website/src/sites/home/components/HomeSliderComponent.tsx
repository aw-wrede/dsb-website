import HomeDefaultLandingComponent from "./HomeDefaultLandingComponent";
import {useEffect, useState} from "react";
import './homeSliderStyle.sass'
import HomeLanLandingComponent from "./HomeLanLandingComponent";
import CalendarStandaloneComponent from "../../../components/calendar/CalendarStandaloneComponent";
import {Localization} from "../../../interfaces/StaffData";

export default function HomeSliderComponent() {

    const timePerPage = 10;

    const amount = 2
    const [currentElem, setCurrentElem] = useState(0)
    const [timeLeft, setTimeLeft] = useState(timePerPage)

    useEffect(() => {
        if(timeLeft === 0) {
            changeCurrentElement(currentElem+1 === amount ? 0 : currentElem+1)
            return
        }

        const timerId = setInterval(_ => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => clearInterval(timerId);

    }, [timeLeft])

    return (
        <section className="landing-section">
            <div className="carousel-container">
                <div className="carousel-content" style={{left: `-${currentElem*100}vw`}}>

                    <div className="carousel-elem">
                        <HomeDefaultLandingComponent />
                    </div>
                    <div className="carousel-elem home-calendar-carousel">
                        <CalendarStandaloneComponent locale={Localization.German} />
                    </div>

                </div>

                    <CarouselIndicator amount={amount} />

            </div>

        </section>
    )

    function changeCurrentElement(newValue) {
        setCurrentElem(newValue)
        setTimeLeft(timePerPage)
    }

    function CarouselIndicator({amount}) {
        let array:number[] = []
        for(let i = 0; i < amount; i++) {
            array.push(i)
        }

        return (
            <div className="carousel-indicator">
                {array.map((index) => (
                    <a key={index} className={`in-elem ${currentElem === index ? "active" : ""}`} onClick={() => changeCurrentElement(index)}> </a>
                ))}
            </div>
        )

    }
}

