export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold drop-shadow-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>About</h1>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4"></h2>
            <p className="text-white/80 leading-relaxed mb-6">
              Arnold Woodworking is a hobby project operated by Connor Arnold. Connor is a professionally a Computer Engineer
              and an amateur woodworking on the side. All pieces displayed on the site are entirely designed and created by
              Connor.

            </p>

            <h2 className="text-2xl font-bold text-white mb-4">About the Site</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              This website was written almost entirely by Claude Code as a test run of it's capabilities.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Future Work</h2>
            <p className="text-white/80 leading-relaxed">
              As new projects come in and are made I'll be updating this site. At the time of writing this (2/2/2026) the submit
              a quote page is entirely decorative and I have no plans to take commissions through this site. If I ever have my
              own shop and have more time to take on commissions I'll make it functional. For the time being, you probably know/met
              me so reach out if you have a project you'd like me to take on and I'll probably say that I have a large backlog
              (Which is not a lie) but if the project is interesting enough (or you pay me enough) I may take it on.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
