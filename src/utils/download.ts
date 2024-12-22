import JSZip from 'jszip';

export async function downloadFile(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export async function downloadMultipleFiles(files: Array<{ url: string; filename: string }>) {
  const zip = new JSZip();
  
  // Add each file to the zip
  await Promise.all(
    files.map(async ({ url, filename }) => {
      const response = await fetch(url);
      const blob = await response.blob();
      zip.file(filename, blob);
    })
  );
  
  // Generate and download zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = 'compressed_pdfs.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}