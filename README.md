# 🌌 Mind Gallery · Persona Sphere

> 将文本转化为可交互的三维人格星系的实验性 Web 应用

---

## 1. 项目简介

**Mind Gallery（Persona Sphere）** 是一款基于 **Three.js + React** 的交互式可视化应用，用于将用户输入的文本（如日记、情绪记录）解析并映射为一个三维“人格星系”。

系统通过本地启发式文本分析（可选接入 Google Gemini），估计多维人格特征，并以 3D 形式呈现其结构与变化。

---

## 2. 核心功能

- **3D 星系可视化**
  - Timeline Mode：按时间顺序展示文本演化
  - Humanoid Mode：将记忆节点聚合为人格形态
- **多维人格估计**
  - 外向性、情绪性、亲和力、责任感、自信度
- **Grafting Studio**
  - 在正式记录前模拟文本对人格结构的潜在影响
- **隐私优先**
  - 所有分析与渲染均在浏览器本地完成

---

## 3. 运行环境要求

- **Node.js**：v18 或更高（推荐 LTS）
- **Git**：用于克隆仓库（或使用 ZIP 下载）

---

## 4. 快速开始（完整使用教程）

### Step 1：安装 Node.js

1. 访问：https://nodejs.org/
2. 下载并安装 **LTS 版本**
3. 安装完成后，在终端中验证：
node -v

### Step 2：第二步：获取项目代码 (Clone)
# 将项目克隆到本地
git clone https://github.com/你的用户名/mind-gallery.git

# 进入项目文件夹
cd mind-gallery

### Step 3：安装依赖
npm install

### Step 4：配置 AI 大脑 (API Configuration - 可选)
如果你想获得更深层的人格洞察，可以配置 Google Gemini：

前往 Google AI Studio 申请免费密钥。

在项目根目录下手动创建一个文件，重命名为 .env.local。

用记事本打开它，粘贴以下内容：
GEMINI_API_KEY=你的密钥

### Step 5：正式启动 (Run)
启动命令：在终端输入 npm run dev。

访问链接：终端会显示 Local: http://localhost:3000/。

进入应用：按住键盘上的 Ctrl (Windows) 或 Command (Mac) 并用鼠标点击这个链接，或者直接在浏览器地址栏输入 localhost:3000。

