
function MainPageCover() {
    return (
        <section
            className=" w-screen h-screen bg-cover bg-no-repeat bg-center bg-[url('https://www.slu.edu/news/img/20221103-rose-octavia.jpg')] bg-gray-600 bg-blend-multiply"
            style={{ backgroundSize: "cover" }}
        >
            <div className="px-4 mx-auto max-w-screen-l text-center py-24 lg:py-80">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    Welcome to Feel Better
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                    The #1 Wellness Application
                </p>
            </div>
        </section>
    );
}
export default MainPageCover
