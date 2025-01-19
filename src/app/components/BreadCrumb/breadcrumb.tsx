const Breadcrumb: React.FC = () => {
  return (
    <div className="bg-black py-8">
      <div className="container mx-auto px-6">
        <div className="bg-dark-300/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-400/10 hover:shadow-primary-500/20 transition-all duration-300">
          <nav className="flex items-center space-x-3 text-base text-gray-400">
            <a 
              href="#" 
              className="text-primary-400 hover:text-primary-500 transition-colors"
            >
              Home
            </a>
            <span className="text-gray-600">&gt;</span>
            <span className="hover:text-primary-400 transition-colors cursor-pointer">
              Courses
            </span>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent">
                All
              </span>{" "}
              Courses
            </h1>
            <p className="text-gray-300 text-lg group cursor-pointer">
              Master the World&apos;s Most{" "}
              <span className="text-primary-400 group-hover:text-accent-400 transition-colors">
                In-Demand Skills
              </span>{" "}
              and Grow Together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
  