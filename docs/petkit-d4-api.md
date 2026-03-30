# PetKit D4 智能喂食器 API 文档

_从抓包数据提取 · 2026-03-10_

---

## 概述

- **基础 URL**: `https://api.petkit.cn/6`
- **设备类型**: D4 (智能喂食器 SOLO)
- **API 版本**: v6
- **认证方式**: Session Token (Header: `X-Session`)

---

## 通用请求头

所有 API 请求都需要以下 Header:

```
X-Api-Version: 13.5.0
X-Locale: zh_CN
X-Timezone: 8.0
X-TimezoneId: Asia/Shanghai
X-Img-Version: 1
X-Client: Android(12;DEVICE_MODEL)
X-Session: {sessionToken}
Content-Type: application/x-www-form-urlencoded
User-Agent: okhttp/3.14.9
```

---

## 认证相关 API

### 1. 用户登录

```
POST /user/login
```

**Query 参数:**

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| username | string | 是 | 手机号 |
| password | string | 是 | 密码 (MD5 加密) |
| encrypt | int | 是 | 加密方式: 1=MD5 |
| client | string | 是 | URL编码的 JSON 客户端信息 |
| oldVersion | string | 否 | 旧版本号 (可为空) |

**client JSON 结构 (URL编码前):**
```json
{
  "locale": "zh_CN",
  "name": "DEVICE_MODEL",
  "osVersion": "12",
  "phoneBrand": "BRAND",
  "platform": "android",
  "source": "app.petkit-android",
  "timezone": 8.0,
  "timezoneId": "Asia/Shanghai",
  "version": "13.5.0"
}
```

**成功响应:**
```json
{
  "result": {
    "session": "YOUR_SESSION_TOKEN",
    "userId": "YOUR_USER_ID",
    ...
  }
}
```

**失败响应:**
```json
{
  "error": {
    "code": 122,
    "msg": "用户名或密码不正确"
  }
}
```

---

### 2. 刷新会话

```
POST /user/refreshsession
```

**Body (form-urlencoded):**

| 参数 | 类型 | 说明 |
|------|------|------|
| client | string | JSON 编码的客户端信息 |
| oldVersion | string | 旧版本号 |

---

### 3. 注册推送 Token

```
POST /user/registerPushToken
```

**Body (form-urlencoded):**

| 参数 | 类型 | 说明 |
|------|------|------|
| platform | int | 平台: 2=Android |
| token | string | 推送 Token |

---

## 设备相关 API

### 4. 获取设备列表

```
POST /d4/owndevices
```

**无参数 (POST 请求，Body 为空)**

**响应示例:**
```json
{
  "result": [
    {
      "id": DEVICE_ID,
      "mac": "DEVICE_MAC",
      "sn": "DEVICE_SN",
      "secret": "DEVICE_SECRET",
      "createdAt": "2023-07-03T04:40:13.619+0000",
      "name": "智能喂食器SOLO",
      "hardware": 1,
      "firmware": "1.267",
      "timezone": 8.0,
      "signupAt": "2026-02-23T14:08:56.193+0000",
      "locale": "Asia/Shanghai",
      "user": {
        "id": "USER_ID",
        "nick": "USER_NICK",
        "gender": 3,
        "avatar": "https://img5.petkit.cn/uavatar/..."
      },
      "shareOpen": 0,
      "autoUpgrade": 1,
      "familyId": FAMILY_ID,
      "btMac": "BT_MAC",
      "typeCode": 1,
      "settings": {
        "feedNotify": 1,
        "foodNotify": 1,
        "foodWarn": 1,
        "foodWarnRange": [480, 1200],
        "lowBatteryNotify": 1,
        "desiccantNotify": 0,
        "manualLock": 0,
        "lightMode": 1,
        "lightRange": [0, 1440],
        "factor": 10,
        "lightConfig": 1,
        "lightMultiRange": [[480, 1439]],
        "feedSound": 0,
        "colorSetting": 0,
        "controlSettings": 1
      },
      "multiFeed": true,
      "multiConfig": true,
      "multiFeedItem": {
        "feedDailyList": [...],
        "isExecuted": 1,
        "userId": "USER_ID"
      },
      "state": {
        "wifi": {"ssid": "WIFI_SSID", "bssid": "BSSID", "rsq": -30},
        "pim": 1,
        "ota": 0,
        "overall": 1,
        "batteryStatus": 0,
        "runtime": 0,
        "batteryPower": 0,
        "food": 1,
        "feedState": {...},
        "desiccantLeftDays": 0,
        "door": 0,
        "feeding": 0,
        "desiccantTime": 0,
        "ubat": 0
      }
    }
  ]
}
```

**注意:** `result` 是数组，直接包含设备列表。

---

