import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRole } from './user-role.enum';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: User = {
    id: 'dd09daf6-f276-4d43-a6a6-3af844b296fe',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    role: UserRole.CUSTOMER,
    password: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a user object', async () => {
    expect(await service.get('dd09daf6-f276-4d43-a6a6-3af844b296fe')).toEqual(
      mockUser,
    );
  });
});
