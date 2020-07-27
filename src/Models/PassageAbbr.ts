import { PassageAbout } from "./PassageAbout";

export default interface PassageAbbr {
  identifier: string
  title: string
  abbr: string
  about: PassageAbout
}

export const demoPassageAbbrs = [
  {
    identifier: "0",
    title: "利用快速傅立叶转换求卷积",
    abbr: "卷积可以说是图像处理中最基本的操作。线性滤波通过不同的卷积核，可以产生很多不同的效果。假如有一个要处理的二维图像，通过二维的滤波矩阵（卷积核），对于图像的每一个像素点，计算它的领域像素和滤波器矩阵的对应元素的乘积，然后累加，作为该像素位置的值。关于图像卷积和滤波的一些知识点可以参考这篇博客。",
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60
    }
  },
  {
    identifier: "1",
    title: "[译]使用Three.js制作有粘稠感的图像悬停效果",
    abbr:   "作为Flash的替代者WebGL在近几年随着像Three.js, PIXI.js, OGL.js这样的库而变得越来越火。它们对于创建空白板非常有用，唯一的限制只有你的想象力。我们看到越来越多的WebGL创建的效果微妙地集成到交互界面中，以进行悬停，滚动或显示效果。比如 Hello Monday 或者是 cobosrl.co.",
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60
    }
  },
  {
    identifier: "2",
    title: "编写自己的 GitHub Action，体验自动化部署",
    abbr:   "GitHub Services 是 GitHub 官方推出的持续集成/部署模块服务（CI/CD），和 jenkins、Travis CI 是同一类产品定位。",
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60
    }
  },
  {
    identifier: "3",
    title: "文言文编程火了!!",
    abbr:   "GitHub Services 是 GitHub 官方推出的持续集成/部署模块服务（CI/CD），和 jenkins、Travis CI 是同一类产品定位。",
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60
    }
  },
  {
    identifier: "4",
    title: "[译]使用Three.js制作有粘稠感的图像悬停效果",
    abbr:   "作为Flash的替代者WebGL在近几年随着像Three.js, PIXI.js, OGL.js这样的库而变得越来越火。它们对于创建空白板非常有用，唯一的限制只有你的想象力。我们看到越来越多的WebGL创建的效果微妙地集成到交互界面中，以进行悬停，滚动或显示效果。比如 Hello Monday 或者是 cobosrl.co.",
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60
    }
  },
  {
    identifier: "5",
    title: "编写自己的 GitHub Action，体验自动化部署",
    abbr:   "GitHub Services 是 GitHub 官方推出的持续集成/部署模块服务（CI/CD），和 jenkins、Travis CI 是同一类产品定位。",
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60
    }
  },
]
