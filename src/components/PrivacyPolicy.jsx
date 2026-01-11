
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
    return (
        <section className="py-32 min-h-screen bg-dark-950">
            <div className="max-w-4xl mx-auto px-6">
                <a href="#home" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </a>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 md:p-12 text-slate-300"
                >
                    <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

                    <div className="space-y-6">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-xl font-bold text-white mt-8">1. Introduction</h2>
                        <p>
                            Welcome to <strong>Tim Superville's Portfolio</strong> ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8">2. Data We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, or similar identifier provided via the contact form.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone number provided via the contact form.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, pages viewed, and time spent.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-white mt-8">3. How We Use Your Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>To communicate with you regarding your inquiries.</li>
                            <li>To improve our website and user experience.</li>
                            <li>To comply with a legal or regulatory obligation.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-white mt-8">4. Cookies</h2>
                        <p>
                            We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse all or some browser cookies.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8">5. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>hello@tsuperville.com</strong>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
