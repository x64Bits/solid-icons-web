export default function ItemsSkeleton() {
  return Array(14)
    .fill("")
    .map(() => (
      <div className="mx-3 my-4 w-44 rounded-md h-6 animate-pulse bg-light-surface-bg dark:bg-dark-surface-bg" />
    ))
}
