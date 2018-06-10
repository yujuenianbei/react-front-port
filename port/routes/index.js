const express = require('express');
const router = express.Router();
const URL = require('url');

const fs = require("fs");

//加载mysql模块
const mysql = require('mysql');
//创建连接
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '492275105',
    database: 'test'
});
// 建表
// connection.query("CREATE TABLE `tab1` (`uid` VARCHAR(11) DEFAULT NULL,`create` TIMESTAMP(3) NULL DEFAULT NULL,`create2` DATETIME(3) DEFAULT NULL) ENGINE=INNODB DEFAULT CHARSET=utf8");

//SQL语句
// 清空数据库
const truncat = 'TRUNCATE TABLE user;'
// 查
const sql = 'SELECT * FROM user';
// 曾
const addSql = 'INSERT INTO user(name,password) VALUES(?,?)';
// 删
const removeSql = 'DELETE FROM user where id=?';
// 改
const updateSql = 'UPDATE user SET name=?, password=? WHERE id=?;'


// 清空用户
router.get('/truncat', function (req, res, next) {
    pool.query(truncat, function (err, rows, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send({
                reqCode: 500, reqData: {}
            })
            reutrn;
        } else {
            res.send({
                reqCode: 200, reqData: '数据清空完毕'
            });
        }
    });
});

// 查询用户
router.get('/search', function (req, res, next) {
    //解析请求参数
    // const params = URL.parse(req.url, true).query;
    //查
    // connection.query(sql, function (err, result) {
    //     if (err) {
    //         console.log('[SELECT ERROR] - ', err.message);
    //         return;
    //     }
    //     console.log(params.id);
    //     //把搜索值输出
    //     res.send(result);
    //     console.log(result);
    // });

    pool.query(sql, function (err, rows, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send({
                reqCode: 500, reqData: {}
            })
            reutrn;
        } else {
            console.log(rows);
            res.send({
                reqCode: 200, reqData: rows
            });
        }
    });
});

// 新增用户
router.post('/add', function (req, res, next) {
    // 输出 JSON 格式
    response = {
        name: req.body.name,
        password: req.body.password
    };
    // //解析请求参数
    // const params = URL.parse(req.url, true).query;
    let addSqlParams = [response.name, response.password];
    //增
    pool.query(addSql, addSqlParams, function (err, rows, fields) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send({
                reqCode: 500, reqData: {}
            })
            return;
        } else {
            console.log(fields);
            res.send({
                reqCode: 200, reqData: {
                    name: response.name,
                    password: response.password
                }
            });
        }
    });
});

// 删除用户
router.post('/remove', function (req, res, next) {
    response = {
        id: req.body.id,
    };
    let removeSqlRes = [response.id];
    //删
    pool.query(removeSql, removeSqlRes, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        res.send(result);
        console.log(result);
    });
});

// 更新用户
router.put('/update', function (req, res, next) {
    // 输出 JSON 格式
    response = {
        id: req.body.id,
        name: req.body.name,
        password: req.body.password
    };
    let updateSqlRes = [response.name, response.password, response.id];
    //改
    pool.query(updateSql, updateSqlRes, function (err, rows, fields) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send({
                reqCode: 500, reqData: {}
            })
            return;
        } else {
            console.log(fields);
            res.send({
                reqCode: 200, reqData: {
                    id: response.id,
                    name: response.name,
                    password: response.password
                }
            });
        }
    });
});

