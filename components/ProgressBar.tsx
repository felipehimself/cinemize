
const ProgressBar = () => {
  const state = 'w-6/12'
  return (
    <div className="h-[5px] bg-white w-full rounded-lg overflow-hidden">
      <div className={`h-[5px] bg-indigo-600 ${state} duration-1000 transition `}></div>
    </div>
  )
}
export default ProgressBar