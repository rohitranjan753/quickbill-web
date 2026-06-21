import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import { Modal } from '../ui/Modal'
import { productsApi, type BulkUploadResult } from '../../api/products.api'
import { Upload, FileText, Download, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const REQUIRED_COLS = ['barcode', 'name', 'price']
const ALL_COLS = ['barcode', 'name', 'price', 'category_name', 'sku', 'description', 'mrp', 'tax_rate', 'hsn_code', 'unit', 'initial_stock', 'low_stock_threshold']

const SAMPLE_DATA = [
  '8901234567890,Aashirvaad Atta 5kg,249.00,Atta & Flour,ATA-001,Premium whole wheat atta,299.00,5,,kg,100,20',
  '8901725133400,Amul Butter 500g,290.00,Dairy,AMB-001,Amul pasteurised butter,310.00,12,,piece,50,10',
]

function generateTemplate() {
  return [ALL_COLS.join(','), ...SAMPLE_DATA].join('\n')
}

function downloadTemplate() {
  const csv = generateTemplate()
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'quickbill_products_template.csv'
  a.click()
  URL.revokeObjectURL(url)
}

interface CSVUploadModalProps {
  isOpen: boolean
  onClose: () => void
  storeId: string
  onSuccess: () => void
}

export function CSVUploadModal({ isOpen, onClose, storeId, onSuccess }: CSVUploadModalProps) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BulkUploadResult | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateHeaders = (csvText: string): string | null => {
    const firstLine = csvText.split('\n')[0]
    const headers = firstLine.split(',').map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'))
    const missing = REQUIRED_COLS.filter((col) => !headers.includes(col))
    if (missing.length > 0) return `Missing required columns: ${missing.join(', ')}`
    return null
  }

  const processFile = (f: File) => {
    setFile(f)
    setResult(null)
    setValidationError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const err = validateHeaders(text)
      if (err) setValidationError(err)
    }
    reader.readAsText(f)
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f?.name.endsWith('.csv')) processFile(f)
    else toast.error('Please upload a CSV file')
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  const handleUpload = async () => {
    if (!file || validationError) return
    setLoading(true)
    try {
      const text = await file.text()
      const res = await productsApi.bulkUpload(storeId, text)
      setResult(res.data.data)
      if (res.data.data.success_count > 0) {
        onSuccess()
        toast.success(`${res.data.data.success_count} products uploaded!`)
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Upload failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setFile(null)
    setResult(null)
    setValidationError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <Modal isOpen={isOpen} onClose={() => { reset(); onClose() }} title="Bulk Upload Products" size="lg">
      <div className="flex flex-col gap-5">
        {/* Template download */}
        <div className="bg-surface-low rounded-card p-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-on-surface">Download Template</div>
            <div className="text-xs text-on-surface-variant mt-0.5">Required columns: {REQUIRED_COLS.join(', ')}</div>
          </div>
          <button onClick={downloadTemplate} className="btn-ghost text-xs py-1.5 px-3">
            <Download size={14} />
            Template
          </button>
        </div>

        {/* Drop zone */}
        {!result && (
          <div
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
              dragging ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50 hover:bg-surface-low'
            }`}
          >
            <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={onFileChange} />
            {file ? (
              <>
                <FileText size={32} className="text-primary" />
                <div className="text-center">
                  <div className="text-sm font-medium text-on-surface">{file.name}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              </>
            ) : (
              <>
                <Upload size={32} className="text-outline" />
                <div className="text-center">
                  <div className="text-sm font-medium text-on-surface">Drop your CSV here</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">or click to browse</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Validation error */}
        {validationError && (
          <div className="flex items-start gap-2 bg-error/5 border border-error/20 rounded-card p-3">
            <AlertCircle size={16} className="text-error flex-shrink-0 mt-0.5" />
            <span className="text-sm text-error">{validationError}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="card p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-primary" />
              <span className="font-semibold text-on-surface">Upload Complete</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-card p-3 text-center">
                <div className="text-2xl font-bold text-green-700 font-numbers">{result.success_count}</div>
                <div className="text-xs text-green-600 mt-0.5">Products added</div>
              </div>
              <div className={`${result.error_count > 0 ? 'bg-red-50 border-red-200' : 'bg-surface-low border-outline-variant'} border rounded-card p-3 text-center`}>
                <div className={`text-2xl font-bold font-numbers ${result.error_count > 0 ? 'text-red-700' : 'text-on-surface-variant'}`}>{result.error_count}</div>
                <div className={`text-xs mt-0.5 ${result.error_count > 0 ? 'text-red-600' : 'text-on-surface-variant'}`}>Errors</div>
              </div>
            </div>
            {result.error_details && result.error_details.length > 0 && (
              <div className="max-h-32 overflow-y-auto scrollbar-hide">
                {result.error_details.slice(0, 10).map((e) => (
                  <div key={e.row} className="text-xs text-error py-1 border-b border-outline-variant last:border-0">
                    Row {e.row}: {e.errors.join(', ')}
                  </div>
                ))}
              </div>
            )}
            <button onClick={reset} className="btn-secondary justify-center text-sm">Upload Another File</button>
          </div>
        )}

        {/* Actions */}
        {!result && (
          <div className="flex gap-3">
            <button onClick={() => { reset(); onClose() }} className="flex-1 btn-secondary justify-center">Cancel</button>
            <button
              onClick={handleUpload}
              disabled={!file || !!validationError || loading}
              className="flex-1 btn-primary justify-center disabled:opacity-60"
            >
              {loading ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : null}
              {loading ? 'Uploading...' : 'Upload Products'}
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
