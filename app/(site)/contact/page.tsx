import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-light text-center mb-4 animate-fade-in">
          Get In Touch
        </h1>
        <p className="text-center text-gray-600 mb-12 animate-fade-in">
          Have a project in mind? Let's talk about it.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}
