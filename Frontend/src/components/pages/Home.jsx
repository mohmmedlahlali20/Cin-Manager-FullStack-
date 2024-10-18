import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {

    const navigate = useNavigate();


    const logos = [
        {
            id: 1,
            title: "Movie 1",
            description: "An exciting movie adventure.",
            img: "assets/img/Netflix.png",
        },
        {
            id: 2,
            title: "Movie 2",
            description: "A thrilling experience.",
            img: "assets/img/Netflix.png",
        },
        {
            id: 3,
            title: "Movie 3",
            description: "An emotional journey.",
            img: "assets/img/Netflix.png",
        },
    ];

    const movies = [
        {
            id: 1,
            title: "prison Break",
            description: "An exciting movie adventure.",
            img: "src/assets/films/prisonBreak.png",
        },
        {
            id: 2,
            title: "Game Of Thrones",
            description: "A thrilling experience.",
            img: "src/assets/films/GameOfThrones.png",
        },
        {
            id: 3,
            title: "Movie 3",
            description: "An emotional journey.",
            img: "src/assets/films/img.png",
        },
    ];


    useEffect(() => {
        const token = Cookies.get('token')
        console.log('token lmli7', token)
        if (!token) {
            navigate('/login')
        }

    })
    const handleButtonClick = () => {
        const token = Cookies.get('token')
        console.log("toekn: " , token)
        navigate('/cinema')
       


    };




    return (
        <div className="bg-gray-900 text-white">

            <section className="hero h-screen relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 z-10"></div>
                <div className="z-20 text-center space-y-5 px-6">
                    <h1 className="text-5xl font-bold drop-shadow-lg">Welcome to Cinema World</h1>
                    <p className="text-lg max-w-md mx-auto">
                        Experience the latest movies in high definition with state-of-the-art sound.
                    </p>
                    <button onClick={handleButtonClick} className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-lg">
                        Book Tickets Now
                    </button>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-800">
                <div className="max-w-6xl mx-auto">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
                        spaceBetween={30}
                        slidesPerView={1.5}
                        centeredSlides
                        loop
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        effect="coverflow"
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        className="movie-slider"
                    >
                        {logos.map((logo) => (
                            <SwiperSlide key={logo.id}>
                                <div className="logo-slide relative overflow-hidden rounded-xl  shadow-lg">
                                    <img
                                        src={logo.img}
                                        alt={logo.title}
                                        className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <h2 className="text-3xl font-semibold">{logo.title}</h2>
                                        <p className="mt-3 text-lg">{logo.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-900">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-semibold text-center mb-12">Upcoming Movies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {movies.map((movie) => (
                            <div key={movie.id} className="movie-card bg-bleu-900 p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    className="w-full h-30 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-2xl font-bold">{movie.title}</h3>
                                <p className="mt-2 text-sm text-gray-400">{movie.description}</p>
                                <button className="mt-4 bg-blue-600 px-4 py-2 rounded-full text-sm hover:bg-blue-700">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;