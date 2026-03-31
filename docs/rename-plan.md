# 重命名方案：petkit_solo -> petkit_feeder

## 目标

将集成名称从 `petkit_solo` 改名为 `petkit_feeder`，使其能够兼容 Petkit 的其他喂食器设备（如 D3、D4 等型号），为未来扩展做准备。

## 影响范围

### 1. 后端集成代码

#### 文件夹结构
```
custom_components/
├── petkit_solo/          -> petkit_feeder/
│   ├── __init__.py
│   ├── manifest.json
│   ├── const.py
│   ├── config_flow.py
│   ├── coordinator.py
│   ├── sensor.py
│   ├── binary_sensor.py
│   ├── button.py
│   ├── switch.py
│   ├── number.py
│   ├── strings.json
│   ├── translations/
│   │   ├── en.json
│   │   ├── zh.json
│   │   └── zh-Hans.json
│   └── pypetkitapi/
```

#### 需要修改的文件

| 文件 | 修改内容 |
|------|---------|
| `manifest.json` | `domain: "petkit_solo"` -> `"petkit_feeder"`，`loggers: ["petkit_solo"]` -> `["petkit_feeder"]`，`name` 改为更通用的名称 |
| `const.py` | `DOMAIN = "petkit_solo"` -> `"petkit_feeder"`，`DEFAULT_NAME` 改为通用名称 |
| 所有 `.py` 文件 | 引用 `DOMAIN` 的地方无需修改（自动继承） |

### 2. 服务名称变更

| 旧名称 | 新名称 |
|--------|--------|
| `petkit_solo.add_feeding_item` | `petkit_feeder.add_feeding_item` |
| `petkit_solo.remove_feeding_item` | `petkit_feeder.remove_feeding_item` |
| `petkit_solo.update_feeding_item` | `petkit_feeder.update_feeding_item` |
| `petkit_solo.toggle_feeding_item` | `petkit_feeder.toggle_feeding_item` |

### 3. Entity ID 变更

| 旧 Entity ID | 新 Entity ID |
|--------------|--------------|
| `sensor.petkit_solo_feeding_schedule` | `sensor.petkit_feeder_feeding_schedule` |
| `sensor.petkit_solo_feeding_history` | `sensor.petkit_feeder_feeding_history` |
| `sensor.petkit_solo_device_name` | `sensor.petkit_feeder_device_name` |
| `sensor.petkit_solo_last_feeding` | `sensor.petkit_feeder_last_feeding` |
| `sensor.petkit_solo_last_amount` | `sensor.petkit_feeder_last_amount` |
| `sensor.petkit_solo_today_count` | `sensor.petkit_feeder_today_count` |
| `binary_sensor.petkit_solo_online` | `binary_sensor.petkit_feeder_online` |
| `button.petkit_solo_feed` | `button.petkit_feeder_feed` |
| `button.petkit_solo_refresh` | `button.petkit_feeder_refresh` |
| `switch.petkit_solo_manual_lock` | `switch.petkit_feeder_manual_lock` |
| `number.petkit_solo_feed_amount` | `number.petkit_feeder_feed_amount` |

### 4. 前端卡片代码

#### 需要修改的文件

| 文件 | 修改内容 |
|------|---------|
| `card/src/petkit-solo-card.ts` | 服务调用 `petkit_solo.xxx` -> `petkit_feeder.xxx`，默认 entity_id |
| `card/src/types.ts` | 无需修改 |
| `card/src/editor.ts` | 无需修改 |

#### 具体修改点

```typescript
// petkit-solo-card.ts

// 默认配置
entity: 'sensor.petkit_solo_feeding_schedule'  -> 'sensor.petkit_feeder_feeding_schedule'
history_entity: 'sensor.petkit_solo_feeding_history'  -> 'sensor.petkit_feeder_feeding_history'

// 服务调用
await this.hass.callService('petkit_solo', 'toggle_feeding_item', ...)  -> 'petkit_feeder'
await this.hass.callService('petkit_solo', 'remove_feeding_item', ...)  -> 'petkit_feeder'
await this.hass.callService('petkit_solo', 'update_feeding_item', ...)  -> 'petkit_feeder'
await this.hass.callService('petkit_solo', 'add_feeding_item', ...)  -> 'petkit_feeder'
```

### 5. 文档和脚本

| 文件 | 修改内容 |
|------|---------|
| `README.md` | 所有 `petkit_solo` -> `petkit_feeder`，更新示例 |
| `card/README.md` | 同上 |
| `docs/*.md` | 同上 |
| `scripts/setup.sh` | 文件夹路径、检查路径 |
| `scripts/check_code.py` | 文件夹路径、import 路径 |
| `scripts/README.md` | 文件夹路径 |
| `requirements.txt` | 注释中的路径 |

