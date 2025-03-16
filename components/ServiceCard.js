const ServiceCard = ({ title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default ServiceCard;