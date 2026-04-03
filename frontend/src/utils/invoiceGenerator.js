import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoice = (order) => {
    if (!order) {
        alert("Error: Order data is missing.");
        return;
    }

    const doc = new jsPDF();
    const primaryColor = [212, 175, 55]; // Gold color

    // Header logic...
    doc.setFillColor(30, 30, 30);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('RIKA JEWELS', 15, 25);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('PREMIUM JEWELLERY STORE', 15, 32);
    doc.setFontSize(18);
    doc.text('INVOICE', 160, 27);

    // Invoice Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Details:', 15, 55);
    doc.setFont('helvetica', 'normal');
    doc.text(`Order ID: #${order.orderId || (order._id ? order._id.slice(-8) : 'N/A')}`, 15, 62);
    doc.text(`Date: ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}`, 15, 67);
    doc.text(`Payment Method: ${order.payment?.method || 'N/A'}`, 15, 72);

    // Customer Info
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 120, 55);
    doc.setFont('helvetica', 'normal');
    doc.text(order.shippingAddress?.name || order.user?.name || 'Customer', 120, 62);
    doc.text(order.shippingAddress?.phone || order.user?.phone || '', 120, 67);
    doc.text(order.shippingAddress?.address || '', 120, 72);
    const cityState = `${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} ${order.shippingAddress?.pincode ? '- ' + order.shippingAddress.pincode : ''}`;
    doc.text(cityState.trim().replace(/^,/, '').trim(), 120, 77);

    // Item Table - SAFETY CHECK ADDED HERE
    const tableColumn = ["Product", "Price", "Qty", "Total"];
    const tableRows = [];

    // Ensure order.items exists before calling forEach
    const items = order.items || [];

    items.forEach(item => {
        const itemData = [
            item.name || 'Jewellery Item',
            `INR ${(item.price || 0).toLocaleString()}`,
            item.quantity || 1,
            `INR ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}`
        ];
        tableRows.push(itemData);
    });

    if (tableRows.length === 0) {
        tableRows.push(["No items listed", "0", "0", "0"]);
    }

    // Fixed: Using autoTable(doc, options) instead of doc.autoTable(options)
    autoTable(doc, {
        startY: 90,
        head: [tableColumn],
        body: tableRows,
        headStyles: { fillColor: primaryColor, textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        margin: { left: 15, right: 15 }
    });

    // Totals
    const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 120) + 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Order Summary:', 140, finalY);
    doc.setFont('helvetica', 'normal');

    const subtotal = items.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
    doc.text(`Subtotal: INR ${subtotal.toLocaleString()}`, 140, finalY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    const total = order.totalAmount || subtotal;
    doc.text(`Grand Total: INR ${total.toLocaleString()}`, 140, finalY + 15);

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for choosing Rika Jewels. Shine like a diamond!', 105, pageHeight - 20, { align: 'center' });
    doc.setFontSize(8);
    doc.text('This is a computer generated invoice and does not require a physical signature.', 105, pageHeight - 15, { align: 'center' });

    // Save the PDF
    doc.save(`Invoice_${order.orderId || order._id || 'Order'}.pdf`);
};
