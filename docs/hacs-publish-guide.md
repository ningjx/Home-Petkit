# HACS 发布指南

## 当前状态

你的项目已具备发布集成到 HACS 的基本条件。

### 已有的文件

| 文件 | 状态 |
|------|------|
| `hacs.json` | ✅ 已创建 |
| `manifest.json` | ✅ 已创建 |
| `brand/icon.png` | ✅ 已创建 |
| `README.md` | ✅ 已创建 |

---

## 发布前准备

### 1. 更新 manifest.json

已在 `manifest.json` 中配置：

```json
{
  "domain": "petkit_feeder",
  "name": "小佩喂食器",
  "codeowners": ["@ningjx"],
  "config_flow": true,
  "documentation": "https://github.com/ningjx/petkit-feeder",
  "iot_class": "cloud_polling",
  "issue_tracker": "https://github.com/ningjx/petkit-feeder/issues",
  "requirements": ["m3u8>=3.0.0"],
  "version": "1.0.0"
}
```

### 2. GitHub 仓库设置

在 GitHub 仓库页面：

1. **添加描述**（About → Description）
   ```
   小佩智能喂食器 Home Assistant 集成
   ```

2. **添加 Topics**（About → Topics）
   ```
   home-assistant, homeassistant, petkit, feeder, hacs, custom-component
   ```

3. **创建 License 文件**
   - Settings → Community standards → Add LICENSE
   - 选择 MIT License

### 3. 发布 Release

```bash
# 打标签
git tag v1.0.0

# 推送标签
git push origin v1.0.0
```

然后在 GitHub：
- Releases → Draft a new release
- 选择标签 `v1.0.0`
- 填写 Release title：`v1.0.0`
- 填写描述：
  ```
  ## 新功能
  - 喂食计划管理
  - 喂食历史记录
  - 手动喂食
  - Lovelace 卡片
  ```

---

## 提交到 HACS

### 方法 1：官方商店（推荐）

1. Fork [hacs/integration](https://github.com/hacs/integration)
2. 编辑 `custom_components_list.json`，添加仓库：
   ```json
   "ningjx/petkit-feeder"
   ```
3. 创建 Pull Request

### 方法 2：用户手动添加

用户在 HACS 中：
1. HACS → 集成 → 探索与下载仓库
2. 点击右上角 "..."
3. 选择 "自定义仓库"
4. 输入仓库地址：`https://github.com/ningjx/petkit-feeder`
5. 类别选择 "集成"
6. 点击 "添加"

---

## 卡片发布（可选）

如果想把卡片也发布到 HACS，需要创建独立仓库：

1. 创建新仓库，名称以 `lovelace-` 开头
   ```
   lovelace-petkit-feeder-card
   ```

2. 目录结构：
   ```
   lovelace-petkit-feeder-card/
   ├── dist/
   │   └── petkit-feeder-card.js  # 构建后的 JS 文件
   ├── README.md
   └── hacs.json
   ```

3. `hacs.json`：
   ```json
   {
     "name": "小佩喂食器卡片",
     "filename": "petkit-feeder-card.js",
     "content_in_root": false
   }
   ```

---

## 发布流程总结

```
┌─────────────────────────────────────────────────────────────┐
│  1. 更新 manifest.json（GitHub URL）                        │
│  2. GitHub 仓库添加描述和 Topics                            │
│  3. 添加 LICENSE 文件                                       │
│  4. 创建 Release (git tag + GitHub Release)                 │
│  5. 提交到 hacs/integration 或让用户手动添加                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 检查清单

- [ ] manifest.json 的 documentation 和 issue_tracker 是正确 URL
- [ ] GitHub 仓库有描述
- [ ] GitHub 仓库有 Topics
- [ ] 有 LICENSE 文件
- [ ] 发布了第一个 Release
- [ ] hacs.json 在仓库根目录

完成以上步骤后，你的集成就可以通过 HACS 安装了。