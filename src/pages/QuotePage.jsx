import { useState } from 'react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your request! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold drop-shadow-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request a Quote</h1>
          <p className="text-white/80 text-lg drop-shadow">Tell us about your project</p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Project Type *</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="" className="bg-gray-800">Select a type</option>
                    <option value="furniture" className="bg-gray-800">Furniture</option>
                    <option value="decor" className="bg-gray-800">Home Decor</option>
                    <option value="outdoor" className="bg-gray-800">Outdoor</option>
                    <option value="custom" className="bg-gray-800">Custom Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Project Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Describe your project, including dimensions, materials, and any specific requirements..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="" className="bg-gray-800">Select a range</option>
                    <option value="under500" className="bg-gray-800">Under $500</option>
                    <option value="500-1000" className="bg-gray-800">$500 - $1,000</option>
                    <option value="1000-2500" className="bg-gray-800">$1,000 - $2,500</option>
                    <option value="2500-5000" className="bg-gray-800">$2,500 - $5,000</option>
                    <option value="over5000" className="bg-gray-800">Over $5,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="" className="bg-gray-800">Select timeline</option>
                    <option value="flexible" className="bg-gray-800">Flexible</option>
                    <option value="1-2months" className="bg-gray-800">1-2 months</option>
                    <option value="3-6months" className="bg-gray-800">3-6 months</option>
                    <option value="6months+" className="bg-gray-800">6+ months</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
