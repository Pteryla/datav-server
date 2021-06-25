--  用户信息表
drop table if exists datav_user_table;
create table datav_user_table
(
    `id`                    int(12) unsigned NOT NULL AUTO_INCREMENT,
    `account`               varchar(24) NOT NULL COMMENT '存储用户账户',
    `name`                  varchar(20)          DEFAULT '' COMMENT '用户名称',
    `password`              varchar(32) NOT NULL COMMENT '用户密码',
    `password_salt`         varchar(32)          DEFAULT '' COMMENT '用户密码盐',
    `user_code`             varchar(32) NOT NULL DEFAULT '' COMMENT '用户Code',
    `mobile`                varchar(15)          DEFAULT '' COMMENT '手机号码',
    `role`                  tinyint(4) NOT NULL DEFAULT '3' COMMENT '用户角色：0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）',
    `user_status`           tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-失效|1-有效|2-删除',
    `create_by`             varchar(32)          DEFAULT '' COMMENT '创建人Code',
    `create_time`           timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by`             varchar(32)          DEFAULT '' COMMENT '修改人Code',
    `update_time`           timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    `projects_keycode_list` text COMMENT '拥有项目的keycode字符串列表',
    PRIMARY KEY (id)
) ENGINE = MYISAM
  AUTO_INCREMENT = 1

  DEFAULT CHARSET = utf8 COMMENT = 'datav用户表';


-- 项目表
drop table if exists datav_projects_table;
create table datav_projects_table
(
    `id`                   int(12) unsigned NOT NULL AUTO_INCREMENT,
    `project_name`         varchar(24) NOT NULL DEFAULT '大数据展示' COMMENT '项目名称',
    `project_data`         longtext COMMENT '项目数据',
    `project_status`       tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-失效|1-有效|2-删除',
    `is_publish`           tinyint(4) NOT NULL DEFAULT '0' COMMENT '发布状态：0-未发布|1-已发布',
    `publish_url`          varchar(50)          DEFAULT '' COMMENT '发布链接',
    `is_use_visit_key`     tinyint(4) DEFAULT '0' COMMENT '是否使用访问密码：0-不使用|1-使用',
    `visit_key`            varchar(32)          DEFAULT '' COMMENT '访问密码',
    `create_by`            varchar(32) NOT NULL COMMENT '创建人Code',
    `create_time`          timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by`            varchar(32) NOT NULL DEFAULT '' COMMENT '最新修改人Code',
    `update_time`          timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    `project_keycode`      varchar(32) NOT NULL DEFAULT '' COMMENT '项目的keycode',
    `is_use_white_list`    tinyint(4) DEFAULT '0' COMMENT '是否使用白名单：0-不使用|1-使用',
    `allow_user_code_list` text COMMENT '拥有对项目访问权限的用户code',
    PRIMARY KEY (id)
) ENGINE = MYISAM
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT = 'datav项目表';


