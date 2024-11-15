import React from 'react'

const footer = () => {
  return (
    <>
      <div className="pt-6 pb-2 px-4 flex justify-around items-center border-t border-gray-900 bg-gradient-to-b text-white">
        <div className="flex items-center gap-2">
          Copyright © 2024 |<span className="font-semibold">AutoFill Me</span>
        </div>
        <div className="flex items-center gap-4">
          Developed By | Team Aakash
        </div>

      </div>
    </>
  )
}

export default footer