function generateQRCode() {
    const inputData = document.getElementById('input-data').value;
    const qrcodeContainer = document.getElementById('qrcode');
  
    // Clear previous QR code
    qrcodeContainer.innerHTML = '';
  
    // Create a new QR code
    new QRCode(qrcodeContainer, inputData);
  }
  