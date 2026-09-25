// app/components/MainFooter.js

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { name: "Home", href: "/" },
  // { name: "About Us", href: "/about" },
  { name: "About Us", href: "/" },
  // { name: "Academics", href: "/academics" },
  { name: "Academics", href: "/" },
  // { name: "Admissions", href: "/admissions" },
  { name: "Admissions", href: "/" },
  // { name: "Services", href: "/services" },
  { name: "Services", href: "/" },
  // { name: "Contact", href: "/contact" },
  { name: "Contact", href: "/" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/policy" },
  { name: "Terms of Use", href: "/terms" },
];

export default function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4a0000] border-t-4 border-[#D4AF37] text-white pt-14 pb-5 shadow-2xl mt-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================================
            TOP SECTION
        ====================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-10">

          {/* =====================================================
              BRANDING
          ====================================================== */}
          <div className="sm:col-span-2 lg:col-span-1">

            <Link
              href="/"
              className="flex items-center gap-3 mb-5"
            >

              {/* LOGO */}
              <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded-xl p-1 border border-[#D4AF37]">
                <Image
                  src="/images/model-school-bg.png"
                  alt="Government Model Senior Secondary School Logo"
                  fill
                  className="object-contain rounded-lg"
                  sizes="56px"
                />
              </div>

              {/* NAME */}
              <div>
                <span className="block text-lg font-extrabold leading-tight">
                  Government Model
                </span>

                <span className="block text-[#D4AF37] text-xs font-semibold tracking-[0.15em] uppercase mt-1">
                  Senior Secondary School
                </span>
              </div>

            </Link>

            <p className="text-amber-100/80 text-sm leading-relaxed">
              Providing quality education, academic excellence,
              character development, and leadership opportunities
              for students in Sierra Leone.
            </p>

            {/* Motto */}
            <div className="mt-5 border-l-4 border-[#D4AF37] pl-4">
              <p className="text-[#D4AF37] font-bold text-sm">
                Integrity + Excellence = Leadership
              </p>
            </div>

          </div>


          {/* =====================================================
              QUICK LINKS
          ====================================================== */}
          <div>

            <h3 className="text-lg font-bold mb-5 text-[#D4AF37]">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {quickLinks.map((link) => (
                <li key={link.name}>

                  <Link
                    href={link.href}
                    className="
                      text-amber-100/80
                      hover:text-[#D4AF37]
                      hover:translate-x-1
                      inline-block
                      transition
                      duration-200
                    "
                  >
                    {link.name}
                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* =====================================================
              CONTACT INFORMATION
          ====================================================== */}
          <div>

            <h3 className="text-lg font-bold mb-5 text-[#D4AF37]">
              Contact Us
            </h3>

            <address className="not-italic text-amber-100/80 space-y-4 text-sm">

              <p className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-lg">
                  📍
                </span>

                <span>
                  Freetown, Sierra Leone
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-lg">
                  📞
                </span>

                <span>
                  (+232) 76 XXX XXX
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-lg">
                  ✉
                </span>

                <span>
                  info@govmodelschool.edu.sl
                </span>
              </p>

            </address>

          </div>


          {/* =====================================================
              SOCIAL MEDIA
          ====================================================== */}
          <div>

            <h3 className="text-lg font-bold mb-5 text-[#D4AF37]">
              Follow Us
            </h3>

            <p className="text-amber-100/80 text-sm mb-5">
              Stay connected with Government Model Senior Secondary School
              for school news, events, and announcements.
            </p>

            <div className="flex gap-3">

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-lg
                  hover:bg-[#D4AF37]
                  hover:text-[#4a0000]
                  transition
                  duration-300
                "
              >
                f
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-lg
                  font-bold
                  hover:bg-[#D4AF37]
                  hover:text-[#4a0000]
                  transition
                  duration-300
                "
              >
                𝕏
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-lg
                  hover:bg-[#D4AF37]
                  hover:text-[#4a0000]
                  transition
                  duration-300
                "
              >
                ◎
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM SECTION
        ====================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-5 text-sm">

          <p className="text-amber-200/60 text-center md:text-left">
            © {currentYear} Government Model Senior Secondary School.
            All rights reserved.
          </p>


          <ul className="flex items-center gap-5 text-amber-200/60">

            {legalLinks.map((link) => (
              <li key={link.name}>

                <Link
                  href={link.href}
                  className="
                    hover:text-[#D4AF37]
                    transition
                    duration-200
                  "
                >
                  {link.name}
                </Link>

              </li>
            ))}

          </ul>

        </div>

      </div>

    </footer>
  );
}