# Petkit Solo Card - 小佩 SOLO 喂食器 Lovelace 卡片

🫡 专为小佩 SOLO 喂食器设计的 Home Assistant 自定义卡片

---

## ✨ 功能特性

- 📅 **今日喂食时间线** - 合并计划和记录，按时间顺序展示
- 🖐️ **手动喂食标识** - 清晰区分计划喂食和手动喂食
- 📊 **今日统计** - 计划总量、实际总量、手动总量一目了然
- ⏰ **最后喂食** - 显示最后喂食时间和出粮量
- 🔒 **计划管理** - 支持停用/启用/删除计划（需后端支持）

---

## 📦 安装

### 方式 1: HACS（推荐）

1. 打开 HACS
2. 点击右下角 "+"
3. 搜索 "Petkit Solo Card"
4. 点击安装
5. 刷新浏览器

### 方式 2: 手动安装

1. 下载 `petkit-solo-card.js`
2. 放到 `<config>/www/` 目录
3. 添加资源 `/local/petkit-solo-card.js` (类型：module)
4. 刷新浏览器

---

## 🔧 配置

### 基础配置

```yaml
type: custom:petkit-solo-card
entity: sensor.petkit_solo_feeding_schedule
history_entity: sensor.petkit_solo_feeding_history
```

### 完整配置选项

| 选项 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `entity` | string | ✅ | - | 喂食计划实体 |
| `history_entity` | string | ❌ | - | 历史记录实体 |
| `name` | string | ❌ | 设备名 | 卡片标题 |
| `show_timeline` | boolean | ❌ | true | 显示时间线 |
| `show_summary` | boolean | ❌ | true | 显示统计 |
| `show_actions` | boolean | ❌ | true | 显示操作按钮 |

### 配置示例

```yaml
type: custom:petkit-solo-card
entity: sensor.petkit_solo_feeding_schedule
history_entity: sensor.petkit_solo_feeding_history
name: 小佩 SOLO 喂食器
show_timeline: true
show_summary: true
show_actions: true
```

---

## 📊 实体要求

卡片需要以下 Home Assistant 实体：

### 1. 喂食计划传感器

**实体 ID**: `sensor.petkit_solo_feeding_schedule`

**必需属性**:
```yaml
attributes:
  schedule_cn:
    周一:
      - time: "06:00"
        portions: 10
        name: "早餐"
    周二: [...]
    # ... 周一到周日
  is_executed: 1  # 是否启用
```

### 2. 历史记录传感器

**实体 ID**: `sensor.petkit_solo_feeding_history`

**必需属性**:
```yaml
attributes:
  history:
    "2026-03-12":
      - time: "06:00"
        name: "早餐"
        amount: 10
        real_amount: 10
        is_executed: true
        completed_at: "2026-03-12T06:00:20.000+0000"
    "2026-03-11": [...]
```

---

## 🎨 界面预览

```
┌─────────────────────────────────────────┐
│ 🐾 小佩 SOLO 喂食器            🔄 刷新  │
├─────────────────────────────────────────┤
│ 📅 今日喂食时间线                        │
│ 2026-03-12 周四                          │
│                                         │
│ [06:00] 早餐 [计划][✅]                 │
│   计划 10g  实际 10g                    │
│   ✅ 06:00 完成                         │
│   [🔒停用] [🗑️删除]                     │
│                                         │
│ [10:30] 手动喂食 [手动][✅]             │
│   实际 5g                               │
│   ✅ 10:30 完成                         │
│   (手动喂食不可操作)                     │
│                                         │
│ [18:00] 晚餐 [计划][⏳]                 │
│   计划 10g                              │
│   ⏳ 待执行                             │
│   [🔓启用] [🗑️删除]                     │
│                                         │
│ [+ 新增计划]                            │
├─────────────────────────────────────────┤
│ 📊 今日统计                              │
│ ┌──────────┐┌──────────┐┌──────────┐   │
│ │计划喂食  ││实际喂食  ││手动喂食  │   │
│ │  30g     ││  15g     ││  5g      │   │
│ └──────────┘└──────────┘└──────────┘   │
│ ⏰ 最后喂食：10:30 (5g)                  │
└─────────────────────────────────────────┘
```

---

## 🛠️ 开发

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run start
```

### 生产构建

```bash
npm run build
```

构建产物：`dist/petkit-solo-card.js`

---

## 📝 更新日志

### v0.2.0 (2026-03-12)

**✨ 重大更新：时间线视图**

- 🎯 合并今日计划和记录为统一时间线
- 🖐️ 新增手动喂食标识（蓝色标签）
- 📊 新增今日统计卡片（计划/实际/手动总量）
- ⏰ 显示最后喂食时间和出粮量
- 🔒 计划项支持停用/删除（预留接口）
- 🎨 优化样式和布局

### v0.1.0 (2026-03-09)

- 🎉 初始版本发布
- 📅 显示喂食计划
- 📜 显示历史记录

---

## ❓ 常见问题

### Q: 卡片显示空白

**A**: 检查以下几点：
1. 确认实体 ID 正确
2. 确认资源已添加到仪表板
3. 强制刷新浏览器 (Ctrl+Shift+R)
4. 查看浏览器控制台是否有错误

### Q: 统计显示 0g

**A**: 可能是今日无喂食记录，正常现象。

### Q: 操作按钮无响应

**A**: 当前版本仅打印日志，后端服务调用功能待实现。

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- [Home Assistant](https://www.home-assistant.io/)
- [Lit](https://lit.dev/)
- [custom-card-helpers](https://github.com/custom-cards/custom-card-helpers)

---

**Made with ❤️ by 甘 🫡**
