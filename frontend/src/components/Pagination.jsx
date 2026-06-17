export default function Pagination({ meta, onPageChange }) {
    if (!meta || meta.totalPages <= 1) return null
  
    return (
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing page {meta.currentPage} of {meta.totalPages} ({meta.total} total students)
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(meta.currentPage - 1)}
            disabled={meta.currentPage === 1}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Previous
          </button>
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm rounded-lg border ${
                page === meta.currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(meta.currentPage + 1)}
            disabled={meta.currentPage === meta.totalPages}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    )
  }