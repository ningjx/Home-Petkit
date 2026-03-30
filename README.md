# 🐾 小佩 SOLO 喂食器 Home Assistant 集成

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![GitHub](https://img.shields.io/github/license/yourusername/petkit-ha)
![Python](https://img.shields.io/badge/python-3.12+-blue.svg)

> 小佩 SOLO 喂食器的 Home Assistant 原生集成，支持喂食历史、喂食计划、缺粮警告等功能

## ✨ 功能特性

- 🍖 **实时粮量监控** - 显示当前余粮百分比/克数
- 📅 **喂食计划管理** - 查看和编辑每日喂食计划
- 📜 **喂食历史记录** - 追踪每次喂食的详细信息
- ⚠️ **缺粮警告** - 智能预测余粮天数，及时提醒
- 🔄 **灵活刷新** - 支持定时刷新和手动刷新两种模式
- 🌐 **多语言支持** - 中文/英文界面
- 📱 **美观卡片** - 专为 Lovelace Dashboard 设计的可视化卡片

## 📋 系统要求

- Home Assistant 2024.1.0+
- Python 3.12+
- 小佩 SOLO 喂食器（Fresh Element Solo）
- 小佩账号（用于 API 认证）

## 🚀 安装方式

### 方式 1：HACS 安装（推荐）

1. 在 HACS 中添加自定义仓库
2. 搜索 "Petkit Solo"
3. 点击下载
4. 重启 Home Assistant
5. 设置 → 设备与服务 → 添加集成 → 搜索 "Petkit"

### 方式 2：手动安装

```bash
# 克隆仓库
cd /config
git clone https://github.com/yourusername/petkit-ha.git custom_components/petkit_solo

# 重启 Home Assistant
```

## 🔧 配置

### 通过 UI 配置（推荐）

1. 设置 → 设备与服务 → 添加集成
2. 搜索 "Petkit"
3. 输入小佩账号（手机号/邮箱 + 密码）
4. 完成认证

### 配置选项

配置完成后，可以点击集成右上角的"配置"按钮，设置刷新模式：

| 选项 | 说明 | 默认值 |
|------|------|--------|
| **刷新模式** | 定时刷新 / 手动刷新 | 定时刷新 |
| **刷新间隔** | 定时刷新的间隔时间（秒） | 300 秒（5 分钟） |

**刷新模式说明：**
- **定时刷新**：按照设定的间隔自动刷新数据（60-3600 秒）
- **手动刷新**：不自动刷新，需要通过卡片或按钮实体手动触发

### 配置文件配置（可选）

```yaml
# configuration.yaml
petkit_solo:
  username: your_phone_or_email
  password: your_password
```

## 📊 实体说明

| 实体类型 | 实体 ID | 说明 |
|---------|--------|------|
| `sensor` | `sensor.petkit_solo_food_level` | 当前粮量（%） |
| `sensor` | `sensor.petkit_solo_last_feeding` | 最后喂食时间 |
| `sensor` | `sensor.petkit_solo_last_amount` | 最后喂食量（g） |
| `sensor` | `sensor.petkit_solo_today_count` | 今日喂食次数 |
| `binary_sensor` | `binary_sensor.petkit_solo_low_food` | 缺粮警告 |
| `binary_sensor` | `binary_sensor.petkit_solo_online` | 在线状态 |
| `select` | `select.petkit_solo_feeding_plan` | 喂食计划切换 |
| `button` | `button.petkit_solo_refresh` | 刷新数据按钮 |

## 🎨 Lovelace 卡片

添加卡片到 Dashboard：

```yaml
type: custom:petkit-solo-card
entity: sensor.petkit_solo_food_level
name: 小佩 SOLO 喂食器
show_feeding_plan: true
show_history: true
show_warning: true
history_limit: 5
```

**卡片配置项：**

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `entity` | string | 必需 | 主食器粮量传感器实体 |
| `name` | string | 可选 | 卡片标题 |
| `show_feeding_plan` | boolean | true | 显示喂食计划 |
| `show_history` | boolean | true | 显示喂食历史 |
| `show_warning` | boolean | true | 显示缺粮警告 |
| `history_limit` | number | 5 | 历史记录显示数量 |

**刷新按钮：**
- 卡片右上角有刷新按钮，点击可手动刷新数据
- 刷新时会调用 `button.petkit_solo_refresh` 实体
- 刷新过程中按钮会显示旋转动画

## 🛠️ 开发指南

### 快速开始（Linux 主机）⭐

#### 一键设置

```bash
# 1. 克隆仓库
git clone https://github.com/yourusername/petkit-ha.git
cd petkit-ha

# 2. 运行设置脚本
chmod +x scripts/setup.sh
./scripts/setup.sh

# 3. 选择选项 5) 完整设置
```

脚本会自动：
- ✅ 安装 Node.js（如果未安装）
- ✅ 构建前端卡片
- ✅ 启动 HA Docker
- ✅ 复制集成到 HA 配置

---

#### 手动设置

**第 1 步：安装 Node.js**

```bash
# 检查是否已安装
node --version

# 如果未安装
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**第 2 步：构建前端**

```bash
cd card
npm install
npm run build
```

**第 3 步：启动 HA Docker**

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  -e TZ=Asia/Shanghai \
  -v /tmp/hass-config:/config \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

**第 4 步：复制集成**

```bash
sudo cp -r custom_components/petkit_solo /tmp/hass-config/custom_components/
sudo cp card/dist/petkit-solo-card.js /tmp/hass-config/www/
docker restart homeassistant
```

**第 5 步：访问 HA**

浏览器打开：http://localhost:8123

---

### 开发工作流

1. **编辑代码** - VS Code 直接编辑项目文件
2. **构建前端** - `cd card && npm run build`
3. **复制集成** - `sudo cp -r custom_components/petkit_solo /tmp/hass-config/custom_components/`
4. **重启 HA** - `docker restart homeassistant`
5. **测试功能** - 浏览器访问 http://localhost:8123

---

### 项目结构

```
petkit-ha/
├── custom_components/petkit_solo/   # HA 集成
│   ├── api/                         # 小佩 API 封装
│   ├── translations/                # 多语言文件
│   └── ...
├── card/                            # Lovelace 卡片
│   ├── src/
│   └── dist/
└── ...
```

### 运行测试

```bash
# 后端测试
pytest tests/

# 前端测试
cd card
yarn test
```

## 📖 参考资料

- [Home Assistant 集成开发文档](https://developers.home-assistant.io/docs/creating_integration_index)
- [HACS 发布文档](https://www.hacs.xyz/docs/publish/)
- [Lovelace 卡片开发](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)
- [py-petkit-api](https://github.com/Jezza34000/py-petkit-api)

## ⚠️ 注意事项

- 本项目非小佩官方产品，与小佩公司无关
- API 可能随时变更，导致功能失效
- 请勿用于商业用途
- 账号信息安全由 HA 加密存储

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

## 🙏 致谢

- 感谢 [py-petkit-api](https://github.com/Jezza34000/py-petkit-api) 的 API 逆向工作
- 感谢 [home-assistant-petkit](https://github.com/RobertD502/home-assistant-petkit) 的架构参考
- 感谢 Home Assistant 和 HACS 社区

---

**Made with ❤️ by 小姬 & 主人**
