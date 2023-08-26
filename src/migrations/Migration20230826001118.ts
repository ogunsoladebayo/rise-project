import { Migration } from '@mikro-orm/migrations';

export class Migration20230826001118 extends Migration {

  async up(): Promise<void> {
    this.addSql('create index "user_name_index" on "user" ("name");');

    this.addSql('create index "post_author_id_index" on "post" ("author_id");');

    this.addSql('create index "comment_author_id_index" on "comment" ("author_id");');
    this.addSql('create index "comment_created_at_index" on "comment" ("created_at");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "user_name_index";');

    this.addSql('drop index "post_author_id_index";');

    this.addSql('drop index "comment_author_id_index";');
    this.addSql('drop index "comment_created_at_index";');
  }

}
