export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold drop-shadow-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>About</h1>
          <p className="text-white/80 text-lg drop-shadow">The story behind Arnold Woodworking</p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Our Craft</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              Arnold Woodworking is dedicated to creating beautiful, handcrafted pieces that stand the test of time.
              Each project is approached with meticulous attention to detail and a deep respect for the natural
              beauty of wood.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Our Philosophy</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              We believe that furniture should be more than functional—it should tell a story. From selecting
              the perfect piece of lumber to applying the final finish, every step in our process is guided by
              a commitment to quality and craftsmanship.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
            <p className="text-white/80 leading-relaxed">
              With years of experience in woodworking, we specialize in custom furniture, home decor, and
              outdoor projects. Whether you're looking for a statement dining table, a unique gift, or
              functional outdoor furniture, we bring your vision to life with skill and passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
