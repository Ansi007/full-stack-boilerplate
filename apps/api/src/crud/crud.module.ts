import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudRouter } from './crud.router';

@Module({
  controllers: [],
  providers: [CrudService, CrudRouter],
})
export class CrudModule {}
