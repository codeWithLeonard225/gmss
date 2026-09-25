// app/(main)/page.js

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Government Model Senior Secondary School | Integrity, Excellence & Service",
  description:
    "Government Model Senior Secondary School provides quality education, academic excellence, discipline, technology, and leadership development for students in Sierra Leone.",
};

export default function HomePage() {
  return (
    <div className="homepage-content bg-white">

      {/* =====================================================
          1. HERO SECTION
      ====================================================== */}
      <section className="relative min-h-[85vh] flex items-center text-white overflow-hidden bg-[#4a0000]">

        {/* Background Image */}
        <Image
          src="/images/model-school-bg.png"
          alt="Government Model Senior Secondary School"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark Maroon Overlays */}
        <div className="absolute inset-0 bg-[#800000]/85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a0000] via-[#800000]/90 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 py-20">
          <div className="max-w-6xl mx-auto">

            <div className="max-w-3xl">

              {/* Logo / Crest */}
              <div className="mb-8">
                <Image
                  src="/icons/model-school-logo.png"
                  alt="Government Model Senior Secondary School Logo"
                  width={120}
                  height={120}
                  className="rounded-full bg-white p-2 shadow-2xl border-2 border-[#D4AF37]"
                />
              </div>

              {/* Small Heading */}
              <p className="uppercase tracking-[0.3em] text-[#F3E5AB] font-bold text-sm mb-4">
                Government Model Senior Secondary School
              </p>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                Excellence.
                <br />
                Discipline.
                <br />
                <span className="text-[#F3E5AB]">
                  Service.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-amber-50 leading-relaxed max-w-2xl mb-8">
                Empowering students through academic rigor, strong character, 
                modern technology, and leadership skills needed for university and beyond.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">

                <Link
                  href="/admissions"
                  className="inline-flex justify-center items-center bg-[#D4AF37] hover:bg-[#c59b27] text-[#4a0000] font-bold px-8 py-4 rounded-lg shadow-xl transition duration-300"
                >
                  Apply for Admission
                </Link>

                <Link
                  href="/about"
                  className="inline-flex justify-center items-center border-2 border-white hover:bg-white hover:text-[#800000] text-white font-semibold px-8 py-4 rounded-lg transition duration-300"
                >
                  Discover Our School
                </Link>

              </div>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          SCHOOL VALUES STRIP
      ====================================================== */}
      <section className="bg-[#800000] text-white border-y-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">

          <div className="p-7 text-center border-b md:border-b-0 md:border-r border-[#D4AF37]/30">
            <h3 className="text-2xl font-bold text-[#F3E5AB]">
              Academic Excellence
            </h3>
            <p className="mt-2 text-sm text-gray-100">
              Promoting rigorous study in Sciences, Arts, and Commercial streams.
            </p>
          </div>

          <div className="p-7 text-center border-b md:border-b-0 md:border-r border-[#D4AF37]/30">
            <h3 className="text-2xl font-bold text-[#F3E5AB]">
              Discipline & Integrity
            </h3>
            <p className="mt-2 text-sm text-gray-100">
              Building honesty, responsibility, mutual respect, and high moral standards.
            </p>
          </div>

          <div className="p-7 text-center">
            <h3 className="text-2xl font-bold text-[#F3E5AB]">
              Leadership & Service
            </h3>
            <p className="mt-2 text-sm text-gray-100">
              Preparing dedicated citizens equipped to serve Sierra Leone and the world.
            </p>
          </div>

        </div>
      </section>


      {/* =====================================================
          2. PRINCIPAL'S MESSAGE
      ====================================================== */}
      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Principal Image */}
          <div className="relative">

            <div className="absolute -top-5 -left-5 w-24 h-24 bg-[#FFF9C4] rounded-lg -z-0 border-2 border-[#D4AF37]"></div>

            <Image
              src="/images/principal.jpg"
              alt="Principal of Government Model Senior Secondary School"
              width={500}
              height={550}
              className="relative z-10 w-full max-w-md mx-auto h-[500px] object-cover rounded-2xl shadow-2xl"
            />

            <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-[#800000] rounded-lg -z-0"></div>

          </div>


          {/* Message */}
          <div>

            <p className="text-[#800000] font-bold uppercase tracking-widest text-sm mb-3">
              Welcome to Our School
            </p>

            <h2 className="text-4xl font-bold text-[#4a0000] mb-6">
              Message from the Principal
            </h2>

            <div className="w-20 h-1 bg-[#D4AF37] mb-7"></div>

            <p className="text-gray-700 leading-relaxed mb-5">
              Welcome to <strong>Government Model Senior Secondary School</strong>, a 
              premier secondary institution dedicated to academic achievement and 
              nurturing students who are disciplined, skilled, and prepared for higher education.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              At Government Model, education goes hand-in-hand with character development. 
              We focus on WASSCE success, analytical thinking, technology, leadership, 
              and the overall well-being of every student.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We welcome parents, guardians, and alumni to partner with us as we guide 
              our students toward a bright and impactful future.
            </p>

            <p className="mt-7 font-bold text-[#800000]">
              — The Principal
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          3. WHY GOVERNMENT MODEL
      ====================================================== */}
      <section className="py-20 bg-amber-50/50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <p className="text-[#800000] font-bold uppercase tracking-widest text-sm mb-3">
              What We Stand For
            </p>

            <h2 className="text-4xl font-bold text-[#4a0000]">
              Why Government Model Senior Secondary School?
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              We provide a supportive, disciplined learning environment where students 
              excel academically, discover their potential, and build lifelong values.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">

            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border-t-4 border-[#800000]">

              <div className="w-14 h-14 rounded-xl bg-[#800000] text-[#D4AF37] flex items-center justify-center text-2xl font-bold mb-6">
                01
              </div>

              <h3 className="text-xl font-bold text-[#4a0000] mb-3">
                WASSCE Excellence
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Structured academic programs across Sciences, Arts, and Commercial fields designed to guarantee top examination performance.
              </p>

            </div>


            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border-t-4 border-[#D4AF37]">

              <div className="w-14 h-14 rounded-xl bg-[#FFF9C4] text-[#800000] border border-[#D4AF37] flex items-center justify-center text-2xl font-bold mb-6">
                02
              </div>

              <h3 className="text-xl font-bold text-[#4a0000] mb-3">
                Character & Discipline
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Fostering respectful, responsible, and ethical young adults ready to make meaningful societal contributions.
              </p>

            </div>


            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border-t-4 border-[#800000]">

              <div className="w-14 h-14 rounded-xl bg-[#800000] text-[#D4AF37] flex items-center justify-center text-2xl font-bold mb-6">
                03
              </div>

              <h3 className="text-xl font-bold text-[#4a0000] mb-3">
                Digital Skills
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Providing modern ICT education and digital tools to succeed in today's technology-driven world.
              </p>

            </div>


            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border-t-4 border-[#D4AF37]">

              <div className="w-14 h-14 rounded-xl bg-[#FFF9C4] text-[#800000] border border-[#D4AF37] flex items-center justify-center text-2xl font-bold mb-6">
                04
              </div>

              <h3 className="text-xl font-bold text-[#4a0000] mb-3">
                Leadership & Clubs
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Empowering students through debates, sports, student council, and extracurricular leadership roles.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          4. SCHOOL NEWS
      ====================================================== */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">

            <div>
              <p className="text-[#800000] font-bold uppercase tracking-widest text-sm mb-3">
                Stay Updated
              </p>

              <h2 className="text-4xl font-bold text-[#4a0000]">
                School News & Announcements
              </h2>
            </div>

            <Link
              href="/news"
              className="mt-5 md:mt-0 text-[#800000] font-bold hover:text-[#4a0000] transition"
            >
              View All News →
            </Link>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* News 1 */}
            <div className="group border border-gray-200 rounded-2xl p-7 hover:shadow-xl transition duration-300">

              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#800000] text-white text-xs font-bold px-4 py-2 rounded-full">
                  ADMISSIONS
                </span>

                <span className="text-gray-500 text-sm">
                  2026/2027 Academic Year
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#4a0000] mb-3">
                SSS 1 Admissions Open
              </h3>

              <p className="text-gray-600 leading-relaxed mb-5">
                Applications and placement verifications are now ongoing for new students entering SSS 1.
              </p>

              <Link
                href="/admissions"
                className="font-bold text-[#800000] hover:text-[#4a0000]"
              >
                Learn More →
              </Link>

            </div>


            {/* News 2 */}
            <div className="group border border-gray-200 rounded-2xl p-7 hover:shadow-xl transition duration-300">

              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#FFF9C4] text-[#800000] border border-[#D4AF37] text-xs font-bold px-4 py-2 rounded-full">
                  ACADEMICS
                </span>

                <span className="text-gray-500 text-sm">
                  WASSCE Preparation
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#4a0000] mb-3">
                Mock Examinations & Revisions
              </h3>

              <p className="text-gray-600 leading-relaxed mb-5">
                Intensive revision schedules and mock assessments have been released for all SSS 3 candidates.
              </p>

              <Link
                href="/calendar"
                className="font-bold text-[#800000] hover:text-[#4a0000]"
              >
                View Schedule →
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          5. ACADEMIC EXCELLENCE SECTION
      ====================================================== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#800000] to-[#4a0000] text-white">

        {/* Decorative Circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D4AF37]/10"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">

          <p className="text-[#F3E5AB] uppercase tracking-[0.25em] font-bold text-sm mb-5">
            Preparing Students for the Future
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-7">
            Education That Builds
            <span className="text-[#F3E5AB]"> Tomorrow's Leaders</span>
          </h2>

          <p className="text-amber-50 text-lg leading-relaxed max-w-3xl mx-auto">
            Our secondary curriculum fosters critical thinking, scientific inquiry, 
            literary appreciation, commercial competence, and teamwork. We prepare students 
            for top national exam results and future career success.
          </p>

          <div className="mt-10">
            <Link
              href="/academics"
              className="inline-block bg-[#D4AF37] hover:bg-[#c59b27] text-[#4a0000] font-bold px-8 py-4 rounded-lg transition duration-300 shadow-lg"
            >
              Explore Our Academics
            </Link>
          </div>

        </div>
      </section>


      {/* =====================================================
          6. PUPIL & PARENT PORTAL
      ====================================================== */}
      <section className="py-20 bg-slate-100">

        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left */}
              <div className="bg-gradient-to-br from-[#800000] to-[#4a0000] p-10 md:p-14 text-white">

                <p className="text-[#F3E5AB] font-bold uppercase tracking-widest text-sm mb-4">
                  Digital School Portal
                </p>

                <h2 className="text-4xl font-bold mb-5">
                  Pupil & Parent Portal
                </h2>

                <p className="text-amber-50 leading-relaxed mb-8">
                  Access key school information online including WASSCE/continuous assessment 
                  results, attendance logs, timetables, fee statements, and official announcements.
                </p>

                <Link
                  href="/login"
                  className="inline-block bg-[#D4AF37] hover:bg-[#c59b27] text-[#4a0000] font-bold px-8 py-4 rounded-lg transition duration-300 shadow-md"
                >
                  Login to Portal
                </Link>

              </div>


              {/* Right */}
              <div className="p-10 md:p-14">

                <h3 className="text-2xl font-bold text-[#4a0000] mb-7">
                  Portal Services
                </h3>

                <div className="space-y-5">

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FFF9C4] border border-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-[#800000]">
                      ✓
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800">
                        Academic Results
                      </h4>
                      <p className="text-gray-500 text-sm">
                        View term assessments and WASSCE mock results.
                      </p>
                    </div>
                  </div>


                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FFF9C4] border border-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-[#800000]">
                      ✓
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800">
                        Attendance Records
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Monitor daily attendance and participation.
                      </p>
                    </div>
                  </div>


                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FFF9C4] border border-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-[#800000]">
                      ✓
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800">
                        School Announcements
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Receive official school circulars and exam schedules.
                      </p>
                    </div>
                  </div>


                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FFF9C4] border border-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-[#800000]">
                      ✓
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800">
                        Fees & Receipts
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Check fee structures and digital payment receipts.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          7. FINAL CALL TO ACTION
      ====================================================== */}
      <section className="py-16 bg-[#800000] text-white text-center border-t-4 border-[#D4AF37]">

        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#F3E5AB]">
            Excellence + Discipline = Leadership
          </h2>

          <p className="text-lg mb-8 max-w-2xl mx-auto text-amber-50">
            Join Government Model Senior Secondary School and give your child an 
            environment where knowledge, character, and leadership can flourish.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/admissions"
              className="bg-[#D4AF37] hover:bg-[#c59b27] text-[#4a0000] font-bold px-8 py-4 rounded-lg transition duration-300 shadow-md"
            >
              Start Admission
            </Link>

            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-[#800000] font-bold px-8 py-4 rounded-lg transition duration-300"
            >
              Contact School
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}