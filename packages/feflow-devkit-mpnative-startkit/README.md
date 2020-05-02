# mpnative-startkit 开发套件

本项目是 generator-mpnative-startkit 的开发套件，基于 feflow 开发，使用 gulp。

## 基本说明

支持原生小程序使用 typescript 和 less 语法编写，当然也可以不用。

生成后的代码是在 `./dist` 目录下，所以 `project.config.json` 里的 `miniprogramRoot` 是指向 `dist` 的。

## 使用

如果是通过 **feflow** 安装 `generator-mpnative-startkit` 生成的脚手架，无需重复安装。

### 安装

```bash
npm i feflow-devkit-mpnative-startkit -D
```

### 使用

```bash
# 开发
fef dev

# 打包
fef build
```
