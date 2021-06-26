import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';
import {
  encryptPassword,
  makeSalt,
  makeUniqueID,
} from '../../utils/cryptogram';

@Injectable()
export class UserService {
  async findOne(account: string): Promise<any | undefined> {
    const sql = `
        SELECT account,
               password,
               password_salt salt,
               name,
               mobile,
               user_code,
               role,
               projects_keycode_list
        From datav_user_table
        WHERE account = '${account}'
          and user_status = '1'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      // 查出来的结果是一个数组，我们只取第一个。
      return res[0];
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { account, name, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '密码不一致',
      };
    }
    const user = await this.findOne(account);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hasPwd = encryptPassword(password, salt);
    const userCode = makeUniqueID(10);
    const registerSQL = `
        INSERT INTO datav_user_table
        (account, name, password, password_salt, user_code, mobile, role, user_status, create_by)
        VALUES ('${account}', '${name}', '${hasPwd}', '${salt}', '${userCode}', '${mobile}', 3, 1, 'self')
    `;
    try {
      await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getUserProjcts(account: string): Promise<any> {
    const user = await this.findOne(account);
    if (user.projects_keycode_list) {
      let projectsKeycodeList = user.projects_keycode_list.split(',');
    } else {
      return [];
    }
  }
}
