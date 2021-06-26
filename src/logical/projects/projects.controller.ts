import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post()
  async create(@Body() body: any) {
    return await this.projectsService.create(body);
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Put()
  async update(@Body() body: any) {
    return await this.projectsService.update(body);
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Delete(':project_keycode')
  async delete(@Param('project_keycode') project_keycode: any) {
    return await this.projectsService.delete(project_keycode);
  }

  @Get(':project_keycode')
  async getProjectByCode(@Param('project_keycode') project_keycode: any) {
    return await this.projectsService.getProjectByCode(project_keycode);
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Get()
  async getProjectsByAuthor(@Query() query: any) {
    return await this.projectsService.getProjectsByAuthor(query.user_code);
  }
}
