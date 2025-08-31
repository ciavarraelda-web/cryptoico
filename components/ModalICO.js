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
          <input
            id="name"
            placeholder="ICO Name"
            required
            className="w-full p-2 border rounded mb-2"
            onChange={handleInputChange}
            value={formData.name}
          />
          <input
            id="website"
            placeholder="Website URL"
            required
            className="w-full p-2 border rounded mb-2"
            onChange={handleInputChange}
            value={formData.website}
          />
          <input
            id="email"
            placeholder="Contact Email"
            required
            className="w-full p-2 border rounded mb-2"
            onChange={handleInputChange}
            value={formData.email}
          />
          <textarea
            id="description"
            placeholder="Description"
            required
            className="w-full p-2 border rounded mb-4"
            onChange={handleInputChange}
            value={formData.description}
          ></textarea>
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
