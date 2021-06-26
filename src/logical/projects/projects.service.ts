import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';
import { makeUniqueID } from '../../utils/cryptogram';

@Injectable()
export class ProjectsService {
  async create(requestBody: any): Promise<any> {
    const { project_name, project_data, create_by } = requestBody;
    const project_status = 1;
    const project_keycode = makeUniqueID(10);

    const createSQL = `
        INSERT INTO datav_projects_table
        (project_name, project_data, create_by, project_keycode, project_status)
        VALUES ('${project_name}', '${project_data}', '${create_by}', '${project_keycode}', '${project_status}')
    `;
    try {
      await sequelize.query(createSQL, { logging: false });
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

  async update(requestBody: any): Promise<any> {
    const {
      project_name,
      project_data,
      is_publish,
      publish_url,
      is_use_visit_key,
      visit_key,
      update_by,
      is_use_white_list,
      allow_user_code_list,
      project_keycode,
    } = requestBody;

    const sql = `
        UPDATE datav_projects_table
        SET ${project_name ? `project_name='${project_name}',` : ''}
                ${project_data ? `project_data='${project_data}',` : ''}
                    ${is_publish ? `is_publish=${is_publish},` : ''}
                    ${publish_url ? `publish_url='${publish_url},'` : ''}
                    ${
                      is_use_visit_key
                        ? `is_use_visit_key=${is_use_visit_key},`
                        : ''
                    }
                    ${visit_key ? `visit_key='${visit_key}',` : ''}
                    ${update_by ? `update_by='${update_by}',` : ''}
                    ${
                      is_use_white_list
                        ? `is_use_white_list=${is_use_white_list},`
                        : ''
                    }
                    ${
                      allow_user_code_list
                        ? `allow_user_code_list='${allow_user_code_list}',`
                        : ''
                    }
                    ${
                      project_keycode
                        ? `project_keycode='${project_keycode}'`
                        : ''
                    }
        WHERE project_keycode = '${project_keycode}'
    `;

    console.log(sql);
    try {
      await sequelize.query(sql, { logging: false });
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

  async delete(project_keycode: string): Promise<any> {
    const sql = `
        UPDATE datav_projects_table
        SET project_status = 2
        WHERE project_keycode = '${project_keycode}'
    `;
    console.log(sql);
    try {
      await sequelize.query(sql, { logging: false });
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

  async getProjectByCode(project_keycode: string): Promise<any> {
    console.log(project_keycode);
    if (!project_keycode) {
      return {
        code: 200,
        msg: 'Success',
        data: [],
      };
    }

    const sql = `
        SELECT project_name,
               project_data,
               is_publish,
               publish_url,
               is_use_visit_key,
               visit_key,
               create_by,
               create_time,
               update_by,
               update_time,
               project_keycode,
               is_use_white_list,
               allow_user_code_list
        From datav_projects_table
        WHERE project_keycode = '${project_keycode}'
          and project_status = '1'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
      });

      return {
        code: 200,
        msg: 'Success',
        data: res,
      };
    } catch (error) {
      console.error(error);
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getProjectsByAuthor(user_code: string): Promise<any> {
    if (!user_code) {
      return {
        code: 200,
        msg: 'Success',
        data: [],
      };
    }

    const sql = `
        SELECT project_name,
               project_data,
               is_publish,
               publish_url,
               is_use_visit_key,
               visit_key,
               create_by,
               create_time,
               update_by,
               update_time,
               project_keycode,
               is_use_white_list,
               allow_user_code_list
        From datav_projects_table
        WHERE create_by = '${user_code}'
          and project_status = '1'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
      });

      return {
        code: 200,
        msg: 'Success',
        data: res,
      };
    } catch (error) {
      console.error(error);
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
