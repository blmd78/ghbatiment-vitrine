'use client';

import { ContactHero } from '@/features/contact/components/ContactHero';
import { ContactInfo } from '@/features/contact/components/ContactInfo';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { MapSection } from '@/features/contact/components/MapSection';

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ContactHero />

      <section className="relative px-4 lg:px-16 py-10 lg:py-16">
        <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden">
          <ContactInfo />

          <div className="bg-[#f5f4f0] py-10 lg:py-12 px-6 lg:px-16">
            <div className="max-w-lg mx-auto lg:mx-0">
              <h2 className="font-display text-3xl text-concrete-900 mb-10">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
    </div>
  );
}
