import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('tests')
@Controller('/api/v1/tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new test' })
  @ApiResponse({ status: 201, description: 'The test has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid test data or hierarchy.' })
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tests with optional filtering by course, chapter, and lesson' })
  @ApiQuery({ name: 'courseId', required: false })
  @ApiQuery({ name: 'chapterId', required: false })
  @ApiQuery({ name: 'lessonId', required: false })
  @ApiResponse({ status: 200, description: 'Return all tests matching the criteria.' })
  findAll(
    @Query('courseId') courseId?: string,
    @Query('chapterId') chapterId?: string,
    @Query('lessonId') lessonId?: string,
  ) {
    return this.testsService.findAll(courseId, chapterId, lessonId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a test by id' })
  @ApiResponse({ status: 200, description: 'Return the test.' })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.testsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a test' })
  @ApiResponse({ status: 200, description: 'The test has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid update data or ongoing attempts present.' })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTestDto: UpdateTestDto,
  ) {
    return this.testsService.update(id, updateTestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a test' })
  @ApiResponse({ status: 200, description: 'The test has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Cannot delete test with ongoing attempts.' })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testsService.remove(id);
  }
} 