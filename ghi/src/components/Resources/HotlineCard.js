import { useState } from 'react';

export default function Card() {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="block rounded-lg h-1/3 w-1/3 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[#9ca5a2] p-2" onClick={handleClick}>
            {!isClicked ? (
                <>
                    <div className="relative overflow-hidden bg-contain bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
                        <img className="rounded-lg h-full w-full" src="https://i.pinimg.com/564x/ea/05/ce/ea05ce978086caece3a9d052f29da43f.jpg" alt="" />
                        <a href="#!">
                            <div className="absolute bottom-0 left-0 right-0 top-0 h-1/2 w-1/2 overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                        </a>
                    </div>
                    <div className="p-2">
                        <h5 className="text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50 mb-1 text-center">Hotlines</h5>
                    </div>
                </>
            ) : (
                <div className="p-2 mt-2">
                    <Hotline />
                </div>
            )}
        </div>
    );
}

function Hotline() {
    return (
        <div>
            {/* <h1 className="text-base font-medium">Hotlines</h1> */}
            <h2 className="text-sm">
                <a href="https://988lifeline.org/">988 Suicide & Crisis Lifeline:</a> 24/7 Free & Confidential Support Chat & Text
            </h2>
            <h2 className="text-sm">
                <a href="https://www.aa.org/">Alcoholics Anonymous</a>
            </h2>
            <h2 className="text-sm">
                <a href="https://www.cdc.gov/hiv/library/hotlines.html">CDC National HIV & AIDS Hotline</a> (800)422-4453
            </h2>
            <h2 className="text-sm">
                <a href="https://www.thehotline.org/">National Domestic Violence Hotline</a> (800)799-7233
            </h2>
            <h2 className="text-sm">
                <a href="https://www.rainn.org/">National Sexual Assault Hotline</a> (800)656-4673
            </h2>
            <h2 className="text-sm">
                <a href="https://www.samhsa.gov/find-help/national-helpline">Substance Abuse & Mental Health Services Administration National Hotline</a> (800)662-4357
            </h2>
            <h2 className="text-sm">
                <a href="https://www.veteranscrisisline.net/">Veterans Crisis Line</a> 988 then press 1
            </h2>
        </div>
    );
}
