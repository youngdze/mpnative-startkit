# 原生小程序初始框架

对接 omix，支持 ts 和 less。

## 安装

在安装之前，确保你本地已经安装好了 nodejs，具体可以看[官网介绍](https://nodejs.org/)。

### 使用 feflow

安装 feflow：
```bash
npm install @feflow/cli -g
```

安装 generator：
```bash
fef install generator-mpnative-startkit
```

生成新项目，请选择 **原生小程序初始框架...**：
```bash
fef init
```

之后填好相关参数就可以了。

## 开发

本地开发：
```bash
fef dev
```

打包：
```bash
fef build
```

## TODO

- [x] 支持 typescript
- [x] 支持 less
- [x] 通过 omix 做状态管理
- [x] 支持 weui
- [ ] 支持 sass
- [ ] 自动化流程(Github Actions)
