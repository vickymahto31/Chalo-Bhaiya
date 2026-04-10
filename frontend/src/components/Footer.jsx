const Footer = () => (
  <footer className="bg-navy-900 border-t border-navy-800 mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-slate-400 text-sm font-medium">
          Vicky Mahto &copy; 2026 Chalo Bhaiya. Built for students, by students.
        </p>
        <div className="flex space-x-6 text-slate-500 text-xs">
          <a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-400 transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;