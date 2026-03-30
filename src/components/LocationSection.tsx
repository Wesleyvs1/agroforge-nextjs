'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Car } from 'lucide-react'

export default function LocationSection() {
  return (
    <section
      id="localizacao"
      className="relative overflow-hidden bg-stone-100 py-24 md:py-32"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-[0.03]" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl font-extrabold text-stone-900 md:text-5xl"
          >
            Nossa <span className="text-primary">Localização</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Informações de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h3 className="mb-6 font-heading text-3xl font-black tracking-tight text-stone-900 md:text-4xl">
              De portas abertas no{' '}
              <span className="italic text-primary">Taboão</span>
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-stone-600">
              Nossa loja matriz está localizada em um ponto prático e de fácil
              acesso para quem vem a Curitiba. Valorizamos o atendimento
              clássico: olho no olho e focado em entender sua necessidade. Venha
              conhecer nosso espaço amplo, seja para buscar um produto colonial,
              a ração do mês, ou apenas para tomar um café passado na hora com a
              gente.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                  <MapPin size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-stone-900">
                    Endereço Principal
                  </h4>
                  <p className="text-stone-600">
                    Rod. dos Minérios, 1949 - Taboão
                    <br />
                    Curitiba - PR, 82130-570
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-accent-dark flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 shadow-sm">
                  <Car size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-stone-900">
                    Ponto de Referência
                  </h4>
                  <p className="font-medium text-stone-600">
                    Nossa loja fica muito fácil de encontrar, exatamente{' '}
                    <span className="font-bold text-primary">
                      ao lado da Janayna Autopeças
                    </span>
                    . Contamos com estacionamento próprio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-stone-200 text-stone-600 shadow-sm">
                  <Phone size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-stone-900">
                    Canais de Contato
                  </h4>
                  <p className="text-stone-600">
                    Whatsapp: (41) 99195-7593
                    <br />
                    Fixo: (41) 3336-7593
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mapa Incorporado (Google Maps) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-morphism relative order-1 h-[450px] w-full overflow-hidden rounded-[40px] border-[6px] border-white shadow-2xl md:h-[550px] lg:order-2"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.3789431878345!2d-49.2783307!3d-25.3250645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce61a66a7ec09%3A0xc6cb6902507851d9!2sRodovia%20dos%20Min%C3%A9rios%2C%201949%20-%20Tabo%C3%A3o%2C%20Curitiba%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1716382029999!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-[34px]"
              title="Mapa de Localização AgroForge"
            ></iframe>

            {/* Soft gradient overlay on the map edges to blend it beautifully */}
            <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-inset ring-black/10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
