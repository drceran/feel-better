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
                                    src="data:image/png;base64,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"
                                    alt="dog-house"
                                />
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                How Feel Better Works
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                Feel Better is the convenient way to get professional help from a licensed therapist.
                                With over 30,000 trained, experienced, and accredited therapists covering a
                                wide range of areas it's never been easier to receive personal, professional help when you need it.
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
                                    src="data:image/jpeg;base64,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"
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
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6qvYDvjvTjn0DnpGAwc83yY_D3g0TBthirPVnT0W48_0br8lEGYkLwbDLa08r6xdgqQ&usqp=CAU"
                                    className="w-full align-middle rounded-t-lg"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <img
                                    width="70"
                                    height="70"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAclBMVEX///8AAABTU1Orq6v7+/vn5+cXFxcvLy/Pz88HBwf39/cjIyNbW1tPT0+vr68NDQ3f39/t7e1jY2OPj4+Hh4dqamq7u7uampqBgYHJycnZ2dlBQUGhoaE7Ozt0dHRKSkocHBw9PT1xcXEoKCi2trY0NDQSVCmVAAAEmklEQVR4nO2c6bZzMBSGa6ypqKEo1dH93+JHe87pgAiC9Fvv80tXo/ZTJDux29UKAAAAAAAAAAAAAAAAAAAAAAAAAIAlcmDtiA2UMHRnimUUsSDoxEAPgrCeK5gxbARBsEkN9LKBPFc0I6ASMeaKZgQQ4Q2I8IKcr+84ZZzmfev8Pp4o4qNB+b7w2BK5HE8ioYbz9sWL9QbHpYIlEdfjFJTXBof6+1wOjMqpFmf41sDWP9/XiffSYsjanbSM0L9vfd4B20eDyie5b20XiZOWr++1foEIb0CEN7yqUyI1KLtpZ65gxuCu9Quxga060kyxAADAAHaW/w2rP53sywHQXzoIFkjlACkuHQQLIMIbEOENiPAGRHgDIjxgKE+qxe3jy2u+lxffsZ2GBe2WFWGuuZI8BGG/dHzUFGQRLh/vNKIV6pPqMtNfXpvR0uEN5Kt7rVcgwhsQ4Q2I8AZEeAMivGGXItbSQbBAKbPG/+OZoeuT64DBl2HYcRjbX/+oyA0f8//Td1+ee+9ZrMZnkRoVmvU603eU7j1WK9l8UC3V3P62FiXZfKxZkAtDfpB/GldDsPS3tSC7tLb4YtLsx5nIraEiVRBo9uRJRJbWjcthKtXOlCLy/uZfrPRQHNKNlfu2xryCTM7a1ik9qt27RWQt8opa6a5wtSKGS6BGVK8e/uFE12uRReQkOBIWplUrozpKp4avth7jTLfQShJRMpG4uv6giJORacQ2bj+MTlvO0iqi+OduiR8cccRVpuSEb6ug/txmESOr9+ZdMuklummKIRtbxd1rye5mS1nkB3F+CT1L9LLm3sEN63ffk5j+XDeLSH01KDg1VKC+plR1TGLN6mIigvN5mbynVDW8Xj38jCIfHXstpXpHvfXRmFdEf7niG1KqN8S+j07nFBH+gmtOqZ44WU+NJpHqV0PBJB6/OVNLSvWEcgzsEBHCJKIYBwcQ3w/YmlL9ogdDBtgGkalIq15IMruarbUBGjOKOHHloXSe63xgWj2ZiO6crsX5KHphHgdRljziO3bs1WsMZCziqOa6mqR4lzzwo8zeJZpbZiqNB/M6PiscPssZI+JI7rbPkd2OsaPvGMhMJOh1JI2YHpZYo8qHxogQSzKMrbsvU2CpSoAvnpW2z5weqCMX7seImNW4JRuKWybtdpWy52XEm7RYm2rvgWgzdqY57mY/qR2XCyUDUhK2Iow4Mpj4cyDC4HRwIcLidHAgwuZ0LC8yurPiQ2Ts2MGLyLihnBsRk+3DwcVEhs47OBMphk0DeRNxJvih5RIiFrM+t0OETSLYxnWaCoAGEWm171zqGIwTTPSvD3WRdNX4v0ZsmOSqahGZ8G4pBq+RcCVyYpUfLisy2c0xr4ieT/0LK5LI6WDlfnZL9oqy3Rr3Z4PJTYpi71h0rYl8aFwmu8c7RHZiLJFrG4yqEuJ4pRly1HiO37uNrEWR97bvnUnnZx3N83dBbIpqtpoUeKlZOz9qOGGH+w7T6iBZSewozj0xTQ9FsRldEtHr2CxFlgQivAER3pCtB9V/4yR/WwAAAAAAAAAAAAAAAAAAAAAAAAAA/PEPUIdCgwa6W1QAAAAASUVORK5CYII="
                                    alt="icon-benefits"
                                />
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                Benefits of Feel Better
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                Feel Better offers several benefits that make it an attractive
                                option for individuals seeking healthcare services.
                                Here are the key advantages:
                                <p> Eliminate commute time and scheduling hassles
                                    Flexible plans to meet your needs and lifestyle
                                    Seamlessly switch providers, at no extra cost
                                    Save money while receiving high-quality care</p>

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
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03V1gcfm0pDl2HWjVwzWE792OrfL4ceec6vuKH1RBzj5pifIDeAu-xEhMnve6FYdrHLk&usqp=CAU"
                                    alt="community-icon"
                                />
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                Community
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                With Better Health discover a nurturing haven of community understanding and
                                transformative resources on our therapist-guided web page,
                                where you'll find solace, support,
                                and valuable insights to embark on a profound healing journey together.
                            </p>
                        </div>
                        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg">
                                <img
                                    alt="..."
                                    src="https://www.counselingcenterofmaryland.com/wp-content/uploads/2020/11/Screenshot-2022-11-30-at-2.27.34-PM-300x200.png"
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
