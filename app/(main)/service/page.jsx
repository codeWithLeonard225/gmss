// app/services/page.js

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "School Services | Government Model Senior Secondary School",
  description:
    "Explore the academic programs, student support, modern learning facilities, technology, extracurricular activities, and educational services offered by Government Model Senior Secondary School.",
};

const serviceCategories = [
  {
    name: "Academic Programs",
    description:
      "Quality academic programs designed to build strong foundations, encourage critical thinking, and prepare students for national examinations and future careers.",
    icon: "📚",
    details: [
      "Senior Secondary School: Focused academic preparation for the WASSCE and higher education.",
      "Arts, Commerce & Science Streams: Comprehensive curricula tailored to diverse career pathways.",
      "Digital Literacy: Development of practical computer, research, and modern technology skills.",
      "Academic Mentorship: Guidance and support to help every student achieve excellence.",
    ],
    image: "/images/service-academics.jpg",
  },
  {
    name: "Student Support & Character Development",
    description:
      "We nurture the whole student by combining academic guidance, personal discipline, integrity, responsibility, and positive character formation.",
    icon: "🌟",
    details: [
      "Guidance & Counseling: Academic, personal, and career counseling for students.",
      "Character Development: Instilling integrity, respect, civic responsibility, and discipline.",
      "Leadership Opportunities: Prefectships and student council roles to foster leadership skills.",
      "Student Welfare: A safe, inclusive, and supportive environment for student well-being.",
    ],
    image: "/images/service-support.jpg",
  },
  {
    name: "Modern Learning Facilities",
    description:
      "Learning spaces and educational resources designed to provide practical, engaging, and effective learning experiences.",
    icon: "💻",
    details: [
      "Computer Laboratories: Hands-on ICT training and digital education opportunities.",
      "Science Laboratories: Well-equipped labs supporting chemistry, physics, and biology practicals.",
      "Library & Resource Center: Textbooks, reference materials, and quiet study spaces.",
      "Sports & Physical Education: Grounds for sports, physical fitness, teamwork, and recreation.",
    ],
    image: "/images/service-facilities.jpg",
  },
  {
    name: "Technology & Digital Learning",
    description:
      "Integrating technology into education to equip students with critical digital skills needed in today’s modern world.",
    icon: "🖥️",
    details: [
      "Computer Education: Practical training in essential computer software and internet usage.",
      "Digital Research: Teaching responsible online research techniques for school assignments.",
      "E-Learning Integration: Access to educational software and modern learning tools.",
      "Cyber Safety & Ethics: Guiding students on responsible and safe internet practices.",
    ],
    image: "/images/service-technology.jpg",
  },
  {
    name: "Extracurricular Activities",
    description:
      "Encouraging participation in clubs and sports to cultivate teamwork, talent, confidence, public speaking, and leadership outside the classroom.",
    icon: "🏆",
    details: [
      "Inter-House & School Athletics: Football, athletics, and sports events promoting fitness and school spirit.",
      "Debating & Literary Societies: Building confidence, public speaking, and analytical thinking.",
      "Science & Innovation Clubs: Fostering creativity, problem-solving, and STEM enthusiasm.",
      "Cultural & Social Clubs: Opportunities to explore arts, music, and community service.",
    ],
    image: "/images/service-extracurricular.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative bg-[#4a0000] py-20 md:py-24 px-6 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <p className="text-[#D4AF37] uppercase tracking-[0.25em] font-bold text-sm mb-5">
            What We Offer
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            School Services &{" "}
            <span className="text-[#D4AF37]">Programs</span>
          </h1>

          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-7"></div>

          <p className="text-lg md:text-xl text-amber-100/90 max-w-3xl mx-auto leading-relaxed">
            Government Model Senior Secondary School provides a disciplined learning
            environment focused on academic excellence, character development,
            technology, leadership, and holistic growth for every student.
          </p>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#4a0000] uppercase tracking-widest font-bold text-sm mb-3">
            Our Commitment
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#4a0000] mb-5">
            Supporting Students Inside and Outside the Classroom
          </h2>

          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Our programs and services are designed to equip students with the
            knowledge, practical skills, discipline, and moral foundation required
            to excel in national examinations and become useful members of society.
          </p>
        </div>
      </section>

      {/* =====================================================
          SERVICE CATEGORIES
      ====================================================== */}
      <section className="py-10 md:py-16 px-6 bg-amber-50/40">
        <div className="max-w-7xl mx-auto space-y-20">

          {serviceCategories.map((service, index) => (
            <div
              key={service.name}
              className="bg-white rounded-3xl shadow-lg border border-amber-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* IMAGE */}
                <div
                  className={`relative h-80 lg:h-[500px] ${
                    index % 2 !== 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={`${service.name} at Government Model Senior Secondary School`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a0000]/70 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6">
                    <div className="bg-[#D4AF37] text-[#4a0000] w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20">
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className={`p-8 md:p-10 lg:p-12 flex flex-col justify-center ${
                    index % 2 !== 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <p className="text-[#4a0000] uppercase tracking-widest font-bold text-xs mb-3">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold text-[#4a0000] mb-5">
                    {service.name}
                  </h2>

                  <div className="w-14 h-1 bg-[#D4AF37] mb-6"></div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-7">
                    {service.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-4">
                    {service.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#D4AF37] text-[#4a0000] flex items-center justify-center font-bold text-sm mt-0.5 shadow-sm">
                          ✓
                        </span>

                        <span className="leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-[#4a0000] hover:bg-[#330000] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      Learn More
                      <span>→</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          CORE VALUES STRIP
      ====================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">
            <p className="text-[#4a0000] uppercase tracking-widest font-bold text-sm mb-3">
              Our Foundation
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#4a0000]">
              Everything We Do Is Built Around
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">

            {/* Discipline & Character */}
            <div className="bg-[#4a0000] text-white rounded-2xl p-8 text-center shadow-lg border-t-4 border-[#D4AF37]">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#D4AF37] text-[#4a0000] flex items-center justify-center text-2xl font-bold">
                D
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Discipline
              </h3>

              <p className="text-amber-100/80 leading-relaxed">
                Encouraging personal responsibility, self-control, respect, and strong moral character in all aspects of life.
              </p>
            </div>

            {/* Excellence */}
            <div className="bg-white border-t-4 border-[#D4AF37] rounded-2xl p-8 text-center shadow-lg border-x border-b border-gray-100">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#4a0000] text-[#D4AF37] flex items-center justify-center text-2xl font-bold">
                E
              </div>

              <h3 className="text-2xl font-bold text-[#4a0000] mb-3">
                Excellence
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Inspiring students to pursue higher standards in academic performance, personal development, and external examinations.
              </p>
            </div>

            {/* Service & Utility */}
            <div className="bg-[#4a0000] text-white rounded-2xl p-8 text-center shadow-lg border-t-4 border-[#D4AF37]">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#D4AF37] text-[#4a0000] flex items-center justify-center text-2xl font-bold">
                S
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Service
              </h3>

              <p className="text-amber-100/80 leading-relaxed">
                Preparing students to apply their knowledge effectively and become productive, valuable contributors to society.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MOTTO
      ====================================================== */}
      <section className="py-16 bg-[#D4AF37] text-[#4a0000] text-center shadow-inner">
        <div className="max-w-4xl mx-auto px-6">

          <p className="uppercase tracking-[0.3em] font-bold text-sm mb-3">
            Our Motto
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold italic">
            Disce Prodesse
          </h2>

          <p className="text-xl font-bold uppercase tracking-widest mt-2 text-[#330000]">
            (Learn to Be Useful)
          </p>

          <p className="mt-5 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            We believe that true education endows students with knowledge, practical capability,
            and leadership so they may serve and enrich their communities.
          </p>

        </div>
      </section>

      {/* =====================================================
          ADMISSIONS CTA
      ====================================================== */}
      <section className="bg-[#4a0000] py-20">
        <div className="max-w-4xl mx-auto text-center px-6">

          <p className="text-[#D4AF37] uppercase tracking-widest font-bold text-sm mb-4">
            Join Our School Community
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
            Ready to Begin Your Educational Journey?
          </h2>

          <p className="text-amber-100/90 text-lg max-w-2xl mx-auto mb-9 leading-relaxed">
            Discover an academic environment where students are challenged to learn,
            grow, develop strong character, and prepare for leadership and service.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/admissions"
              className="inline-flex justify-center items-center bg-[#D4AF37] hover:bg-[#b5932a] text-[#4a0000] px-8 py-3.5 font-bold rounded-lg shadow-lg transition duration-300"
            >
              Start Your Application →
            </Link>

            <Link
              href="/contact"
              className="inline-flex justify-center items-center border-2 border-white hover:bg-white hover:text-[#4a0000] text-white px-8 py-3.5 font-bold rounded-lg transition duration-300"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}