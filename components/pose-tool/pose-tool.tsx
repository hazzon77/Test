import { Maximize2, X } from "lucide-react"
import { RightPanel } from "./right-panel"

export function PoseTool() {
  return (
    <div className="tool-window flex h-[min(92vh,900px)] w-[min(92vw,1440px)] flex-col overflow-hidden rounded-2xl border border-tool-border bg-tool-panel text-tool-text shadow-2xl">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-tool-border px-7">
          <h1 className="text-[16px] font-semibold tracking-[-0.01em] text-tool-text">3D 摆位</h1>
          <div className="flex items-center gap-5">
            <span className="text-[13px] text-tool-muted">4人 · 俯视 · 35mm</span>
            <button type="button" aria-label="全屏" className="text-tool-muted hover:text-tool-text">
              <Maximize2 className="h-4 w-4" />
            </button>
            <button type="button" aria-label="关闭" className="text-tool-muted hover:text-tool-text">
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Body: viewport + scrollable right panel */}
        <div className="flex min-h-0 flex-1 gap-4 bg-tool-panel-2 p-4">
          <div className="relative min-w-0 flex-1 overflow-hidden rounded-xl bg-tool-viewport">
            <img
              src="/viewport-scene.png"
              alt="3D 摆位视口，俯视角下三个人台站在网格地面上"
              className="h-full w-full object-cover"
            />
          </div>
          <RightPanel />
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-tool-border px-7 py-5">
          <p className="max-w-5xl text-[12px] leading-5 text-tool-muted">
            拖黄点 = 摆关节，拖绿点 = 抬离地面，拖人物 = 挪位；Shift 拖 = 转朝向，滚轮 = 推拉，L = 锁定视角。摆位图落入素材库，可连生成节点
            <strong className="font-medium text-tool-text">原样提交</strong>
            作参考图 —— 擅长表达人数与站位，姿势精度不作承诺。最多 8 个人物。
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] text-tool-muted">4人 · 俯视 · 35mm</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="h-9 rounded-md border border-tool-border bg-tool-panel px-5 text-[13px] text-tool-text hover:bg-black/[0.03]"
              >
                取消
              </button>
              <button
                type="button"
                className="h-9 rounded-md bg-tool-primary px-5 text-[13px] font-medium text-white hover:bg-tool-primary-hover"
              >
                渲染为新素材
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
