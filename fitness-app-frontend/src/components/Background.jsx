const Background = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      {children}
    </div>
  );
};

export default Background;
