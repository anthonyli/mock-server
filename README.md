# mock-server

## 环境依赖

- node 8+ LTS
- npm 5+

## 本地开发

```bash
npm i
npm start
```

## 登录mysql

```bash

mysql -u username -p

```

## 导出sql

```bash

mysqldump -u root -p mock > mock.sql

```

## 导入sql

```bash

create database mock;
mysql -u root  -p mock < mock.sql

```
