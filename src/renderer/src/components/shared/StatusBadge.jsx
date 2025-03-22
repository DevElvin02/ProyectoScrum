// Crear nuevo archivo: components/shared/StatusBadge.jsx
export function StatusBadge({ status, variant, className = '' }) {
  const getStatusColor = (variant) => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'destructive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }
  }

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(variant)} ${className}`}>
      {status}
    </span>
  )
}
