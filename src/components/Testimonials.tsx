"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Développeuse Frontend Senior",
    company: "TechCorp",
            content: "Velocity a transformé notre approche de l'optimisation des performances. Les recommandations de l'IA sont incroyablement précises et actionnables.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Développeur",
    company: "StartupXYZ",
    content: "Enfin, un outil qui ne vous dit pas seulement ce qui ne va pas, mais vous montre exactement comment le corriger. Un changement de jeu pour notre équipe.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emma Thompson",
    role: "Ingénieure Performance",
    company: "E-commerce Inc",
    content: "La fonctionnalité de coach IA personnalisé est brillante. C'est comme avoir un développeur senior qui examine votre code 24h/24 et 7j/7.",
    rating: 5,
    avatar: "ET"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Adoré par les premiers utilisateurs
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez ce que disent les développeurs de l'optimisation alimentée par l'IA de Velocity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-blue-400 opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  <div className="text-gray-500 text-sm">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "98%", label: "Taux de précision" },
            { number: "2,3s", label: "Temps économisé en moy." },
            { number: "500+", label: "Sites optimisés" },
            { number: "4,9/5", label: "Note utilisateur" }
          ].map((stat, index) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