### 6. 翻译文件

| 文件 | 修改内容 |
|------|---------|
| `strings.json` | 标题、描述可能需要更新 |
| `translations/en.json` | 同上 |
| `translations/zh.json` | 同上 |
| `translations/zh-Hans.json` | 同上 |

## 执行步骤

### 第一阶段：重命名文件夹和核心常量

1. 重命名文件夹：`custom_components/petkit_solo` -> `custom_components/petkit_feeder`
2. 修改 `const.py` 中的 `DOMAIN`
3. 修改 `manifest.json` 中的 `domain` 和 `loggers`

### 第二阶段：更新前端卡片

1. 修改默认 entity_id
2. 修改服务调用名称
3. 更新设备名称传感器推断逻辑

### 第三阶段：更新文档和脚本

1. 更新 README.md
2. 更新 card/README.md
3. 更新 scripts/ 下所有文件
4. 更新 requirements.txt 注释

### 第四阶段：测试验证

1. 删除旧的集成配置
2. 重启 Home Assistant
3. 重新配置集成
4. 更新前端卡片配置
5. 验证所有功能正常

## 用户迁移指南

这是一个**破坏性更新**，用户需要执行以下步骤：

### 1. 升级前准备

记录当前配置：
- 记录当前 entity_id（如 `sensor.petkit_solo_feeding_schedule`）
- 记录前端卡片配置中的 entity 和 history_entity

### 2. 升级步骤

1. 在 Home Assistant 中删除旧的集成（设置 -> 设备与服务 -> 小佩 SOLO 喂食器 -> 删除）
2. 更新代码（git pull 或重新下载）
3. 重启 Home Assistant
4. 重新添加集成（现在名称为"小佩喂食器"或类似）
5. 更新前端卡片配置中的 entity_id

### 3. 前端卡片配置更新

```yaml
# 旧配置
entity: sensor.petkit_solo_feeding_schedule
history_entity: sensor.petkit_solo_feeding_history

# 新配置
entity: sensor.petkit_feeder_feeding_schedule
history_entity: sensor.petkit_feeder_feeding_history
```

### 4. 自动化脚本更新

如果有使用服务的自动化脚本，需要更新服务名称：

```yaml
# 旧
service: petkit_solo.add_feeding_item

# 新
service: petkit_feeder.add_feeding_item
```

## 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| 用户配置丢失 | 高 | 提供详细的迁移指南，保留配置参数 |
| 自动化脚本失效 | 中 | 文档明确说明服务名称变更 |
| 第三方集成失效 | 低 | 目前没有已知的第三方集成 |
| 回滚困难 | 中 | 建议用户备份配置后再升级 |

## 未来扩展性

重命名后，代码结构支持：

1. **多设备支持**：每个设备独立的 coordinator 和 sensors
2. **多型号支持**：通过设备类型判断，加载不同的功能模块
3. **统一 API**：`pypetkitapi` 已支持多种设备类型

```
custom_components/petkit_feeder/
├── devices/
│   ├── __init__.py
│   ├── base.py          # 设备基类
│   ├── solo.py          # SOLO 设备特定逻辑
│   ├── d3.py            # D3 设备特定逻辑
│   └── d4.py            # D4 设备特定逻辑
├── sensors/
│   ├── __init__.py
│   ├── common.py        # 通用传感器
│   └── device_specific.py  # 设备特定传感器
```

## 时间估算

| 阶段 | 预计时间 |
|------|---------|
| 重命名文件夹和核心常量 | 10 分钟 |
| 更新前端卡片 | 15 分钟 |
| 更新文档和脚本 | 20 分钟 |
| 测试验证 | 30 分钟 |
| **总计** | **约 1-1.5 小时** |

## 检查清单

- [ ] 重命名文件夹 `custom_components/petkit_solo` -> `custom_components/petkit_feeder`
- [ ] 修改 `manifest.json` 的 `domain` 和 `loggers`
- [ ] 修改 `const.py` 的 `DOMAIN` 常量
- [ ] 修改前端卡片默认 entity_id
- [ ] 修改前端卡片服务调用名称
- [ ] 更新 `README.md`
- [ ] 更新 `card/README.md`
- [ ] 更新 `scripts/setup.sh`
- [ ] 更新 `scripts/check_code.py`
- [ ] 更新 `requirements.txt` 注释
- [ ] 更新翻译文件标题
- [ ] 测试集成配置流程
- [ ] 测试前端卡片功能
- [ ] 测试服务调用
- [ ] 编写迁移指南