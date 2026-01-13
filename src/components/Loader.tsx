const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-green-600 font-medium text-sm">Loading...</p>
    </div>
  )
}

export { Loader }