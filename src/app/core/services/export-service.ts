import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToExcel(data: any[], fileName: string = 'carrito.xlsx'): void {
    console.log(data, '  ');
    if (!data || data.length === 0) {
      console.warn('No hay datos para exportar.');
      return;
    }

    const headers = ['Product', 'Price', 'Quantity'];

    const rows = data.map(item => [
      item.product.title || '',
      item.product.price || '',
      item.quantity || ''
    ]);

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Carrito': worksheet },
      SheetNames: ['Carrito']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    FileSaver.saveAs(blob, fileName);
  }
}