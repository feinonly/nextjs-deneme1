import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Hakkında</h1>
                    <p className="text-gray-700">
                        Biz, yazılım geliştirme alanında uzman bir ekibiz. Müşterilerimize en iyi hizmeti sunmak için çalışıyoruz.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;