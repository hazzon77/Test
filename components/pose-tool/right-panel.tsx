"use client"

import { useState } from "react"
import {
  Plus,
  Trash2,
  User,
  Lock,
  PersonStanding,
  Armchair,
  Camera,
  Sun,
  Palette,
  type LucideIcon,
} from "lucide-react"
import { Chip, ChipGrid, ExpandableChips, GroupLabel, SectionNote, SubLabel, ToolSlider } from "./controls"
import { cn } from "@/lib/utils"

const characters = ["人物1", "人物2", "人物3", "人物4"]

const appearances = [
  "高瘦青年",
  "方脸壮青年",
  "中年结实 Polo",
  "中年圆润",
  "长发瘦青年",
  "马尾少女",
  "齐刘海长发",
  "中年短鲍伯",
  "基准人台",
]

const poses = [
  "站立",
  "坐下",
  "行走",
  "稍息",
  "抱臂",
  "叉腰",
  "指向",
  "挥手",
  "席地",
  "盘腿",
  "前倾坐",
  "跪坐",
  "仰卧",
  "仰卧屈膝",
  "俯卧",
  "侧卧",
  "侧卧撑头",
  "奔跑",
  "蹲下",
  "跳跃",
  "上台阶",
  "举手取物",
  "推",
  "后仰",
  "抱物",
  "投掷",
  "张手说话",
  "倾听",
  "耸肩",
  "鞠躬",
  "沉思",
  "欢呼",
]

const colors = ["红", "蓝", "黄", "绿", "紫", "灰", "青", "粉"]

const scenePresets = [
  "单人",
  "双人对话",
  "并肩",
  "单人特写",
  "单人侧卧",
  "一站一坐",
  "对峙",
  "一讲一听",
  "三人同框",
  "一卧二立",
  "三人围谈",
  "四人一排",
]

const lightPresets = ["经典三点光", "单侧硬光", "夜景冷光", "柔光箱正面", "伦勃朗", "逆光轮廓", "黄昏暖阳", "青橙对冲"]

const props = ["圆桌", "长桌", "椅子", "圆凳", "沙发", "书架", "单人床", "柜子", "门洞", "方块", "圆柱", "隔板"]

const focalLengths = ["12", "16", "20", "24", "28", "35", "50", "85", "105", "135", "200", "300"]

type TabKey = "role" | "pose" | "scene" | "camera" | "light" | "style"

const tabs: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: "role", label: "人物", icon: User },
  { key: "pose", label: "姿势", icon: PersonStanding },
  { key: "scene", label: "场景", icon: Armchair },
  { key: "camera", label: "镜头", icon: Camera },
  { key: "light", label: "光影", icon: Sun },
  { key: "style", label: "出图", icon: Palette },
]

