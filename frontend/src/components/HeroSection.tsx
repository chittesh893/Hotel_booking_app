import React from 'react';


const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 min-h-[70vh] flex items-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-black"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Find your perfect
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                            stay anywhere
                        </span>
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Discover amazing hotels, resorts, and unique stays around the world.
                        Book with confidence and create unforgettable memories.
                    </p>
                </div>


                {/* Quick Links */}
                <div className="mt-12 text-center">
                    <p className="text-blue-200 mb-4">Popular destinations:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Bali'].map((city) => (
                            <button
                                key={city}
                                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20"
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection; 