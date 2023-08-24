import { Migration } from '@mikro-orm/migrations';

export class Migration20230824212650 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "comment" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "content" varchar(255) not null, "post_id" int not null, "author_id" int not null);');

    this.addSql('alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comment" cascade;');
  }

}
