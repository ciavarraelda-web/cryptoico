import { motion } from "framer-motion"

export default function ModalBanner({ formData, handleInputChange, handleImageChange, handleSubmit, close }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-lg w-full max-w-md p-6"
      >
        <h2 className="text-xl font-bold mb-4">Advertise Banner</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="title"
            placeholder="Banner Title"
            required
            className="w-full p-2 border rounded mb-2"
            onChange={handleInputChange}
            value={formData.title}
          />
          <input
            id="url"
            placeholder="Destination URL"
            required
            className="w-full p-2 border rounded mb-2"
            onChange={handleInputChange}
            value={formData.url}
          />
          <select
            id="duration"
            required
            className="w-full p-2 border rounded mb-2"
            onChange={handleInputChange}
            value={formData.duration}
          >
            <option value="7">7 Days - $99</option>
            <option value="14">14 Days - $179</option>
            <option value="30">30 Days - $299</option>
          </select>
          <input
            type="file"
            id="image"
            required
            className="w-full p-2 border rounded mb-4"
            onChange={handleImageChange}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Pay with Crypto
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
