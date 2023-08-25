import { Migration } from '@mikro-orm/migrations';

export class Migration20230825220536 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "name" varchar(255) not null, "email" varchar(255) not null, "hashed_password" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "title" text not null, "body" text not null, "author_id" int not null);');

    this.addSql('create table "comment" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "content" text not null, "post_id" int not null, "author_id" int not null);');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_author_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_author_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_post_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "post" cascade;');

    this.addSql('drop table if exists "comment" cascade;');
  }

}
