export function validatePDFFile(file: File): boolean {
  // Check both MIME type and file extension
  const isPDFType = file.type === 'application/pdf';
  const isPDFExtension = file.name.toLowerCase().endsWith('.pdf');
  return isPDFType || isPDFExtension;
}

export function generateFileId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}