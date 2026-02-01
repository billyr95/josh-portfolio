'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-light mb-2 text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors bg-white shadow-sm"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-light mb-2 text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors bg-white shadow-sm"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-light mb-2 text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors resize-none bg-white shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-black text-white py-3 font-light tracking-wide hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-600 font-light"
        >
          Message sent successfully! Josh will get back to you soon.
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-red-600 font-light"
        >
          Something went wrong. Please try again or email directly at joshgutie01@gmail.com
        </motion.div>
      )}
    </motion.form>
  )
}
