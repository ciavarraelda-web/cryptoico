import ModalBanner from "../components/ModalBanner"
import { useState } from "react"

export default function Home() {
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [bannerFormData, setBannerFormData] = useState({ title: "", url: "", image: null, duration: "7" })

  const handleBannerInputChange = (e) => {
    const { id, value } = e.target
    setBannerFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (e) => {
    setBannerFormData(prev => ({ ...prev, image: e.target.files[0] }))
  }

  const handleBannerSubmit = async (e) => {
    e.preventDefault()
    // Qui chiami la tua API /api/coinbase
  }

  return (
    <div>
      <button onClick={() => setShowBannerModal(true)}>Open Banner Modal</button>

      {showBannerModal && (
        <ModalBanner
          formData={bannerFormData}
          handleInputChange={handleBannerInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleBannerSubmit}
          close={() => setShowBannerModal(false)}
        />
      )}
    </div>
  )
}
