'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Cloud, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';

const Services = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices for optimal performance.',
      fullDescription: 'We create responsive, fast, and scalable web applications using cutting-edge technologies like React, Next.js, and Node.js.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Scalable Architecture'],
      bgColor: 'bg-blue-600',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      iconHoverBg: 'group-hover:bg-blue-600',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that deliver seamless user experiences.',
      fullDescription: 'Build powerful mobile applications for iOS and Android using React Native or native technologies.',
      features: ['iOS & Android', 'Cross-platform', 'Native Performance', 'Push Notifications'],
      bgColor: 'bg-purple-600',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      iconHoverBg: 'group-hover:bg-purple-600',
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to power your digital transformation.',
      fullDescription: 'Leverage the power of cloud computing with AWS, Azure, or Google Cloud.',
      features: ['AWS/Azure/GCP', 'Auto-scaling', 'Cost Optimization', 'High Availability'],
      bgColor: 'bg-cyan-600',
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      iconHoverBg: 'group-hover:bg-cyan-600',
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your business from digital threats.',
      fullDescription: 'Protect your digital assets with enterprise-grade security solutions.',
      features: ['Threat Detection', 'Compliance', 'Data Encryption', 'Security Audits'],
      bgColor: 'bg-red-600',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      iconHoverBg: 'group-hover:bg-red-600',
    },
    {
      icon: Zap,
      title: 'API Development',
      description: 'Robust and scalable APIs that connect your services and enable seamless integrations.',
      fullDescription: 'Design and build RESTful and GraphQL APIs that power your applications.',
      features: ['RESTful APIs', 'GraphQL', 'API Documentation', 'Rate Limiting'],
      bgColor: 'bg-yellow-600',
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      iconHoverBg: 'group-hover:bg-yellow-600',
    },
    {
      icon: Users,
      title: 'IT Consulting',
      description: 'Strategic technology consulting to help you make informed decisions and drive growth.',
      fullDescription: 'Get expert guidance on technology strategy, architecture design, and digital transformation.',
      features: ['Tech Strategy', 'Architecture Design', 'Team Training', 'Code Review'],
      bgColor: 'bg-green-600',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      iconHoverBg: 'group-hover:bg-green-600',
    },
  ];

  // Auto-rotate services when not hovering
  useEffect(() => {
    if (!isUserHovering) {
      const interval = setInterval(() => {
        setSelectedService((prev) => (prev + 1) % services.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isUserHovering, services.length]);

  return (
    <section
      id="services"
      className="min-h-screen py-20 lg:py-32 bg-white relative overflow-hidden flex items-center"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute top-12 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ y: yHeader }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100 mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Solutions That Drive <span className="text-blue-600">Results</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We offer comprehensive IT services tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid with Description Panel */}
        <div className="relative">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Services Grid */}
            <motion.div
              style={{ y: yGrid }}
              className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setSelectedService(index);
                    setIsUserHovering(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setIsUserHovering(false);
                  }}
                  className="group relative cursor-pointer"
                  style={{
                    filter: hoveredIndex !== null && hoveredIndex !== index ? 'blur(3px)' : 'blur(0px)',
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-6 h-full border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl ${service.iconBg} ${service.iconColor} ${service.iconHoverBg} flex items-center justify-center mb-4 transition-colors duration-300 group-hover:text-white`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description Panel */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`${services[selectedService].bgColor} rounded-2xl p-8 shadow-2xl text-white`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        {(() => {
                          const ServiceIcon = services[selectedService].icon;
                          return <ServiceIcon className="w-7 h-7 text-white" />;
                        })()}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4">
                      {services[selectedService].title}
                    </h3>

                    <p className="text-white/95 leading-relaxed mb-6 text-sm">
                      {services[selectedService].fullDescription}
                    </p>

                    <div className="space-y-3 mb-8">
                      <h4 className="text-xs font-semibold uppercase tracking-wider opacity-90">Key Features</h4>
                      {services[selectedService].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex space-x-2 mt-6 justify-center">
                      {services.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === selectedService ? 'w-8 bg-white' : 'w-2 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <p className="text-gray-600 mb-6">
            Need a custom solution? We're here to help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
