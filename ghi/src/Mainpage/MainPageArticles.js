import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function MainPageArticles() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div>
            <section
                className=" bg-blueGray-200 -mt-24"
                style={{ marginBottom: "10rem", marginTop: "3rem" }}
                data-aos="fade-right"
                data-aos-duration="1500"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-1 shadow-lg rounded-lg">
                                <div className="px-4 flex-auto"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center mt-16">
                        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <img
                                    width="50"
                                    height="50"
                                    src="https://img.icons8.com/ios/50/1A1A1A/dog-house.png"
                                    alt="dog-house"
                                />
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                Boarding
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                Don't let your uses guess by attaching tooltips and popoves to
                                any element. Just make sure you enable them first via
                                JavaScript.
                            </p>
                            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                                The kit comes with three pre-built pages to help you get
                                started faster. You can change the text and images and you're
                                good to go. Just make sure you enable them first via
                                JavaScript.
                            </p>

                            <Link to="/boardingservices">
                                <button className="learnmore">
                                    <span className="open">Learn More</span>
                                </button>
                            </Link>

                        </div>
                        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg">
                                <img
                                    alt="..."
                                    src="https://stpaulpet.com/wp-content/uploads/dog-facts-cat-facts.jpg"
                                    className="w-full align-middle rounded-t-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="bg-blueGray-200 -mt-24"
                style={{ marginBottom: "10rem" }}
                data-aos="fade-left"
                data-aos-duration="1500"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center mt-16">
                        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg">
                                <img
                                    alt="..."
                                    src="https://www.seattlehumane.org/wp-content/uploads/2022/06/DogTraining-Tile.jpg"
                                    className="w-full align-middle rounded-t-lg"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <img
                                    width="70"
                                    height="70"
                                    src="https://img.icons8.com/pastel-glyph/64/1A1A1A/dog--v2.png"
                                    alt="dog--v2"
                                />
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                Training
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                Don't let your uses guess by attaching tooltips and popoves to
                                any element. Just make sure you enable them first via
                                JavaScript.
                            </p>
                            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                                The kit comes with three pre-built pages to help you get
                                started faster. You can change the text and images and you're
                                good to go. Just make sure you enable them first via
                                JavaScript.
                            </p>

                            <Link to="/trainingservices">
                                <button className="learnmore">
                                    <span className="open">Learn More</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section
                data-aos="fade-right"
                data-aos-duration="1500"
                className=" bg-blueGray-200 -mt-24"
                style={{ marginBottom: "10rem" }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-1 shadow-lg rounded-lg">
                                <div className="px-4 flex-auto"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center mt-16">
                        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <img
                                    width="64"
                                    height="64"
                                    src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/1A1A1A/external-animal-veterinary-and-pet-creatype-outline-colourcreatype-4.png"
                                    alt="external-animal-veterinary-and-pet-creatype-outline-colourcreatype-4"
                                />
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                Community
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                Don't let your uses guess by attaching tooltips and popoves to
                                any element. Just make sure you enable them first via
                                JavaScript.
                            </p>
                            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                                The kit comes with three pre-built pages to help you get
                                started faster. You can change the text and images and you're
                                good to go. Just make sure you enable them first via
                                JavaScript.
                            </p>
                        </div>
                        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg">
                                <img
                                    alt="..."
                                    src="https://www.braverypetfood.com/wp-content/uploads/2020/06/shutterstock_1269503761-1.jpg"
                                    className="w-full align-middle rounded-t-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}

export default MainPageArticles
