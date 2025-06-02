import React from 'react'

function Modal({isOpen, onClose, children}) {
    if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
        <div className='bg-zinc-700 p-6 rounded shadow-lg w-96 relative'>
            <button onClick={onClose} className='absolute top-2 right-2 text-gray-500 hover:text-black'>
                &times;
            </button>
            {children}
        </div>
    </div>
  )
}

export default Modal