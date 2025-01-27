import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 1995,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'muthu1510',
      database: process.env.DB_NAME || 'syntra-ai',
      autoLoadEntities: true,
      synchronize: true, // Automatically synchronize schema (disable in production)
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
