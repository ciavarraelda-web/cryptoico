import { motion } from "framer-motion"

export default function ModalICO({ formData, handleInputChange, handleSubmit, close }) {
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
        <h2 className="text-xl font-bold mb-4">Submit New ICO - $299</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">ICO Name *</label>
            <input
              type="text"
              id="name"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="website" className="block text-gray-700 mb-2">Website URL *</label>
            <input
              type="url"
              id="website"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Contact Email *</label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">Description *</label>
            <textarea
              id="description"
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

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
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Pay with Crypto
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