// 导出excel
var Excel = require('exceljs');
router.get('/exceljs', function (req, res, next) {
    var workbook = new Excel.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    workbook.properties.date1904 = true;
    workbook.views = [
        {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ]
});


// 数据排序
router.get('/123', function (req, res, next) {
    const reslut = [{ "id": "2", "name": "计算服务配置" }, { "id": "3", "name": "网络服务配置" }, { "id": "1", "name": "资源池" }, { "id": "4", "name": "安全服务配置" }, { "id": "5", "name": "存储服务配置" }]
    const compare = function (prop) {
        return function (obj1, obj2) {
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    const resData = reslut.sort(compare("id"));

    res.status(200).send({ resultCode: 'OC.000000', resultData: resData });
});


// 判断数组对象中是否有某个对象 单项
router.get('/operation', function (req, res, next) {
    const result = [{ "id": "fusionnetdoctor-ewflow", "name": "VM间断流检测", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/ewflow", "regionId": "cn-global-1" }] }, { "id": "Service_OM_ECS_ComputeInstances", "name": "计算实例", "desc": "", "type": "compute", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2FcomputeInstance%2FcomputeInstance.html&ci=ComputeInstances&label=ecs", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-config", "name": "系统配置", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/config", "regionId": "cn-global-1" }] }, { "id": "fusioncare-config", "name": "fusionCareConfig", "desc": "", "type": "paas", "isGlobal": 1, "urlList": [{ "url": "https://192.166.83.106:8803/index.html#/sysconfig/envconfig?menu=false&navigation=false&bottom=false", "regionId": "cn-global-1" }, { "url": "https://111.22.22.33:8171/xxxx?pramlistmenu=false&navigation=false&bottom=false1111", "regionId": "" }] }, { "id": "fusionnetdoctor-vmInfo", "name": "VM信息查询", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/vmInfo", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-fipphy", "name": "EIP-PING探测", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/fipphy", "regionId": "cn-global-1" }] }, { "id": "Service_OM_ECS_VmGroups", "name": "虚拟机组", "desc": "", "type": "compute", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2FvmGroup%2FvmGroup.html&ci=VmGroups&label=ecs", "regionId": "cn-global-1" }] }, { "id": "fusioncare-infocollection", "name": "信息收集", "desc": "FusionCare信息收集", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.106:8803/index.html#/infoindex/infocollect?menu=false&navigation=false&bottom=false", "regionId": "cn-global-1" }] }, { "id": "Service_OM_ECS_Hosts", "name": "主机和Hypervisor", "desc": "", "type": "resource", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2Fhost%2Fhost.html&ci=Hosts&label=ecs", "regionId": "cn-global-1" }] }, { "id": "gray_trace_detail", "name": "gray trace", "desc": "通过traceid来展示trace详情", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.107:9999/Trace/api/v1/sys/provide/traceDetail/zh_cn/{traceid}?menu=false&navigation=false&bottom=false&topnav=false", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-elbsnflow", "name": "ELB南北向流量检测", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/elbsnflow", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-eipflow", "name": "EIP", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/eipflow", "regionId": "cn-global-1" }] }, { "id": "Service_OM_IMS_Image", "name": "镜像", "desc": "", "type": "compute", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fims%2Fconfig%2Fimage%2Fimage.html&ci=Image&label=ims", "regionId": "cn-global-1" }] }, { "id": "Service_OM_BMS_Node", "name": "裸金属服务器", "desc": "", "type": "resource", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fbms%2Fui%2FbareMetalServer%2Foverview.html&ci=Node&customParams=&label=bms", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-vpnflow", "name": "VPN", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/vpnflow", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-elbewflow", "name": "ELB东西向流量检测", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/elbewflow", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-vpnphy", "name": "VPN-PING探测", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/vpnphy", "regionId": "cn-global-1" }] }, { "id": "fusionnetdoctor-evsflow", "name": "Traffic Between EVS VMs", "desc": "", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.99:8443/#/netdoctor/manager/evsflow", "regionId": "cn-global-1" }] }, { "id": "fusioncare-healthcheck", "name": "健康检查", "desc": "FusionCare健康检查", "type": "iaas", "isGlobal": 0, "urlList": [{ "url": "https://192.166.83.106:8803/index.html#/healthcheck?menu=false&navigation=false&bottom=false", "regionId": "cn-global-1" }] }, { "id": "Service_OM_ECS_HostGroups", "name": "主机组", "desc": "", "type": "resource", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2FhostGroup%2FhostGroup.html&ci=HostGroups&label=ecs", "regionId": "cn-global-1" }] }, { "id": "Service_OM_ECS_Flavors", "name": "规格", "desc": "", "type": "compute", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2Fflavor%2Fflavor.html&ci=Flavors&label=ecs", "regionId": "cn-global-1" }] }, { "id": "SCCFirewall", "name": "边界防火墙", "desc": null, "type": "security", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fscc%2Fscc%2Ffirewall%2Ffw.html&ci=SCCFirewall&customParams=&label=scc", "regionId": "cn-global-1" }] }, { "id": "Service_OM_EVS_Volume", "name": "磁盘", "desc": null, "type": "storage", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fevs%2Fui%2Fvolume%2Fvolume.html&ci=Volume&customParams=&label=evs", "regionId": "cn-global-1" }] }, { "id": "Service_OM_EVS_VolumeType", "name": "磁盘类型", "desc": null, "type": "resource", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fevs%2Fui%2FvolumeType%2FvolumeType.html&ci=VolumeType&customParams=&label=evs", "regionId": "cn-global-1" }] }, { "id": "Service_OM_VPC_ExternalNet", "name": "外部网络", "desc": null, "type": "networking", "isGlobal": 0, "urlList": [{ "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fvpc%2Fconfig%2FexternalNet%2FexternalNet.html&ci=ExternalNet&customParams=&label=vpc", "regionId": "cn-global-1" }] }]
    const resData = "compute";
    // 判断数组对象中是否有某个对象
    let rest = result.filter((item, index, arry) => {
        return (item.type === resData)
    })
    res.status(200).send({ resultCode: 'OC.000000', rest: rest });
})


// 数据筛选 多项
router.get('/operation1', function (req, res, next) {
    const result = [
        {
            "uid": 1,
            "id": "fusionnetdoctor-ewflow",
            "name": "VM间断流检测",
            "desc": "",
            "type": "iaas",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.83.99:8443/#/netdoctor/manager/ewflow",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 2,
            "id": "Service_OM_ECS_ComputeInstances",
            "name": "计算实例",
            "desc": "",
            "type": "compute",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2FcomputeInstance%2FcomputeInstance.html&ci=ComputeInstances&label=ecs",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 3,
            "id": "fusionnetdoctor-config",
            "name": "系统配置",
            "desc": "",
            "type": "iaas",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.83.99:8443/#/netdoctor/manager/config",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 4,
            "id": "fusioncare-config",
            "name": "fusionCareConfig",
            "desc": "",
            "type": "paas",
            "isGlobal": 1,
            "urlList": [
                {
                    "url": "https://192.166.83.106:8803/index.html#/sysconfig/envconfig?menu=false&navigation=false&bottom=false",
                    "regionId": "cn-global-1"
                },
                {
                    "url": "https://111.22.22.33:8171/xxxx?pramlistmenu=false&navigation=false&bottom=false1111",
                    "regionId": ""
                }
            ]
        },
        {
            "uid": 5,
            "id": "fusionnetdoctor-vmInfo",
            "name": "VM信息查询",
            "desc": "",
            "type": "iaas",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.83.99:8443/#/netdoctor/manager/vmInfo",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 6,
            "id": "fusionnetdoctor-fipphy",
            "name": "EIP-PING探测",
            "desc": "",
            "type": "iaas",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.83.99:8443/#/netdoctor/manager/fipphy",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 7,
            "id": "Service_OM_ECS_VmGroups",
            "name": "虚拟机组",
            "desc": "",
            "type": "compute",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2FvmGroup%2FvmGroup.html&ci=VmGroups&label=ecs",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 8,
            "id": "fusioncare-infocollection",
            "name": "信息收集",
            "desc": "FusionCare信息收集",
            "type": "iaas",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.83.106:8803/index.html#/infoindex/infocollect?menu=false&navigation=false&bottom=false",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 9,
            "id": "Service_OM_ECS_Hosts",
            "name": "主机和Hypervisor",
            "desc": "",
            "type": "resource",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.80.165:663/soconsolehomewebsite/index.html#/index/custom?customTemUrl=%2Fecs%2Fui%2Fhost%2Fhost.html&ci=Hosts&label=ecs",
                    "regionId": "cn-global-1"
                }
            ]
        },
        {
            "uid": 10,
            "id": "gray_trace_detail",
            "name": "gray trace",
            "desc": "通过traceid来展示trace详情",
            "type": "iaas",
            "isGlobal": 0,
            "urlList": [
                {
                    "url": "https://192.166.83.107:9999/Trace/api/v1/sys/provide/traceDetail/zh_cn/{traceid}?menu=false&navigation=false&bottom=false&topnav=false",
                    "regionId": "cn-global-1"
                }
            ]
        }
    ]
    const resData = [{ "type": "iaas" }];
    // 判断数组对象中是否有某个对象
    let rest = result.filter((item, index, arry) => {
        // foreach 循环
        // let flag = false;
        // resData.forEach((item2, index2, arry2)=>{
        //   if(item.type === item2.type){
        //       flag = true;
        //   }
        // })
        // return flag

        // filter 循环输出
        return resData.filter((item2, index2, arry2) => {
            return (item.type === item2.type)
        })[0];
    })

    const compare = function (prop) {
        return function (obj1, obj2) {
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    const reqdata = rest.sort(compare("uid"));
    res.status(200).send({ resultCode: 'OC.000000', reqdata: reqdata });
})



// 读取文件将文件中的数据写入数据库
const addtestSql = 'INSERT INTO t1(uid,id,name,description,type,isGlobal,urlList,date) VALUES(?,?,?,?,?,?,?,?)';
router.get('/json', function (req, res, next) {
    fs.readFile('./public/test.json', function (err, data, ) {
        if (err) {
            console.log("bad")
        } else {
            console.log("ok");
            // buffer
            console.log(data);
            // // buffer转换成string
            console.log(data.toString());
            // string to json
            let filedata = JSON.parse(data.toString())
            // 将文件中的数据输出
            // res.status(200).send({ resultCode: 'OC.000000', filedata });

            let responseData = [];

            filedata.forEach((ele,index) => {
                response = {
                    uid: ele.uid,
                    id: ele.id,
                    name: ele.name,
                    description: ele.desc,
                    type: ele.type,
                    isGlobal: ele.isGlobal,
                    urlList: ele.urlList
                };
                // let time = new Date().toLocaleString();

                let time=new Date();
                let t=time.getTime();
                t+=1000*index;//一个秒的毫秒数*当前顺序
                time=new Date(t).toLocaleString();
                console.log(time)

                let addtestSqlParams = [response.uid, response.id, response.name,response.description,response.type, response.isGlobal, JSON.stringify(response.urlList),time];
                //增
                pool.query(addtestSql, addtestSqlParams, function (err, rows, fields) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        // res.send({
                        //     reqCode: 500, reqData: {}
                        // })
                        return;
                    } else {
                        // console.log(response)
                    }
                });
                responseData.push(response)
            })
            res.send({
                reqCode: 200, reqData: responseData
            });
        }
    })
})