### 5. 获取设备详情

```
POST /d4/device_detail?id={deviceId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | int | 设备 ID |

**请求示例:**
```
POST /d4/device_detail?id=YOUR_DEVICE_ID
```

---

### 6. 获取设备状态

```
POST /d4/devicestate?id={deviceId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | int | 设备 ID |

**响应示例:**
```json
{
  "result": {
    "wifi": {"ssid": "WIFI_SSID", "bssid": "BSSID", "rsq": -30},
    "pim": 1,
    "ota": 0,
    "overall": 1,
    "batteryStatus": 0,
    "batteryPower": 0,
    "food": 1,
    "feedState": {
      "realAmountTotal": 10,
      "planAmountTotal": 40,
      "addAmountTotal": 0,
      "times": 1,
      "feedTimes": {"21600": 1, "43200": 3, "64800": 3, "86280": 3}
    },
    "desiccantLeftDays": 0,
    "door": 0,
    "feeding": 0
  }
}
```

**状态字段说明:**

| 字段 | 类型 | 说明 |
|------|------|------|
| wifi.rsq | int | WiFi 信号强度 (dBm，负值) |
| pim | int | 电源状态: 1=正常 |
| overall | int | 整体状态: 1=在线 |
| batteryStatus | int | 电池状态: 0=正常 |
| food | int | 余粮状态: 1=有粮 |
| feeding | int | 正在出粮: 0=否, 1=是 |
| door | int | 仓门状态: 0=关闭 |

---

### 7. 刷新首页数据

```
POST /d4/refreshHomeV2?deviceId={deviceId}&day={date}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| deviceId | int | 设备 ID |
| day | int | 日期 (格式: YYYYMMDD) |

**请求示例:**
```
POST /d4/refreshHomeV2?deviceId=YOUR_DEVICE_ID&day=20260310
```

**响应示例:**
```json
{
  "result": {
    "devices": [
      {
        "type": "D4",
        "data": {
          "id": DEVICE_ID,
          "name": "智能喂食器SOLO",
          "state": 1,
          "typeCode": 1,
          "desc": "下次出粮: 12:00",
          "createdAt": "2023-07-03T04:40:13.619+0000",
          "relation": {"userId": "USER_ID"},
          "status": {
            "wifi": {"ssid": "WIFI_SSID", "rsq": -30},
            "pim": 1,
            "overall": 1,
            "food": 1,
            "feeding": 0
          },
          "dailyFeed": {
            "day": 20260310,
            "planAmount": 40,
            "addAmount": 0,
            "realAmount": 10,
            "times": 1
          },
          "toDoList": [
            {
              "type": 0,
              "detailType": 4,
              "errType": "desiccant",
              "desc": "使用干燥剂已超过30天...",
              "expire": false
            }
          ]
        }
      }
    ]
  }
}
```

---

## 喂食相关 API

### 8. 获取喂食计划

```
POST /d4/feed?deviceId={deviceId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| deviceId | int | 设备 ID |

**请求示例:**
```
POST /d4/feed?deviceId=YOUR_DEVICE_ID
```

**响应示例:**
```json
{
  "result": {
    "feedDailyList": [
      {
        "suspended": 0,
        "repeats": 1,
        "items": [
          {"id": "21600", "time": 21600, "amount": 10, "name": "早餐"},
          {"id": "43200", "time": 43200, "amount": 10, "name": "晚餐"}
        ]
      }
    ],
    "isExecuted": 1,
    "userId": "USER_ID"
  }
}
```

**字段说明:**

| 字段 | 类型 | 说明 |
|------|------|------|
| suspended | int | 是否暂停: 0=否, 1=是 |
| repeats | int | 重复日期: 1-7=周一到周日 (整数，非字符串) |
| time | int | 时间 (秒，从 00:00 开始，如 21600=06:00) |
| amount | int | 出粮量 (克) |
| id | string | 计划项 ID (与 time 相同) |

---

### 9. 保存喂食计划 (批量)

```
POST /d4/saveFeed
```

**Body (form-urlencoded):**

| 参数 | 类型 | 说明 |
|------|------|------|
| deviceId | int | 设备 ID |
| feedDailyList | string | JSON 编码的喂食计划 |

**请求示例:**
```
deviceId=YOUR_DEVICE_ID&feedDailyList=[...]
```

**feedDailyList JSON 结构 (严格格式):**
```json
[
  {
    "count": 4,
    "items": [
      {
        "amount": 10,
        "amount1": 0,
        "amount2": 0,
        "deviceId": YOUR_DEVICE_ID,
        "deviceType": 11,
        "id": 21600,
        "name": "早餐",
        "petAmount": [],
        "time": 21660
      },
      {
        "amount": 10,
        "amount1": 0,
        "amount2": 0,
        "deviceId": 0,
        "deviceType": 0,
        "id": 43200,
        "name": "晚餐",
        "petAmount": [],
        "time": 43200
      }
    ],
    "repeats": "1",
    "suspended": 0,
    "totalAmount": 40,
    "totalAmount1": 0,
    "totalAmount2": 0
  }
]
```

**重要字段说明:**

| 字段 | 类型 | 说明 |
|------|------|------|
| count | int | 计划项数量 |
| repeats | **string** | 重复日期: "1"-"7" (**字符串格式**) |
| totalAmount | int | 总出粮量 (所有 items 的 amount 合计) |
| deviceId | int | 设备 ID (首项用真实值，其他用 0) |
| deviceType | int | 设备类型 ID (首项用真实值如 11，其他用 0) |
| id | int | 计划项 ID (等于 time 值，整数) |
| petAmount | array | 宠物分配 (空数组) |

**响应:**
```json
{"result": "success"}
```

---

### 10. 获取每日喂食记录

```
POST /d4/dailyFeeds?days={date}&deviceId={deviceId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| days | int | 日期 (格式: YYYYMMDD) |
| deviceId | int | 设备 ID |

**请求示例:**
```
POST /d4/dailyFeeds?days=20260310&deviceId=YOUR_DEVICE_ID
```

**响应示例:**
```json
{
  "result": {
    "feed": [
      {
        "day": 20260310,
        "planAmount": 40,
        "addAmount": 0,
        "realAmount": 10,
        "amount": 40,
        "times": 1,
        "deviceId": 0,
        "items": [
          {
            "id": "s21600",
            "time": 21600,
            "amount": 10,
            "name": "早餐",
            "src": 1,
            "status": 0,
            "isExecuted": 1,
            "state": {
              "realAmount": 10,
              "completedAt": "2026-03-09T22:00:20.000+0000",
              "errCode": 0,
              "result": 0
            }
          },
          {
            "id": "s43200",
            "time": 43200,
            "amount": 10,
            "name": "晚餐",
            "src": 1,
            "status": 0,
            "isExecuted": 1
          }
        ]
      }
    ]
  }
}
```

**字段说明:**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 记录 ID (格式: "s" + time，如 "s21600") |
| src | int | 来源: 1=计划, 2=手动 |
| status | int | 状态: 0=正常 |
| isExecuted | int | 是否有效: 0=已删除/禁用, 1=有效 |
| state.realAmount | int | 实际出粮量 (克) |
| state.completedAt | string | 完成时间 (ISO 8601 格式，UTC) |
| state.errCode | int | 错误码: 0=无错误 |
| state.result | int | 结果: 0=成功 |

**判断是否真正执行完成:**
- `isExecuted=1` 表示计划项有效（未被删除）
- `state.completedAt` 存在且有值表示真正执行完成

---

### 11. 手动出粮

```
POST /d4/saveDailyFeed
```

**Body (form-urlencoded):**

| 参数 | 类型 | 说明 |
|------|------|------|
| deviceId | int | 设备 ID |
| day | int | 日期 (格式: YYYYMMDD) |
| amount | int | 出粮量 (克) |
| time | int | 时间 (-1=立即出粮) |

**请求示例:**
```
amount=10&time=-1&deviceId=YOUR_DEVICE_ID&day=20260310
```

**响应:**
```json
{"result": "success"}
```

---

### 12. 删除/禁用喂食计划项

```
POST /d4/removeDailyFeed?id={feedId}&deviceId={deviceId}&day={date}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 喂食记录 ID (格式: "s" + time，如 "s43200") |
| deviceId | int | 设备 ID |
| day | int | 日期 (格式: YYYYMMDD) |

**请求示例:**
```
POST /d4/removeDailyFeed?id=s43200&deviceId=YOUR_DEVICE_ID&day=20260310
```

**注意:** 参数通过 Query String 传递，不是 POST Body。

---

### 13. 恢复喂食计划项

```
POST /d4/restoreDailyFeed?id={feedId}&deviceId={deviceId}&day={date}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 喂食记录 ID (格式: "s" + time) |
| deviceId | int | 设备 ID |
| day | int | 日期 (格式: YYYYMMDD) |

**请求示例:**
```
POST /d4/restoreDailyFeed?id=s43200&deviceId=YOUR_DEVICE_ID&day=20260310
```

---

### 14. 获取喂食统计

```
POST /d4/feedStatistic?date={date}&type={type}&deviceId={deviceId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| date | int | 日期 (格式: YYYYMMDD) |
| type | int | 统计类型: 0=日 |
| deviceId | int | 设备 ID |

**响应示例:**
```json
{
  "result": {
    "20260310": {"21600": 10},
    "realAmount": 10
  }
}
```

---

### 15. 获取喂食图表统计

```
POST /feederchart/feedStatistic?dataType=1&groupId={groupId}&since={startDate}&until={endDate}&type={type}&userId={userId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| dataType | int | 数据类型: 1 |
| groupId | int | 家庭组 ID |
| since | int | 开始日期 (YYYYMMDD) |
| until | int | 结束日期 (YYYYMMDD) |
| type | int | 统计类型: 0=日, 1=周, 2=月, 3=年 |
| userId | int | 用户 ID |

---

## 设置相关 API

### 16. 更新设备设置

```
POST /d4/updateSettings?kv={json}&id={deviceId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| kv | string | URL编码的 JSON 设置键值对 |
| id | int | 设备 ID |

**请求示例:**
```
POST /d4/updateSettings?kv=%7B%22lightMode%22%3A%201%7D&id=YOUR_DEVICE_ID
POST /d4/updateSettings?kv=%7B%22manualLock%22%3A%200%7D&id=YOUR_DEVICE_ID
```

**kv JSON 结构 (URL编码前):**
```json
{"lightMode": 1}
{"manualLock": 0}
```

**常用设置项:**

| 键 | 值类型 | 说明 |
|------|------|------|
| lightMode | int | 指示灯模式: 0=关, 1=开 |
| foodWarn | int | 缺粮提醒: 0=关, 1=开 |
| feedNotify | int | 喂食通知: 0=关, 1=开 |
| manualLock | int | 手动锁定: 0=关, 1=开 (禁用手动出粮按钮) |
| feedSound | int | 喂食声音: 0=关, 1=开 |

---

### 17. OTA 检查

```
POST /d4/ota_check?deviceId={deviceId}
```

**Query 参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| deviceId | int | 设备 ID |

---

## 其他 API

### 18. 获取用户详情

```
POST /user/details2
```

**Body (form-urlencoded):**

| 参数 | 类型 | 说明 |
|------|------|------|
| userId | int | 用户 ID |

---

### 19. 获取家庭列表

```
POST /group/family/list
```

**无参数**

---

### 20. 获取设备服务器

```
POST /device/getDeviceServers
```

---

### 21. 获取未读状态

```
POST /user/unreadStatus
```

---

## 数据格式说明

### 时间格式

| 类型 | 格式 | 示例 | 说明 |
|------|------|------|------|
| 日期 | YYYYMMDD | 20260310 | 2026年3月10日 |
| 时间 | 秒数 | 21600 | 从 00:00 开始，21600=06:00 |
| 时间戳 | ISO 8601 | 2026-03-09T22:00:20.000+0000 | UTC 时间 |

**时间秒数转换:**
- 06:00 = 6 * 3600 = 21600
- 12:00 = 12 * 3600 = 43200
- 18:00 = 18 * 3600 = 64800
- 23:58 = 23 * 3600 + 58 * 60 = 86280

### ID 格式

| 类型 | 格式 | 示例 | 说明 |
|------|------|------|------|
| 计划项 ID (计划列表) | 整数 | 21600 | 等于 time 值 |
| 记录 ID (每日记录) | 字符串 | "s21600" | "s" + time |

### 设备类型

| typeCode | type | 说明 |
|----------|------|------|
| 1 | D4 | 智能喂食器 SOLO |
| 11 | deviceType | D4 设备类型标识 |

---

## API 命令映射 (ACTIONS_MAP)

pypetkitapi 库提供的预制命令:

| 命令 | 端点 | 参数格式 | 说明 |
|------|------|---------|------|
| `FeederCommand.MANUAL_FEED` | saveDailyFeed | Body: amount, time=-1, deviceId, day | 手动出粮 |
| `FeederCommand.REMOVE_DAILY_FEED` | removeDailyFeed | Query: id, deviceId, day | 禁用计划项 |
| `FeederCommand.RESTORE_DAILY_FEED` | restoreDailyFeed | Query: id, deviceId, day | 恢复计划项 |
| `FeederCommand.FOOD_REPLENISHED` | replenishedFood | Body: deviceId, noRemind | 补粮确认 |
| `FeederCommand.RESET_DESICCANT` | desiccant_reset | Body: deviceId | 重置干燥剂 |
| `FeederCommand.CALIBRATION` | calibration | Body: deviceId, action | 校准出粮量 |
| `DeviceCommand.UPDATE_SETTING` | updateSettings | Query: kv (JSON), id | 更新设置 |

**无预制命令的 API:**
- `saveFeed` (保存喂食计划) - 需自行实现

---

## 错误响应

```json
{
  "error": {
    "code": 122,
    "msg": "用户名或密码不正确"
  }
}
```

---

_按抓包数据整理 · 2026-03-10_