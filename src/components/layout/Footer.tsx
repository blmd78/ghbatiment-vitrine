import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {label: 'Accueil', href: '/'},
    {label: 'Contact', href: '/contact'},
  ];

  return (
    <footer className="border-t border-concrete-800 bg-concrete-950 py-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <Image
                src="/images/LogoGH.webp"
                alt="GH Bâtiment"
                width={45}
                height={45}
              />
            </Link>
            <p className="mb-4 max-w-sm text-sm text-concrete-400">
              Entreprise générale du bâtiment spécialisée dans la rénovation et la construction. Tous corps de métier.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-medium text-white">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-concrete-400 transition-colors hover:text-copper">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/mention-legale"
                  className="text-sm text-concrete-400 transition-colors hover:text-copper">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-medium text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-concrete-400">
              <li>
                <a href="mailto:contact.ghbat@gmail.com" className="transition-colors hover:text-copper">
                  contact.ghbat@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:0980336060" className="transition-colors hover:text-copper">
                  09 80 33 60 60
                </a>
              </li>
              <li>4 rue Charles Legros, 91320 Wissous</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-concrete-800 pt-6 md:flex-row">
          <p className="text-sm text-concrete-500">
            © {currentYear} GH Bâtiment SASU. Tous droits réservés.
          </p>
          <p className="text-sm text-concrete-500 opacity-50">Forgemaged by PALATUN</p>
        </div>
      </div>
    </footer>
  );
}
