import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-20 border-t border-neutral-200 py-12 bg-neutral-100 text-neutral-700 text-base">
      <div className="w-full px-10 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Nestly</h2>
          <p className="max-w-sm">
            Your trusted platform for unique stays around the world.
          </p>
          <div className="flex items-center gap-4 mt-2 text-2xl text-neutral-600">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Center section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>

        {/* Right section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Support</h2>
          <a href="/help" className="hover:underline">
            Help Center
          </a>
          <a href="/faq" className="hover:underline">
            FAQ
          </a>
          <a href="/cancellation" className="hover:underline">
            Cancellation Options
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-neutral-300 pt-6 px-10 md:px-20 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Nestly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
