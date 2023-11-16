# 设置cmake最小版本
cmake_minimum_required(VERSION 3.0)

# 项目名称
project(ctest)

set(TEST_SRC_LIST main.c)
# 设置输出目标
set(TEST_TARGET ctest)

# 查找LPAPI模块
find_package(LPAPI REQUIRED)

message("${TEST_TARGET}---------LPAPI_FOUND = ${LPAPI_FOUND}")
message("${TEST_TARGET}---------LPAPI_INCLUDE_DIR = ${LPAPI_INCLUDE_DIR}")
message("${TEST_TARGET}---------LPAPI_INCLUDE_DIRS = ${LPAPI_INCLUDE_DIRS}")
message("${TEST_TARGET}---------LPAPI_LIBRARY = ${LPAPI_LIBRARY}")
message("${TEST_TARGET}---------LPAPI_LIBRARIES = ${LPAPI_LIBRARIES}")

# 生成可执行测试文件；
add_executable(${TEST_TARGET} ${TEST_SRC_LIST})
# 配置LPAPI头文件及依赖关系
if(LPAPI_FOUND)
    target_include_directories(${TEST_TARGET} PRIVATE ${LPAPI_INCLUDE_DIR})
    target_link_libraries(${TEST_TARGET} ${LPAPI_LIBRARY})
else(LPAPI_FOUND)
    target_include_directories(${TEST_TARGET} PRIVATE ../lpapi/include)
    target_link_libraries(${TEST_TARGET} lpapi)
endif(LPAPI_FOUND)

# 添加调试模式
if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    # 预处理器定义，添加调试模式
    target_compile_definitions(${TEST_TARGET} PRIVATE DEBUG)
endif()
