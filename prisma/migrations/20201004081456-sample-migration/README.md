# Migration `20201004081456-sample-migration`

This migration has been generated by Sathish at 10/4/2020, 1:44:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `user` (
`id` int  NOT NULL  AUTO_INCREMENT,
`first_name` varchar(191)  NOT NULL ,
`last_name` varchar(191)  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `contactdetails` (
`id` int  NOT NULL  AUTO_INCREMENT,
`mobile` varchar(191)  NOT NULL ,
`home` varchar(191)  ,
`father` varchar(191)  NOT NULL ,
`mother` varchar(191)  ,
`userId` int  NOT NULL ,
UNIQUE INDEX `contactdetails.mobile_unique`(`mobile`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `contactdetails` ADD FOREIGN KEY (`userId`) REFERENCES `users`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201004081456-sample-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+model user {
+  id               Int            @id @default(autoincrement())
+  first_name       String
+  last_name        String
+}
+
+model contactdetails {
+  id     Int     @id @default(autoincrement())
+  mobile String  @unique
+  home   String?
+  father String
+  mother String?
+  user   user    @relation(fields: [userId], references: [id])
+  userId Int
+}
```

