import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesService } from './candidates.service';
import * as xlsx from 'xlsx';

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidatesService],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process Excel buffer and return candidate data', () => {
    // Crear una hoja de Excel simulada
    const data = [{
      'Seniority': 'junior',
      'Years of experience': 2,
      'Availability': true,
    }];

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generar el buffer del Excel
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const result = service.processCandidateFile(buffer, 'Laura', 'García');

    expect(result).toEqual([
      {
        name: 'Laura',
        surname: 'García',
        seniority: 'junior',
        years: 2,
        availability: true,
      }
    ]);
  });
});
