import {Component, OnInit} from '@angular/core';
import {DatabaseConnectionService} from "@core/service/database-connection.service";
import {NzMessageService} from 'ng-zorro-antd';
import {ReuseTabService} from '@delon/abc';
import {IDatabaseConnection} from "@core/model/database-connection.model";
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-database-connection',
  templateUrl: './database-connection.component.html',
  styleUrls: ['database-connection.component.less']
})
export class DatabaseConnectionComponent implements OnInit {
// 编辑器状态：0 浏览 1 新增 2 修改
  formStatus = 0;
  // 编辑缓存
  editCache = {};
  // 数据集
  dataSet = [];
  // 正在加载
  loading = false;
  // 页码
  pageIndex = 1;
  // 每页大小
  pageSize = 20;
  // 总记录数
  total = 0;

  constructor(
    private databaseConnectionService: DatabaseConnectionService,
    private messageService: NzMessageService,
    private reuseTabService: ReuseTabService,
  ) {
    this.reuseTabService.title = '数据连接';
  }

  /**
   * 新增
   */
  addRow(): void {
    this.formStatus = 1;
    this.dataSet = [{
      id: 0,
      connectionName: '',
      host: '',
      port: '',
      databaseName: '',
      params: '',
      type: '',
      driver: '',
      url: '',
      username: '',
      password: ''
    },
      ...this.dataSet
    ];
    this.updateEditCache();
    this.editCache[0].edit = true;
  }

  // 删除数据
  deleteRow(id: string): void {
    this.databaseConnectionService.delete(+id).subscribe(
      () => {
        this.loadDatabaseConnection();
        this.messageService.success('删除用户成功！')
      },
      () => {
        this.messageService.error('删除用户失败！')
      }
    )
  }

  // 开始修改
  startEdit(id: string): void {
    this.formStatus = 2;
    this.editCache[id].edit = true;
  }

  // 放弃修改
  cancelEdit(id: string): void {
    if (this.formStatus === 1) {
      this.dataSet.splice(0, 1);

      this.editCache = {};
      this.updateEditCache();
    } else {
      this.editCache[id].edit = false;
    }

    this.formStatus = 0;
  }

  typeChange(value, id): void {
    if (!value) {
      return;
    }
    const data = this.editCache[id].data;
    if (!data) {
      return;
    }

    switch (value) {
      case "MYSQL":
        data.driver = "com.mysql.jdbc.Driver";
        data.url = "jdbc:mysql://" + data.host + ":" + data.port + "/" + data.databaseName;
        data.params = "useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
        break;
      case "SQLSERVER":
        data.driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        data.url = "jdbc:sqlserver://"+data.host+":"+data.port+";DatabaseName=" + data.databaseName;
        data.params = "";
        break;
      case "ORACLE":
        data.driver = "oracle.jdbc.driver.OracleDriver";
        data.url = "jdbc:oracle:thin:@"+data.host+":" + data.port + ":" + data.databaseName;
        data.params = "";
        break;
    }
  }

  /**
   * 保存
   * @param id
   */
  saveEdit(id: string): void {
    const index = this.dataSet.findIndex(item => item.id === id);

    if (this.formStatus === 1) {
      this.editCache[id].data.id = null;
      this.databaseConnectionService.create(this.editCache[id].data).subscribe(
        (res) => {
          this.dataSet[0] = res.body;
          this.updateEditCache();
          this.formStatus = 0;
          this.messageService.success('新增数据连接成功！');

          this.loadDatabaseConnection();
        },
        (res) => {
          this.messageService.error('新增数据连接失败！<br />' + res.error.title);
        }
      );
    } else if (this.formStatus === 2) {
      this.databaseConnectionService.update(this.editCache[id].data).subscribe(
        (res) => {
          this.editCache[id].data = res.body;
          Object.assign(this.dataSet[index], this.editCache[id].data);
          this.editCache[id].edit = false;
          this.updateEditCache();
          this.formStatus = 0;
          this.messageService.success('编辑数据连接成功！')
        },
        () => {
          // 错误！
          this.messageService.error('编辑数据连接失败！')
        }
      )
    }
  }

  /**
   * 更新编辑状态
   */

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: {...item}
        };
      }
    });
  }

  ngOnInit(): void {
    this.loadDatabaseConnection();
  }

  /**
   * 加载用户扩展数据
   */
  loadDatabaseConnection() {
    this.loading = true;
    this.databaseConnectionService.query({
      page: this.pageIndex - 1,
      size: this.pageSize,
      sort: ['id,asc']
    }).subscribe(
      (res: HttpResponse<IDatabaseConnection[]>) => {
        this.loading = false;
        this.total = parseInt(res.headers.get('X-Total-Count'));
        this.dataSet = res.body;

        this.updateEditCache();
      },
      (res: HttpErrorResponse) => {
        this.loading = false;
        this.messageService.error(res.message)
      }
    )
  }
}
