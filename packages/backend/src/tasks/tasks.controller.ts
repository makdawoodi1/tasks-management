import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('tasks')
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task created successfully.' })
    create(@Body() createTaskDto: CreateTaskDto) {
      return this.tasksService.createTask(createTaskDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    findAll() {
      return this.tasksService.getAllTasks();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a task by id' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.tasksService.getTaskById(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a task' })
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      return this.tasksService.updateTask(id, updateTaskDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.tasksService.deleteTask(id);
    }
  }