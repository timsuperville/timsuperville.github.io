export default function Skeleton({ className = "" }) {
    return (
        <div
            className={`bg-white/5 animate-pulse rounded-lg ${className}`}
            role="status"
            aria-label="Loading..."
        >
            <span className="sr-only">Loading...</span>
        </div>
    )
}
