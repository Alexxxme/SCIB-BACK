import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class CandidatesService {
  processCandidateFile(buffer: Buffer, name: string, surname: string) {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const [row] = xlsx.utils.sheet_to_json(sheet);

    if (!row) {
      throw new Error('El Excel no contiene datos');
    }

    const candidate = {
      name,
      surname,
      seniority: row['Seniority'],
      years: row['Years of experience'],
      availability: row['Availability'],
    };

    return [candidate];
  }
}
