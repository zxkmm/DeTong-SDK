#  使用文档

## 1. 安装SDK接口包

```bash
sudo dpkg -i dtpweb-2.1.20XXXXXX-XXX.deb
```

## 2. 安装gcc/g++ cmake等开发环境

```bash
#
sudo apt install gcc
#
sudo apt install g++
#
sudo apt install gdb
#
sudo apt install cmake
# 安装依赖项 libcurl4 或者 libcurl4-openssl
sudo apt install libcurl4
```

## 3. 编译demo

```bash
# 创建编译后的生成文件存放的位置
mkdir build
cd build
# 运行cmake，生成 MakeFile
cmake ..
# 运行makefile, 编译代码
make
```

## 4. 插上打印机，运行demo

```bash
sudo ./ctest
```