export function RightPanel() {
  const [tab, setTab] = useState<TabKey>("role")

  const [activeChar, setActiveChar] = useState("人物4")
  const [pose, setPose] = useState("站立")
  const [color, setColor] = useState("绿")
  const [appearance, setAppearance] = useState("高瘦青年")
  const [preset, setPreset] = useState<string | null>(null)
  const [lightPreset, setLightPreset] = useState<string | null>(null)
  const [focal, setFocal] = useState("35")
  const [view, setView] = useState<string | null>("俯视")
  const [style, setStyle] = useState("写实人台")

  const [ground, setGround] = useState(0)
  const [ambient, setAmbient] = useState(62)
  const [focalRange, setFocalRange] = useState(35)
  const [dolly, setDolly] = useState(45)

  const [jointLimit, setJointLimit] = useState(true)
  const [jointPoint, setJointPoint] = useState(true)
  const [nameScope, setNameScope] = useState<string | null>(null)
  const [centerFrame, setCenterFrame] = useState(true)
  const [keepFrame, setKeepFrame] = useState(true)

  return (
    <div className="flex w-[340px] shrink-0 flex-col rounded-xl border border-tool-border bg-tool-panel">
      {/* 顶部横向标签栏 */}
      <nav className="grid shrink-0 grid-cols-6 border-b border-tool-border px-2 pt-1">
        {tabs.map((t) => {
          const active = t.key === tab
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={active}
              className={cn(
                "relative flex flex-col items-center gap-1.5 py-3 transition-colors",
                active ? "text-tool-primary" : "text-tool-muted hover:text-tool-text",
              )}
            >
              <t.icon className="h-[18px] w-[18px]" />
              <span className="text-[11px] leading-none">{t.label}</span>
              {active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-tool-primary" />}
            </button>
          )
        })}
      </nav>

      {/* 人物切换条 —— 常驻 */}
      <div className="shrink-0 border-b border-tool-border px-5 py-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wide text-tool-muted">当前人物 · 4/8</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md text-tool-muted hover:bg-black/[0.04] hover:text-tool-text"
              aria-label="添加人物"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md text-tool-muted hover:bg-black/[0.04] hover:text-tool-text"
              aria-label="删除人物"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          {characters.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveChar(c)}
              className={cn(
                "flex h-9 flex-1 items-center justify-center rounded-md border text-[12px] transition-colors",
                c === activeChar
                  ? "border-tool-sel-border bg-tool-sel-bg text-tool-sel-text"
                  : "border-tool-border bg-tool-panel text-tool-text hover:bg-black/[0.03]",
              )}
            >
              {c.replace("人物", "")}
            </button>
          ))}
        </div>
      </div>

      {/* 分类内容 */}
      <div className="tool-scroll min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {tab === "role" && (
          <>
            <GroupLabel>
              {activeChar} 离地 {(ground / 100).toFixed(2)} 米
            </GroupLabel>
            <ToolSlider value={ground} min={0} max={100} onChange={setGround} />
            <button
              type="button"
              className="mt-1.5 text-[12px] text-tool-muted hover:text-tool-text"
              onClick={() => setGround(0)}
            >
              站回地面
            </button>

            <GroupLabel className="mt-7">形象 · {appearance}</GroupLabel>
            <ExpandableChips items={appearances} selected={appearance} onSelect={setAppearance} cols={2} visible={4} />

            <GroupLabel className="mt-7">头顶名字牌（最多 12 字）</GroupLabel>
            <input
              type="text"
              maxLength={12}
              placeholder="例如：阿强"
              className="h-9 w-full rounded-md border border-tool-border bg-tool-panel px-3 text-[13px] text-tool-text outline-none placeholder:text-tool-muted focus:border-tool-sel-border"
            />
            <div className="mt-2">
              <ChipGrid cols={3}>
                {["只在画布", "画布+渲染", "只在渲染"].map((s) => (
                  <Chip key={s} selected={s === nameScope} onClick={() => setNameScope(s)} className="px-1 text-[12px]">
                    {s}
                  </Chip>
                ))}
              </ChipGrid>
            </div>

            <GroupLabel className="mt-7">关节（已微调 6 个）</GroupLabel>
            <ChipGrid cols={3}>
              <Chip selected={jointLimit} onClick={() => setJointLimit((v) => !v)} className="px-1 text-[12px]">
                限位·{jointLimit ? "开" : "关"}
              </Chip>
              <Chip selected={jointPoint} onClick={() => setJointPoint((v) => !v)} className="px-1 text-[12px]">
                关节点·{jointPoint ? "开" : "关"}
              </Chip>
              <Chip className="px-1 text-[12px]">镜像</Chip>
            </ChipGrid>
            <button type="button" className="mt-2 text-[12px] text-tool-muted hover:text-tool-text">
              退回预设
            </button>
          </>
        )}

        {tab === "pose" && (
          <>
            <GroupLabel>
              {activeChar} 的姿势 · {pose}
            </GroupLabel>
            <ExpandableChips items={poses} selected={pose} onSelect={setPose} cols={3} visible={9} />

            <GroupLabel className="mt-7">
              {activeChar} 的颜色 · {color}
            </GroupLabel>
            <div className="flex flex-wrap gap-1.5">
              {colors.map((c) => (
                <Chip key={c} selected={c === color} onClick={() => setColor(c)} className="h-8 w-10 px-0 text-[12px]">
                  {c}
                </Chip>
              ))}
            </div>
          </>
        )}

        {tab === "scene" && (
          <>
            <GroupLabel>整场景预设</GroupLabel>
            <ExpandableChips items={scenePresets} selected={preset} onSelect={setPreset} cols={2} visible={4} />

            <GroupLabel className="mt-7">道具 · 0/12</GroupLabel>
            <SectionNote>白模家具尺寸是真的（餐桌 0.75m、座高 0.43m），拖它挪位、Shift 拖转朝向。</SectionNote>
            <ExpandableChips items={props} cols={2} visible={4} />

            <GroupLabel className="mt-7">场景底图</GroupLabel>
            <SectionNote>导一张场景照片进来，人台就能站到照片的地板上，铸造出图时它也在。</SectionNote>
            <button
              type="button"
              className="h-10 w-full rounded-md border border-tool-border bg-tool-panel text-[13px] text-tool-text hover:bg-black/[0.03]"
            >
              导入照片
            </button>
          </>
        )}

        {tab === "camera" && (
          <>
            <GroupLabel>自由视角（导演位）</GroupLabel>
            <ChipGrid cols={2}>
              <Chip selected={view === "平视"} onClick={() => setView("平视")}>
                平视
              </Chip>
              <Chip selected={view === "俯视"} onClick={() => setView("俯视")}>
                俯视
              </Chip>
              <Chip selected={view === "特写"} onClick={() => setView("特写")}>
                特写
              </Chip>
              <Chip className="text-tool-muted">
                <Lock className="h-3.5 w-3.5" />
              </Chip>
            </ChipGrid>
            <div className="mt-2">
              <Chip selected={centerFrame} onClick={() => setCenterFrame((v) => !v)} className="w-full px-3">
                居中取景
              </Chip>
            </div>

            <SubLabel>焦段 {focal}mm · 街拍纪实</SubLabel>
            <ExpandableChips
              items={focalLengths}
              selected={focal}
              onSelect={setFocal}
              cols={5}
              visible={10}
              chipClassName="px-0"
            />
            <GroupLabel className="mt-6">连续 12-300mm</GroupLabel>
            <ToolSlider value={focalRange} min={12} max={300} onChange={setFocalRange} />
            <div className="mt-2">
              <Chip selected={keepFrame} onClick={() => setKeepFrame((v) => !v)} className="w-full px-3">
                换焦保框幅·{keepFrame ? "开" : "关"}
              </Chip>
            </div>

            <GroupLabel className="mt-7">机位距离 · 推拉 {(dolly / 10).toFixed(1)} 米</GroupLabel>
            <ToolSlider value={dolly} min={0} max={100} onChange={setDolly} />

            <GroupLabel className="mt-7">镜头表 · 0/6</GroupLabel>
            <SectionNote>加一台摄影机就能从它的角度单独截取，多台一起就是同场景的多视角。</SectionNote>
            <ChipGrid cols={2}>
              <Chip className="text-tool-sel-text">
                <Plus className="mr-1 h-3.5 w-3.5" /> 加摄影机
              </Chip>
              <Chip>进镜头·关</Chip>
            </ChipGrid>
          </>
        )}

        {tab === "light" && (
          <>
            <GroupLabel>灯光 · 0/6（投影 0/2）</GroupLabel>
            <SectionNote>现在用的是出厂摄影棚（主光 + 冷补光 + 环境光）。具现可编辑的灯即可自己打光。</SectionNote>
            <ChipGrid cols={3}>
              <Chip className="px-1 text-[12px] text-tool-sel-text">
                <Plus className="mr-0.5 h-3.5 w-3.5" /> 加灯
              </Chip>
              <Chip selected className="px-1 text-[12px]">
                出厂灯
              </Chip>
              <Chip className="px-1 text-[12px]">全部关</Chip>
            </ChipGrid>

            <GroupLabel className="mt-7">环境光 {(ambient / 100).toFixed(2)}</GroupLabel>
            <ToolSlider value={ambient} onChange={setAmbient} />

            <GroupLabel className="mt-7">布光预设</GroupLabel>
            <ExpandableChips
              items={lightPresets}
              selected={lightPreset}
              onSelect={setLightPreset}
              cols={2}
              visible={4}
              chipClassName="px-1 text-[12px]"
            />
          </>
        )}

        {tab === "style" && (
          <>
            <GroupLabel>出图画风（视口恒显示人台）</GroupLabel>
            <ChipGrid cols={2}>
              {["写实人台", "骨架线", "明暗体块", "撤销"].map((s) => (
                <Chip key={s} selected={s === style} onClick={() => setStyle(s)}>
                  {s}
                </Chip>
              ))}
            </ChipGrid>
            <button type="button" className="mt-3 text-[12px] text-tool-muted hover:text-tool-text">
              重做
            </button>
          </>
        )}
      </div>
    </div>
  )
}