// 查询t1和oprationType中的数据 按时间过滤

// 查
const jsonsql = 'SELECT * FROM t1,oprationType where t1.type=oprationType.id ORDER BY t1.date';
router.get('/t1json', function (req, res, next) {
    pool.query(jsonsql, function (err, rows, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send({
                reqCode: 500, reqData: {}
            })
            reutrn;
        } else {
            console.log(rows);
            res.send({
                reqCode: 200, reqData: rows
            });
        }
    });
});


// 将数据库数据写入文件中   将数组中的某一项转换成对象（有问题）
const writesql = 'SELECT * FROM t1';
router.get('/writefile', function (req, res, next) {
    const compare = function (prop) {
        return function (obj1, obj2) {
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    pool.query(writesql, function (err, rows, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send({
                reqCode: 500, reqData: {}
            })
            reutrn;
        } else {
            console.log(rows);
            const resData = rows.sort(compare("uid"));
            res.send({
                reqCode: 200, reqData: resData
            });
            // json对象  -- json数组
            let data = JSON.stringify(resData);
            console.log(data)
            fs.writeFile('./wfile.json', data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
                if (err) {
                    console.log("文件写入失败")
                } else {
                    console.log("文件写入成功");
                }
            })
        }
    });
})



// 增

router.get('/jstosql', function (req, res, next) {
    const oprationType = [
        {
            id: 'resource',
            name: {
                'zh-cn': '资源池',
                'en-us': 'Resource Pools'
            }
        },
        {
            id: 'compute',
            name: {
                'zh-cn': '计算服务配置',
                'en-us': 'Compute Services'
            }
        },
        {
            id: 'storage',
            name: {
                'zh-cn': '存储服务配置',
                'en-us': 'Storage Services'
            }
        },
        {
            id: 'networking',
            name: {
                'zh-cn': '网络服务配置',
                'en-us': 'Network Services'
            }
        },
        {
            id: 'security',
            name: {
                'zh-cn': '安全服务配置',
                'en-us': 'Security Services'
            }
        }
    ];
    const local = 'zh-cn'

    let param = '';
    oprationType.forEach((ele, index) => {
        response = {
            id: ele.id,
            name: ele.name,
        };
        // let n = JSON.stringify(response.name[local]);
        // let m = JSON.stringify(response.id);
        // console.log(JSON.stringify(response.name[local]));
        // console.log(JSON.stringify(response.id));
        // param += (JSON.stringify(response.id) + JSON.stringify(response.name[local]));

        let time = new Date();
        let t = time.getTime();
        t += 1000 * index;//一个秒的毫秒数*当前顺序
        time = new Date(t).toLocaleString();
        console.log(time)

        param += `(${JSON.stringify(response.id)},${JSON.stringify(response.name[local])}, ${JSON.stringify(time)}),`
    })
    param = param.substring(0, param.length - 1);
    console.log(param)
    const addoprationType = `insert ignore oprationType(id,name,date) values ${param};`;
    //增
    pool.query(addoprationType, [], function (err, rows, fields) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send({
                reqCode: 500, reqData: {}
            })
            return;
        } else {
            res.send({
                reqCode: 200, reqData: rows
            })
        }
    });
})

//  

module.exports = router;