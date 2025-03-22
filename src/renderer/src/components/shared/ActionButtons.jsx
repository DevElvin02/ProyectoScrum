import { Pencil, Trash2 } from 'lucide-react'

export function ActionButtons({ onEdit, onDelete }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 ml-2"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </td>
  )
}
