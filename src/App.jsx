import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import ciervoImg from './img/ciervo.png';
import img1 from './img/1.jpeg';
import img2 from './img/2.jpeg';
import img3 from './img/3.jpeg';
import img4 from './img/4.jpeg';
import img5 from './img/5.jpeg';
import img6 from './img/6.jpeg';
import video1 from './img/video 1.mp4';

// Componente de Confeti
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i);
  const colors = ['#ffd6d6', '#ffe8d6', '#fff5e1', '#ffd1dc', '#ffb6c1', '#ddd3c3'];

  return (
    <div className="confetti-container">
      {confettiPieces.map((i) => (
        <motion.div
          key={i}
          className="confetti"
          initial={{ 
            y: -20, 
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: window.innerHeight + 100,
            rotate: Math.random() * 360,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeIn"
          }}
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Componente de Globos Flotantes
const FloatingBalloons = () => {
  const balloons = [
    { emoji: '🎈', delay: 0, left: '10%' },
    { emoji: '🎈', delay: 2, left: '25%' },
    { emoji: '🎈', delay: 1, left: '75%' },
    { emoji: '🎈', delay: 3, left: '90%' },
    { emoji: '🎂', delay: 1.5, left: '50%' },
    { emoji: '🎉', delay: 2.5, left: '40%' },
    { emoji: '🎁', delay: 0.5, left: '60%' },
  ];

  return (
    <div className="balloons-container">
      {balloons.map((balloon, i) => (
        <motion.div
          key={i}
          className="balloon"
          initial={{ y: '110vh' }}
          animate={{ y: '-20vh' }}
          transition={{
            duration: 15,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: balloon.left }}
        >
          {balloon.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// ========== CONFIGURACIÓN PERSONALIZABLE ==========
const CONFIG = {
  nombre: "Alfonsina",
  edad: "1 AÑITO",
  fecha: "12 de Diciembre, 2025",
  fechaEvento: "2025-12-12T20:00:00", // Formato: YYYY-MM-DDTHH:MM:SS para el contador
  hora: "20:00 a 23:00 hs",
  ubicacion: {
    nombre: "Tiki",
    direccion: "Av. Manuel Belgrano 3466, San Miguel de Tucumán, Tucumán",
    googleMapsUrl: "https://www.google.com/maps/place/Tiki/@-26.809844,-65.2465341,20z/data=!4m6!3m5!1s0x94225dfb45eb9c65:0xba05cb24294d5fb4!8m2!3d-26.8098447!4d-65.2465341!16s%2Fg%2F11lt8cmr8y?entry=ttu"
  },
  whatsapp: {
    numero: "5493815231386", // Formato: 549 + código de área + número (sin 0 ni 15)
    mensaje: "¡Hola! Confirmo mi asistencia al primer cumpleaños de Alfonsina 🎂�"
  },
  imagenes: [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6
  ]
};

function App() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [displayedName, setDisplayedName] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Efecto de escritura a mano para el nombre
  useEffect(() => {
    let currentIndex = 0;
    const name = CONFIG.nombre;
    const typingSpeed = 200; // Velocidad más natural, como escribir a mano

    const timer = setInterval(() => {
      if (currentIndex <= name.length) {
        setDisplayedName(name.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

  // Ocultar confeti después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Contador regresivo
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(CONFIG.fechaEvento).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(CONFIG.whatsapp.mensaje)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-pastel-pink/20 overflow-hidden">
      
      {/* Animaciones de fondo */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>
      
      {/* HERO SECTION */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}
      >
        {/* Fondo con imagen difuminada */}
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        {/* Contenido */}
        <div className="relative z-10 text-center px-6 py-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl text-gray-800 mb-4"
              style={{ fontFamily: 'Beauty13, cursive' }}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              ¡Estás invitado al cumple de <span style={{ fontFamily: 'Beauty, cursive' }} className="handwritten-text">{displayedName}</span>!
            </motion.h1>
            <motion.p 
              className="font-poppins text-3xl md:text-4xl text-pink-600 font-bold mb-6"
              animate={{ 
                rotate: [-3, 3, -3],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ¡{CONFIG.edad}! 🎂
            </motion.p>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl text-gray-700" style={{ fontFamily: 'Beauty13, cursive' }}>
                {CONFIG.fecha}
              </p>
              <p className="text-xl md:text-2xl text-gray-600" style={{ fontFamily: 'Beauty13, cursive' }}>
                {CONFIG.hora}
              </p>
            </div>

            {/* Contador regresivo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12"
            >
              <p className="font-poppins text-lg text-gray-600 mb-4">Faltan:</p>
              <div className="flex justify-center gap-4 md:gap-8">
                <div className="countdown-item">
                  <div className="countdown-value">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Días</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Horas</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Min</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">Seg</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pastel-peach/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pastel-pink/30 rounded-full blur-3xl"></div>
      </motion.section>

      {/* DEER IMAGE SECTION - Parallax Effect */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.8 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2,
            ease: "easeOut",
            type: "spring",
            damping: 12
          }}
          viewport={{ once: true }}
          className="max-w-md mx-auto px-6"
          style={{
            willChange: "transform"
          }}
        >
          <motion.img
            src={ciervoImg}
            alt="Decoración de ciervo"
            className="w-full h-auto drop-shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.5 }
            }}
          />
        </motion.div>
      </motion.section>

      {/* MUSIC SECTION */}
      <section className="py-16 px-6" style={{ backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                🎵
              </motion.div>
              <h3 className="text-3xl md:text-4xl text-gray-800 mb-6" style={{ fontFamily: 'Beauty13, cursive' }}>
                Mirá el video especial
              </h3>
              
              {/* YouTube Player con autoplay */}
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-2xl"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/KQetemT1sWc?autoplay=1&mute=1&loop=1&playlist=KQetemT1sWc&controls=1"
                    title="Video especial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mt-6 text-pink-500 text-2xl"
              >
                ♪♫•*¨*•.¸¸♫♪
              </motion.div>
          </motion.div>
        </div>
      </section>

      {/* UBICACIÓN SECTION */}
      <section className="py-16 px-6" style={{ backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl text-gray-800 mb-8" style={{ fontFamily: 'Beauty13, cursive' }}>
              📍 Ubicación
            </h2>
            <div className="bg-beige-50 rounded-3xl p-8 shadow-lg">
              <h3 className="font-poppins text-2xl font-semibold text-gray-800 mb-2">
                {CONFIG.ubicacion.nombre}
              </h3>
              <p className="font-poppins text-lg text-gray-600 mb-6">
                {CONFIG.ubicacion.direccion}
              </p>
              
              {/* Google Maps Embed */}
              <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222.55913280319893!2d-65.24653412943039!3d-26.809844025220684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225dfb45eb9c65%3A0xba05cb24294d5fb4!2sTiki!5e0!3m2!1ses-419!2sar!4v1763322169953!5m2!1ses-419!2sar" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
              </div>

              <a
                href={CONFIG.ubicacion.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 text-white font-poppins font-medium px-8 py-4 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
              >
                Ver en Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RSVP SECTION */}
      <section className="py-16 px-6" style={{ backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-gray-800 mb-6" style={{ fontFamily: 'Beauty13, cursive' }}>
              Confirmá tu asistencia
            </h2>
            <p className="font-poppins text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nos encantaría contar con tu presencia. Por favor, confirmanos por WhatsApp.
            </p>

            {/* Video Polaroid */}
            <motion.div
              initial={{ y: 30, opacity: 0, rotate: -2 }}
              whileInView={{ y: 0, opacity: 1, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                transition: { duration: 0.3 }
              }}
              className="polaroid inline-block mb-8 max-w-md mx-auto"
            >
              <div className="polaroid-inner">
                <video 
                  src={video1}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-64 object-cover rounded"
                />
                <div className="polaroid-caption text-2xl">
                  💝
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-poppins font-semibold text-lg px-10 py-5 rounded-full hover:bg-[#20BA5A] transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Confirmar por WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* GALERÍA POLAROID */}
      <section className="py-20 px-6" style={{ backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Línea divisora decorativa */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-16"
          >
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent w-full max-w-3xl rounded-full"
              animate={{ 
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 rounded-full"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {CONFIG.imagenes.map((img, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0, rotate: 0 }}
                whileInView={{ y: 0, opacity: 1, rotate: index % 2 === 0 ? -2 : 2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
                className="polaroid"
              >
                <div className="polaroid-inner">
                  <img 
                    src={img} 
                    alt={`Momento ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="polaroid-caption">
                    ✨
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6" style={{ backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl text-gray-800 mb-6" style={{ fontFamily: 'Beauty13, cursive' }}>
              ¡Te esperamos para festejar juntos!
            </h3>
            <p className="font-poppins text-lg text-gray-600 mb-8">
              Tu presencia es el mejor regalo
            </p>
            
            {/* Botón compartir */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 bg-gray-800 text-white font-poppins font-medium px-6 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-md"
            >
              {copiedLink ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ¡Enlace copiado!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartir invitación
                </>
              )}
            </motion.button>

            <div className="mt-12 pt-8 border-t border-gray-300">
              <motion.p 
                className="font-poppins text-sm text-gray-500"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                Hecho con ❤️ para {CONFIG.nombre} 🎂✨
              </motion.p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
