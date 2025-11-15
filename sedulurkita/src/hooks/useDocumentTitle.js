import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    // Simpan judul sebelumnya (opsional, jika ingin dikembalikan saat unmount)
    // const prevTitle = document.title;
    
    document.title = title;

    // Cleanup function (opsional)
    // return () => {
    //   document.title = prevTitle;
    // };
  }, [title]); // Jalankan ulang jika 'title' berubah
}