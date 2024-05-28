import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const App = () => {
  const componentRef = useRef()

  const applyTemporaryStyles = (element) => {
    element.style.padding = '20px'
    element.style.backgroundColor = '#f5f5f5'
  }

  const revertTemporaryStyles = (element) => {
    element.style.padding = ''
    element.style.backgroundColor = ''
  }

  const handleSavePdf = async () => {
    const element = componentRef.current

    // Apply temporary styles
    applyTemporaryStyles(element)

    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    // Revert styles back to original
    revertTemporaryStyles(element)

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = canvas.width
    const imgHeight = canvas.height

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

    const imgX = 0
    const imgY = 0
    const imgW = imgWidth * ratio
    const imgH = imgHeight * ratio

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgW, imgH)
    pdf.save('download.pdf')
  }

  return (
    <div>
      <div ref={componentRef} style={{ width: '100%' }}>
        <h1>Hello, PDF!</h1>
        <p>This content will be saved as a PDF.</p>
      </div>
      <button onClick={handleSavePdf}>Save as PDF</button>
    </div>
  )
}

export default App
