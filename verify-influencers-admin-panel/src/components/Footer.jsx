function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-10 text-center">
        <p>© {new Date().getFullYear()} Health Claim Verifier. All rights reserved.</p>
        <p className="text-sm">
          {/* <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms of Use</a> */}
        </p>
      </footer>
    );
  }
  
  export default Footer;
  