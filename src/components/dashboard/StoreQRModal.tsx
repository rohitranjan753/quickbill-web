import { useRef } from 'react'
import QRCode from 'react-qr-code'
import { Download, Store } from 'lucide-react'
import { Modal } from '../ui/Modal'
import type { Store as StoreType } from '../../api/stores.api'

interface StoreQRModalProps {
  isOpen: boolean
  onClose: () => void
  store: StoreType
}

export function StoreQRModal({ isOpen, onClose, store }: StoreQRModalProps) {
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${store.name.replace(/\s+/g, '_')}_QR.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Store QR Code" size="sm">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-2 self-start">
          <Store size={15} className="text-outline" />
          <div>
            <div className="text-sm font-semibold text-on-surface">{store.name}</div>
            <div className="text-xs text-outline">{store.city}, {store.state}</div>
          </div>
        </div>

        <div
          ref={qrRef}
          className="p-4 bg-white rounded-xl border border-outline-variant shadow-sm"
        >
          <QRCode
            value={store.id}
            size={200}
            fgColor="#006948"
            bgColor="#ffffff"
            level="M"
          />
        </div>

        <p className="text-xs text-on-surface-variant text-center leading-relaxed">
          Customers scan this code in the QuickBill app to select your store and start shopping.
        </p>

        <div className="w-full pt-1 border-t border-outline-variant">
          <div className="text-xs text-outline mb-3">Store ID</div>
          <div className="font-mono text-xs text-on-surface bg-surface-low px-3 py-2 rounded-card break-all select-all">
            {store.id}
          </div>
        </div>

        <button onClick={handleDownload} className="btn-primary w-full justify-center">
          <Download size={15} />
          Download QR Code
        </button>
      </div>
    </Modal>
  )
}
