import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
    }),
    CrudModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
