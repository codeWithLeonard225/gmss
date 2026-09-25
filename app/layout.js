import "./globals.css";
// app/layout.js

export const metadata = {
  title:
    "Government Model Senior Secondary School – Quality Education & Excellence in Sierra Leone",

  description:
    "Government Model Senior Secondary School provides quality education, academic excellence, discipline, strong moral values, and modern learning opportunities for students in Freetown, Sierra Leone.",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      {
        url: "/icons/model-school-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/model-school-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/icons/model-school-192x192.png",
    apple: "/icons/model-school-512x512.png",
  },

  keywords: [
    "Government Model Senior Secondary School",
    "Government Model SSS",
    "Model School Freetown",
    "Model Secondary School Sierra Leone",
    "Schools in Sierra Leone",
    "Secondary Schools in Sierra Leone",
    "Senior Secondary School Freetown",
    "Quality Education Sierra Leone",
    "WASSCE School Sierra Leone",
    "BECE School Sierra Leone",
    "Education in Sierra Leone",
    "School Portal Sierra Leone",
    "Modern Education Sierra Leone",
  ],

  authors: [{ name: "Government Model Senior Secondary School" }],
  creator: "Government Model Senior Secondary School",
  publisher: "Government Model Senior Secondary School",

  // Replace this with the school's actual website domain
  metadataBase: new URL("https://www.govmodelschool.edu.sl"),

  applicationName: "Government Model SSS Portal",
  classification: "Educational Institution",

  robots: {
    index: true,
    follow: true,
  },

  referrer: "strict-origin-when-cross-origin",

  alternates: {
    canonical: "https://www.govmodelschool.edu.sl",
  },

  openGraph: {
    title:
      "Government Model Senior Secondary School – Excellence in Education",

    description:
      "Government Model Senior Secondary School is committed to quality education, academic excellence, discipline, moral values, and preparing students for a successful future.",

    url: "https://www.govmodelschool.edu.sl",

    siteName: "Government Model Senior Secondary School",

    type: "website",

    locale: "en_US",

    images: [
      {
        url: "/icons/model-school-logo.png",
        width: 1200,
        height: 630,
        alt: "Government Model Senior Secondary School Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Government Model Senior Secondary School – Sierra Leone",

    description:
      "Quality education, academic excellence, discipline, moral values, and modern learning at Government Model Senior Secondary School.",

    images: ["/icons/model-school-logo.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#800000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="manifest"
        href="/manifest.webmanifest"
      />

      <meta
        name="theme-color"
        content="#800000"
      />

      <meta
        name="color-scheme"
        content="light"
      />

      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}