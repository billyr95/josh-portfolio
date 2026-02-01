import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-medium text-center mb-4">
          Get In Touch
        </h1>
        <p className="text-center text-gray-600 mb-12 font-light">
          Have a project in mind? Let's talk about it.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}
