import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function App() {
  const [gridCells, setGridCells] = useState([])
  const gridSize = { rows: 7, cols: 15 }
  const MAX_LIT_CELLS = 8 

  useEffect(() => {
    const totalCells = gridSize.rows * gridSize.cols
    const cells = Array.from({ length: totalCells }, (_, i) => ({ id: i, lit: false }))

    const litIndexes = new Set()
    while (litIndexes.size < MAX_LIT_CELLS) {
      litIndexes.add(Math.floor(Math.random() * totalCells))
    }

    litIndexes.forEach(index => {
      cells[index].lit = true
    })

    setGridCells(cells)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setGridCells((prev) => {
        const newCells = prev.map(cell => ({ ...cell, lit: false })) 
        const totalCells = gridSize.rows * gridSize.cols

        const litIndexes = new Set()
        while (litIndexes.size < MAX_LIT_CELLS) {
          litIndexes.add(Math.floor(Math.random() * totalCells))
        }

        litIndexes.forEach(index => {
          newCells[index].lit = true
        })

        return newCells
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0a0c14] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <div
          className="grid h-full"
          style={{
            gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          }}
        >
          {gridCells.map((cell) => (
            <motion.div
              key={cell.id}
              className="border-[0.5px] border-[#1a2035]"
              animate={{
                backgroundColor: cell.lit ? "rgba(255, 255, 255, 0.05)" : "transparent",
              }}
              transition={{ duration: 1 }}
            />
          ))}
        </div>

        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0a0c14] to-transparent z-10" />

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0c14] to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <div className="flex justify-center pt-8 pb-16">
          <div className="bg-[#1a1d2a] rounded-full px-6 py-3 flex space-x-8">
            <button className="text-white font-medium">Home</button>
            <button className="text-gray-400">XYZ</button>
            <button className="text-gray-400">ABC</button>
            <button className="text-gray-400">DEF</button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6">
            <div className="bg-[#1a1d2a] text-white text-xs py-1 px-3 rounded-full inline-flex items-center">
              <span className="text-[10px] font-bold text-white bg-blue-500 rounded-full px-1.5 py-0.5 mr-2">
                NEW
              </span>
              Demo version is available to download
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-wide">A design test for</h1>
          <h1 className="text-5xl md:text-7xl font-bold text-blue-500">SyncHubb</h1>
        </div>
      </div>
    </div>
  )
}
