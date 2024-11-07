import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from '../src/tasks/tasks.service';
import { Task, TaskStatus } from '../src/tasks/tasks.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockTask = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.PENDING,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            create: jest.fn().mockReturnValue(mockTask),
            save: jest.fn().mockResolvedValue(mockTask),
            find: jest.fn().mockResolvedValue([mockTask]),
            findOne: jest.fn().mockResolvedValue(mockTask),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const result = await service.createTask(createTaskDto);
      expect(result).toEqual(mockTask);
      expect(repository.create).toHaveBeenCalledWith(createTaskDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const result = await service.getAllTasks();
      expect(result).toEqual([mockTask]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getTaskById', () => {
    it('should return a task', async () => {
      const result = await service.getTaskById(mockTask.id);
      expect(result).toEqual(mockTask);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id },
      });
    });

    it('should throw NotFoundException when task not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.getTaskById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      await service.deleteTask(mockTask.id);
      expect(repository.delete).toHaveBeenCalledWith(mockTask.id);
    });

    it('should throw NotFoundException when task not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);
      await expect(service.deleteTask('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});