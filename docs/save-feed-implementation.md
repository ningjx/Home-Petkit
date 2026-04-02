# save_feed 服务实现总结

## 修改时间
2026-04-02

## 修改内容

### 1. 服务合并
将 `add_feeding_item` 和 `update_feeding_item` 合并为新的 `save_feed` 服务，支持批量保存喂食计划。

### 2. 参数设计
- **days**: 字符串格式，如 `"1,2,3,4,5,6,7"`，表示要更新的周天
- **items**: 完整的计划列表，会完全替换指定周天的计划
- 移除了 `day` 和 `sync_all_days` 参数

---

## 后端修改

### 2.1 services/schemas.py
新增 `SAVE_FEED_SCHEMA`:
```python
SAVE_FEED_SCHEMA = vol.Schema({
    vol.Optional("entry_id"): cv.string,
    vol.Required("days"): cv.string,  # "1,2,3,4,5,6,7" 格式
    vol.Required("items"): vol.All(
        cv.ensure_list,
        [
            vol.Schema({
                vol.Required("time"): cv.string,
                vol.Required("amount"): vol.All(vol.Coerce(int), vol.Range(min=1, max=100)),
                vol.Optional("name", default=""): cv.string,
                vol.Optional("enabled", default=True): cv.boolean,
            })
        ]
    ),
})
```

### 2.2 services/feeding.py
- 添加 `days` 参数解析逻辑（字符串 → 列表）
- 注册 `save_feed` 服务

### 2.3 devices/base.py
添加抽象方法:
```python
async def save_feed(
    self,
    days: list[int],
    items: list[dict],
    api_client: Any,
) -> bool:
    """保存喂食计划（批量）."""
    raise NotImplementedError(f"{self.model_name} 不支持保存喂食计划")
```

### 2.4 devices/d4.py
实现 `save_feed` 方法:
- 转换时间格式（HH:MM → 秒数）
- 按时间排序
- 为每个周天构建计划
- 调用 API (d4/saveFeed)

### 2.5 coordinator.py
添加调用方法:
```python
async def save_feed(
    self,
    days: list[int],
    items: list[dict],
) -> bool:
    """保存喂食计划（批量）."""
```

---

## 前端修改

### 3.1 services/plan.ts
添加 `saveFeed` 函数:
```typescript
export async function saveFeed(
  hass: HomeAssistant,
  items: Array<{ time: string; amount: number; name: string; enabled?: boolean }>,
  days: string = "1,2,3,4,5,6,7",
  pendingChanges?: Map<string, PendingChange>,
  onSuccess?: () => void,
  onError?: (error: any) => void
): Promise<void>
```

### 3.2 petkit-feeder-card.ts
- 导入 `saveFeed` 函数
- 修改 `_doSavePendingChanges` 方法，调用批量保存
- 新增 `_saveAllPendingChanges` 方法:
  - 获取现有计划
  - 合并待提交变更
  - 去重和排序
  - 调用批量保存服务
- 新增 `_parseTimeToSeconds` 辅助方法
- 移除 `_updateExistingItem` 和 `_saveNewItem` 方法

---

## 服务对比

| 特性 | 旧方案 | 新方案 |
|-----|--------|--------|
| 服务名称 | add_feeding_item + update_feeding_item | save_feed |
| 参数格式 | day: int + sync_all_days: bool | days: str |
| 调用次数 | 每次修改调用一次 | 批量修改一次调用 |
| 扩展性 | 只支持整周/单天 | 支持任意周天组合 |

---

## 使用示例

### 前端调用
```typescript
await hass.callService('petkit_feeder', 'save_feed', {
  days: "1,2,3,4,5,6,7",
  items: [
    { time: "06:00", amount: 10, name: "早餐", enabled: true },
    { time: "12:00", amount: 15, name: "午餐", enabled: true },
    { time: "18:00", amount: 10, name: "晚餐", enabled: false },
  ]
});
```

### 后端处理流程
```
前端调用 → Schema验证 → 解析days → Coordinator.save_feed → 
D4Device.save_feed → 构建feed_daily_list → API调用 → 刷新数据
```

---

## 保留的服务

- `add_feeding_item` - 保留（向后兼容）
- `update_feeding_item` - 保留（向后兼容）
- `remove_feeding_item` - 保留（单独删除场景）
- `toggle_feeding_item` - 保留（快速切换状态）

---

## 测试结果

✅ 前端编译成功（npm run build）
✅ 后端语法检查通过（python -m py_compile）

---

## 后续优化

1. **移除旧服务**：确认新服务稳定后，可移除 `add_feeding_item` 和 `update_feeding_item`
2. **前端UI选项**：支持用户选择同步范围（整周/工作日/周末）
3. **性能优化**：考虑添加缓存机制
4. **错误处理**：增强错误提示和重试机制

---

## 注意事项

1. **时间格式一致性**：前端 HH:MM，后端转换为秒数
2. **去重逻辑**：使用时间作为唯一标识
3. **排序**：后端按时间排序后再保存
4. **enabled字段**：新增字段，用于控制计划启用/禁用状态