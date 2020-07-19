export const mdHtml =
  "<h1 id=\"-\">卷积运算</h1>\n" +
  "<p>卷积可以说是图像处理中最基本的操作。线性滤波通过不同的卷积核，可以产生很多不同的效果。假如有一个要处理的二维图像，通过二维的滤波矩阵（卷积核），对于图像的每一个像素点，计算它的领域像素和滤波器矩阵的对应元素的乘积，然后累加，作为该像素位置的值。关于图像卷积和滤波的一些知识点可以参考这篇博客。</p>\n" +
  "<p>下面是通过python模拟实现的图像卷积操作，模拟了sobel算子，prewitt算子和拉普拉斯算子。python的np包中有convolve函数可以直接调用，scipy中也有scipy.signal.convolve函数可以直接调用。</p>\n" +
  "<pre><code class=\"lang-python\"><span class=\"hljs-meta\"># 经过卷积操作后得到的新的图像的尺寸</span>\n" +
  "<span class=\"hljs-keyword\">new</span><span class=\"hljs-type\">_h</span> = height - h + <span class=\"hljs-number\">1</span>\n" +
  "<span class=\"hljs-keyword\">new</span><span class=\"hljs-type\">_w</span> = width - w + <span class=\"hljs-number\">1</span>\n" +
  "<span class=\"hljs-meta\"># 对新的图像矩阵进行初始化</span>\n" +
  "<span class=\"hljs-keyword\">new</span><span class=\"hljs-type\">_image</span> = np.zeros((<span class=\"hljs-keyword\">new</span><span class=\"hljs-type\">_h</span>, <span class=\"hljs-keyword\">new</span><span class=\"hljs-type\">_w</span>), dtype=np.float)\n" +
  "</code></pre>\n" +
  "<p>卷积可以说是图像处理中最基本的操作。线性滤波通过不同的卷积核，可以产生很多不同的效果。假如有一个要处理的二维图像，通过二维的滤波矩阵（卷积核），对于图像的每一个像素点，计算它的领域像素和滤波器矩阵的对应元素的乘积，然后累加，作为该像素位置的值。关于图像卷积和滤波的一些知识点可以参考这篇博客。</p>\n" +
  "<p>下面是通过python模拟实现的图像卷积操作，模拟了sobel算子，prewitt算子和拉普拉斯算子。python的np包中有convolve函数可以直接调用，scipy中也有scipy.signal.convolve函数可以直接调用。</p>\n" +
  "<p><img src=\"../Images/wechat-qr.png\" alt=\"\"></p>\n" +
  "<p>卷积可以说是图像处理中最基本的操作。线性滤波通过不同的卷积核，可以产生很多不同的效果。假如有一个要处理的二维图像，通过二维的滤波矩阵（卷积核），对于图像的每一个像素点，计算它的领域像素和滤波器矩阵的对应元素的乘积，然后累加，作为该像素位置的值。关于图像卷积和滤波的一些知识点可以参考这篇博客。</p>\n" +
  "<p>下面是通过python模拟实现的图像卷积操作，模拟了sobel算子，prewitt算子和拉普拉斯算子。python的np包中有convolve函数可以直接调用，scipy中也有scipy.signal.convolve函数可以直接调用。</p>"