function ProgressBar({
  label,
  value,
  target,
  showValue = true,
}) {
  return (
    <div className="w-full">

      {/* Label */}
      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm font-medium text-white">
          {label}
        </span>

        {showValue && (
          <span className="text-sm text-slate-400">
            {value}%
          </span>
        )}

      </div>

      {/* Progress */}
      <div className="h-3 w-full rounded-full bg-slate-800">

        <div
          className="h-3 rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${Math.min(value, 100)}%`,
          }}
        />

      </div>

      {/* Optional target */}
      {target !== undefined && (
        <p className="mt-1 text-xs text-slate-500">
          Target: {target}%
        </p>
      )}

    </div>
  )
}

export default ProgressBar