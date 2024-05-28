import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const MyDocument = () => {
  const generatePDF = () => {
    const doc = new jsPDF()

    const tableColumn = ['ID', 'Name', 'Country', 'Age', 'Gender']
    const tableRows = [
      [1, 'John Doe', 'USA', 28, 'Male'],
      [2, 'Anna Smith', 'UK', 22, 'Female'],
      [3, 'Peter Jones', 'Australia', 35, 'Male'],
      [4, 'Kylie Brown', 'Canada', 25, 'Female']
      // Add more rows here
    ]

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: {
        halign: 'right' // Horizontal alignment to right for RTL
      },
      headStyles: {
        halign: 'right' // Header alignment to right for RTL
      },
      columnStyles: {
        // Applying RTL alignment to each column if needed
        0: { halign: 'right' }, // ID
        1: { halign: 'right' }, // Name
        2: { halign: 'right' }, // Country
        3: { halign: 'right' }, // Age
        4: { halign: 'right' } // Gender
      }
    })

    doc.save('table.pdf')
  }

  return (
    <div className="h-screen">
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  )
}

export default MyDocument
