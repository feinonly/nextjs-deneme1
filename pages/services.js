import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="max-w-2xl mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Hizmetlerimiz</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ServiceCard title="Web Geliştirme" description="Modern web uygulamaları geliştirme." />
                        <ServiceCard title="Mobil Uygulama" description="iOS ve Android için uygulama geliştirme." />
                        <ServiceCard title="Danışmanlık" description="Yazılım projeleri için danışmanlık hizmetleri." />
                        <ServiceCard title="Eğitim" description="Yazılım geliştirme konusunda eğitimler." />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Services;