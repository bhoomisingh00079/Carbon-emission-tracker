function PageContainer({ children }) {
  return (
    <div className="w-full px-6 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
