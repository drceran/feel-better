import React, { useState, useRef, useEffect } from "react";
import { useGetTherapistsQuery } from "../../store/usersApi.js";
import { useParams, useNavigate } from "react-router-dom";

export default function Carousel() {
    const { id } = useParams();
    const { data: userData, isLoading } = useGetTherapistsQuery(id);
    let navigate = useNavigate();

    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    // const isDisabled = (direction) => {
    //     if (direction === 'prev') {
    //         return currentIndex <= 0;
    //     }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);

    if (isLoading) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    const navigateToProfile = (id) => {
        navigate(`/jotters/${id}`);
    }

    const therapists = userData.filter((therapist) => therapist.type === "therapist");

    return (
        <div className="carousel my-12 w-full mx-auto">
            <h2 className="text-xl leading-8 font-semibold mb-12 text-slate-700 text-center">
                Our Therapists
            </h2>
            <div className="relative overflow-hidden">
                <div className="flex justify-between absolute top left w-full h-full">
                    <button
                        onClick={movePrev}
                        className="hover:bg-blue-900/75 text-white w-10 h-1/2 pb-36 text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                        // disabled={isDisabled('prev')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-20 -ml-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="sr-only">Prev</span>
                    </button>
                    <button
                        onClick={moveNext}
                        className="hover:bg-blue-900/75 text-white w-10 h-1/2 pb-36 text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                        // disabled={isDisabled('next')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-20 -ml-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
                <div
                    ref={carousel}
                    className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                >
                    {therapists.map((therapist, index) => {
                        return (
                            <div
                                key={therapist.id}
                                className="carousel-item text-center relative w-64 h-64 snap-start"
                            >
                                <p className="h-3/4 w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
                                    {therapist.first_name} {therapist.last_name}
                                    <img
                                        src={therapist.profile_picture} alt="profilepic"
                                        onClick={() => navigateToProfile(therapist.id)}
                                    />
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};




//// import data from './data.json'
// import React, { useState, useRef, useEffect } from "react";

// export default function Carousel() {
//     const maxScrollWidth = useRef(0);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const carousel = useRef(null);

//     const movePrev = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex((prevState) => prevState - 1);
//         }
//     };

//     const moveNext = () => {
//         if (
//             carousel.current !== null &&
//             carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
//         ) {
//             setCurrentIndex((prevState) => prevState + 1);
//         }
//     };

//     const isDisabled = (direction) => {
//         if (direction === 'prev') {
//             return currentIndex <= 0;
//         }

//         if (direction === 'next' && carousel.current !== null) {
//             return (
//                 carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
//             );
//         }

//         return false;
//     };

//     useEffect(() => {
//         if (carousel !== null && carousel.current !== null) {
//             carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
//         }
//     }, [currentIndex]);

//     useEffect(() => {
//         maxScrollWidth.current = carousel.current
//             ? carousel.current.scrollWidth - carousel.current.offsetWidth
//             : 0;
//     }, []);

//     return (
//         <div className="carousel my-12 w-1/4 mx-auto">
//             <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
//                 Our Therapists
//             </h2>
//             <div className="relative overflow-hidden">
//                 <div className="flex justify-between absolute top left w-full h-full">
//                     <button
//                         onClick={movePrev}
//                         className="hover:bg-blue-900/75 text-white w-10 h-1/2 pb-36 text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//                         disabled={isDisabled('prev')}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-10 w-20 -ml-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M15 19l-7-7 7-7"
//                             />
//                         </svg>
//                         <span className="sr-only">Prev</span>
//                     </button>
//                     <button
//                         onClick={moveNext}
//                         className="hover:bg-blue-900/75 text-white w-10 h-1/2 pb-36 text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//                         disabled={isDisabled('next')}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-10 w-20 -ml-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M9 5l7 7-7 7"
//                             />
//                         </svg>
//                         <span className="sr-only">Next</span>
//                     </button>
//                 </div>
//                 <div
//                     ref={carousel}
//                     className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
//                 >
//                     {data.resources.map((resource, index) => {
//                         return (
//                             <div
//                                 key={index}
//                                 className="carousel-item text-center relative w-64 h-64 snap-start"
//                             >
//                                 <a
//                                     href={resource.link}
//                                     className="h-3/4 w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
//                                     style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
//                                 >
//                                     <img
//                                         src={resource.imageUrl || ''}
//                                         alt={resource.title}
//                                         className="w-full aspect-square hidden"
//                                     />
//                                 </a>
//                                 <a
//                                     href={resource.link}
//                                     className="h-1/2 w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
//                                 >
//                                     <h3 className="text-white py-6 px-3 mx-auto text-xl">
//                                         {resource.title}
//                                     </h3>
//                                 </a>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };
