import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './logical/auth/auth.module';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';
import { ProjectsModule } from './logical/projects/projects.module';

@Module({
  imports: [UserModule, AuthModule, ProjectsModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
