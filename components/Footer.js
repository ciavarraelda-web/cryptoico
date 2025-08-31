export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} CryptoICO. All rights reserved.</p>
        <p>
          <a href="#" className="text-green-500 hover:underline">Privacy Policy</a> | 
          <a href="#" className="text-green-500 hover:underline ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  )
}
