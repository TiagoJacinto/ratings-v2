import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {
  autoBindCreateCategorySteps,
  CreateCategoryDataTable,
  CreateCategoryDataTableSchema,
} from 'ratings-features';
import TestAgent from 'supertest/lib/agent';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from '@/shared/database/mikroorm/MikroOrmConfigService';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { validateEnv } from '@/shared/config/env.validation';
import { DatabaseFixture } from '../../support/fixtures/database.fixture';

autoBindCreateCategorySteps(
  [
    ({ given, when, then }) => {
      let agent: TestAgent;
      let nestApp: INestApplication;
      let dbFixture: DatabaseFixture;

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          imports: [
            ConfigModule.forRoot({
              validate: validateEnv,
            }),
            MikroOrmModule.forRootAsync({
              imports: [ConfigModule],
              useClass: MikroOrmConfigService,
            }),
            CategoriesModule,
          ],
        }).compile();

        nestApp = moduleFixture.createNestApplication();
        dbFixture = new DatabaseFixture(nestApp);
        await nestApp.init();

        agent = request(nestApp.getHttpServer());
      });

      beforeEach(async () => {
        dbFixture.resetDatabase();
      });

      afterAll(async () => {
        await nestApp.close();
      });

      given('I am a user', () => {});

      let response: request.Response;

      when('I create a category with valid category details', async () => {
        response = await agent.post('/categories').send({
          name: 'Category',
          description: 'Description',
        });
      });
      then('I should see a success message', () => {
        expect(response.statusCode).toBe(HttpStatus.CREATED);
      });

      when('I register with invalid category details', async () => {
        response = await agent.post('/categories').send({
          name: '',
        });
      });
      then(
        'I should see an error notifying me that my input is invalid',
        () => {
          expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        },
      );

      let categories: CreateCategoryDataTable;
      given('a set of already created categories', async (table) => {
        categories = CreateCategoryDataTableSchema.parse(table);

        for (const category of categories)
          await agent.post('/categories').send(category);
      });

      const responses: request.Response[] = [];
      when('I attempt to create categories with those names', async () => {
        for (const category of categories)
          responses.push(await agent.post('/categories').send(category));
      });
      then(
        'I should see an error for each category notifying me that the category already exists',
        () => {
          for (const response of responses)
            expect(response.statusCode).toBe(HttpStatus.CONFLICT);
        },
      );
    },
  ],
  {
    tagFilter: '@backend',
  },
);
