import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        {
          provide: CandidatesService,
          useValue: {
            processCandidateFile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service with correct parameters and return response', () => {
    const mockFile = {
      buffer: Buffer.from('fake-excel-content'),
    } as Express.Multer.File;

    const dto: CreateCandidateDto = {
      name: 'Carlos',
      surname: 'Pérez',
    };

    const expectedResult = [
      {
        name: 'Carlos',
        surname: 'Pérez',
        seniority: 'senior',
        years: 5,
        availability: true,
      },
    ];

    (service.processCandidateFile as jest.Mock).mockReturnValue(expectedResult);

    const result = controller.handleUpload(mockFile, dto);
    expect(result).toEqual(expectedResult);
    expect(service.processCandidateFile).toHaveBeenCalledWith(
      mockFile.buffer,
      'Carlos',
      'Pérez'
    );
  });
});
