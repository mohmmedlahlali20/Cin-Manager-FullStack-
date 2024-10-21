import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
    const navigate = useNavigate();

    const Videos = [
        {
            id: 1,
            title: "Gyomei vs Muzan",
            description: "kimitsu no yaiba",
            videoSrc: "../../../assets/video/demon.mp4",
        },
        {
            id: 2,
            title: "Eren vs Armin",
            description: "Attack on titan S4",
            videoSrc: "../../../assets/video/eren.mp4",
        },
        {
            id: 3,
            title: "Keneki vs Jason",
            description: "Tokyo Ghoul S2",
            videoSrc: "../../../assets/video/keneki.mp4",
        },
    ];

    const movies = [
        {
            id: 1,
            title: "COCO",
            description: "An exciting movie adventure.",
            img: "../../../assets/img/coco.jpg",
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
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
        }
    });

    const handleButtonClick = () => {
        navigate('/movies');
    };

    return (
        <div className="bg-black text-white min-h-screen">

            <section className="relative h-screen flex items-center justify-center">
                <video
                    className="absolute inset-0 object-cover w-full h-full"
                    src="../../../assets/video/hero_banner.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>

                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <div className="z-20 text-center space-y-6 px-8">
                    <h1 className="text-6xl font-extrabold text-white tracking-widest drop-shadow-md">Cinema World</h1>
                    <p className="text-2xl text-gray-400 max-w-lg mx-auto">
                        Enjoy the latest movies with premium sound and picture quality.
                    </p>
                    <button
                        onClick={handleButtonClick}
                        className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-10 py-4 rounded-full shadow-lg transition-transform transform hover:scale-110">
                        Book Tickets Now
                    </button>
                </div>
            </section>



            <section className="py-16 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
                        spaceBetween={40}
                        slidesPerView={1.2}
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
                        {Videos.map((video) => (
                            <SwiperSlide key={video.id}>
                                <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transform transition duration-500">
                                    <video
                                        src={video.videoSrc}
                                        alt={video.title}
                                        autoPlay
                                        className="object-cover w-full h-72 opacity-80 hover:opacity-100 transition-opacity duration-300"
                                        controls
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <h2 className="text-3xl font-bold text-teal-400">{video.title}</h2>
                                        <p className="mt-4 text-gray-300">{video.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className="py-16 bg-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-teal-500">Upcoming Movies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                        {movies.map((movie) => (
                            <div key={movie.id} className="movie-card bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    className="w-full h-56 object-cover rounded-md mb-6"
                                />
                                <h3 className="text-2xl font-semibold text-teal-400">{movie.title}</h3>
                                <p className="mt-4 text-gray-400">{movie.description}</p>
                                <button className="mt-6 bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
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
