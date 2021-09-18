export default function IconsSkeleton(props) {
  return Array(props.count)
    .fill("")
    .map(() => (
      <div className="flex animate-pulse icon-container flex-col items-center justify-center h-32 w-36 mx-2 my-2 rounded-lg bg-gray-100 dark:bg-dark-card-bg" />
    ))
}
