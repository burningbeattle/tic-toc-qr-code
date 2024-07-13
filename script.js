document.getElementById('generate-btn').addEventListener('click', generateQRCode);
document.getElementById('download-btn').addEventListener('click', downloadQRCode);
document.getElementById('share-btn').addEventListener('click', shareQRCode);

function generateQRCode() {
    const text = document.getElementById('text-input').value;
    if (!text) {
        alert('Please enter text or URL');
        return;
    }
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = '';
    const qrCode = new QRCode(qrCodeContainer, {
        text: text,
        width: 256,
        height: 256,
    });
}

function downloadQRCode() {
    const qrCodeContainer = document.getElementById('qr-code');
    const img = qrCodeContainer.querySelector('img') || qrCodeContainer.querySelector('canvas');
    if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qr-code.png';
        link.click();
    } else {
        alert('Please generate a QR code first');
    }
}

function shareQRCode() {
    const qrCodeContainer = document.getElementById('qr-code');
    const img = qrCodeContainer.querySelector('img') || qrCodeContainer.querySelector('canvas');
    if (img) {
        if (navigator.share) {
            navigator.share({
                title: 'QR Code',
                text: 'Check out this QR code!',
                url: img.src
            }).catch(error => console.error('Error sharing:', error));
        } else {
            alert('Share feature is not supported in your browser');
        }
    } else {
        alert('Please generate a QR code first');
    }
}
