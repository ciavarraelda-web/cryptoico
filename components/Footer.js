import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* LOGO + DESCRIZIONE */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <img
                src="/logo.png"   // assicurati che il file sia in /public/logo.png
                alt="CryptoICO Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400">
              Your source for cryptocurrency news, prices and ICO listings.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/icos" className="text-gray-400 hover:text-white">
                  ICO Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT + SOCIAL */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">info@cryptoico.com</p>
            <div className="flex space-x-4 mt-4">
              {/* X / Twitter */}
              <a
                href="https://x.com/cryptoicoeu?t=QLSes449BhcuzURqejZF3w&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">X (Twitter)</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2H21.6l-7.401 8.465L22.5 22h-6.825l-5.355-7.09L4.41 22H1.053l7.88-9.01L1 2h6.98l4.77 6.354L18.244 2zM17.06 20h1.885L8.054 4H6.05L17.06 20z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/d500Epoca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Telegram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.036 20.715c-.391 0-.323-.147-.456-.51l-1.14-3.757 8.817-5.223.104-.06c.197-.114.347-.266.03-.422l-11.42-4.41c-.328-.127-.405-.313-.089-.466l16.19-7.25c.278-.125.523-.004.45.376l-2.75 12.973c-.056.252-.2.314-.412.19L9.58 11.74c-.28-.177-.537-.082-.623.3l-1.21 5.516c-.065.293-.2.39-.422.16l-2.543-2.4c-.206-.194-.164-.35.098-.43l11.28-3.678" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CryptoICO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
