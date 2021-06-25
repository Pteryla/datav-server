import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<any | undefined> {
    console.log(username);
    const sql = `
        SELECT account,
               password,
               password_salt passwordSalt,
               role
        From datav_user_table
        WHERE account = '${username}'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      const user = res[0]; // 查出来的结果是一个数组，我们只取第一个。
      if (user) {
        return {
          code: 200, // 返回状态码，可自定义
          data: {
            user,
          },
          msg: 'Success',
        };
      } else {
        return {
          code: 600,
          msg: '查无此人',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
