
from dtpweb import DTPWeb, LPA_QREccLevel
import time

#
DATA_PNG = "data:image/png;base64,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"

printers = []

api = DTPWeb()


def get_printers():
    """
    获取打印机测试
    """
    items = api.get_printers()
    printers.clear()
    print("打印机列表：")
    if items and len(items) > 0:
        for item in items:
            printers.append(item)
            print(item)
    else:
        print("未见测到打印机")


def print_text():
    """
    字符串打印测试
    """
    text1 = "德佟电子科技（上海）有限公司"
    text2 = "https:#www.detonger.com"
    label_width = 45
    label_height = 30
    font_size = 4
    item_height = label_height * 0.5
    # 打开打印机
    if api.open_printer(**printers[0]):
        # 创建打印任务，指定标签纸大小。
        api.start_job(label_width, label_height)

        # 绘制字符串
        api.draw_text(text1)
        # 设置字体
        api.draw_text(text2, y=item_height, width=label_width,
                      height=item_height, fontHeight=font_size)
        # 提交打印任务，开始打印
        api.commit_job()
    else:
        print("打印机链接失败！")
        return None
    # 关闭打印机
    api.close_printer()


def print_text_with_align():
    """
    字符串打印测试。
    """
    text = "德佟电子科技（上海）有限公司！"
    label_width = 45
    label_height = 60
    font_size = 4
    line_width = 0.4
    # 从上到下，分成四行，每一行显示不同的对齐方式
    line_height = label_height / 4.0
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(label_width, label_height):
        # 第一页，设置水平对齐方式
        # 绘制辅助边框
        api.draw_rect(0, 0, label_width, label_height, line_width)
        api.draw_line(0, line_height, label_width, line_height, line_width)
        api.draw_line(0, line_height * 2, label_width,
                      line_height * 2, line_width)
        api.draw_line(0, line_height * 3, label_width,
                      line_height * 3, line_width)
        # 默认水平靠左对齐
        api.draw_text(text, 0, 0, label_width, line_height, font_size)
        # 第二行，水平居中对齐
        api.draw_text(text, 0, line_height, label_width, line_height, font_size, fontStyle=1,
                      horizontalAlignment=1, verticalAlignment=1)
        # 第3行，水平靠右对齐
        api.draw_text(text, 0, line_height * 2, label_width, line_height, font_size, fontStyle=2,
                      horizontalAlignment=2, verticalAlignment=2)
        # 第4行，水平拉伸
        api.draw_text(text, 0, line_height * 3, label_width, line_height, font_size, fontStyle=3,
                      horizontalAlignment=3, verticalAlignment=3)
        # 提交打印任务，开始打印
        api.commit_job()
    # #
    api.close_printer()


def print_text_with_rotate():
    """
    字符串打印测试
    """
    text = "德佟电子科技（上海）有限公司！"
    label_width = 60
    label_height = 45
    half_width = label_width * 0.5
    half_height = label_height * 0.5
    line_width = 0.4
    font_size = 4
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(label_width, label_height, 90):
        # 绘制辅助线
        api.draw_rect(0, 0, label_width, label_height, line_width)
        api.draw_line(0, half_height, label_width, half_height, line_width)
        api.draw_line(half_width, 0, half_width, label_height, line_width)
        # 绘制字符串
        # 默认不旋转
        api.draw_text(text, 0, 0, half_width, half_height,
                      font_size, orientation=0)
        # 右转90度
        api.draw_text(text, half_width, 0, half_width,
                      half_height, font_size, orientation=1)
        # 180度旋转
        api.draw_text(text, 0, half_height, half_width,
                      half_height, font_size, orientation=2)
        # 左传90度
        api.draw_text(text, half_width, half_height,
                      half_width, half_height, font_size, orientation=3)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_barcode():
    """
    一维码打印测试
    """
    text = "detonger"
    label_width = 40
    label_height = 15
    text_height = 4
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(label_width, label_height):
        # 绘制一维码，一维码下面的字符串拉伸显示
        api.draw_barcode(text, 0, 0, label_width, label_height, text_height)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_qrcode():
    """
    二维码打印测试。
    """
    text = "德佟电子科技（上海）有限公司！"
    label_width = 40
    margin = 1
    cell_width = label_width * 0.5
    qrcode_width = cell_width - margin * 2
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(label_width, label_width):
        # 绘制辅助边框
        api.draw_rect(width=label_width, height=label_width, lineWidth=0.4)
        api.draw_line(y1=cell_width, x2=label_width)
        api.draw_line(x1=cell_width, y2=label_width)
        # 纠错级别为：L
        api.draw_qrcode(text, margin, margin, qrcode_width, eccLevel=LPA_QREccLevel.EccLevel_L.value,
                        horizontalAlignment=1, verticalAlignment=1)
        # 纠错级别为：M
        api.draw_qrcode(text, cell_width + margin, margin, qrcode_width, eccLevel=LPA_QREccLevel.EccLevel_M.value,
                        horizontalAlignment=1, verticalAlignment=1)
        # 纠错级别为：Q
        api.draw_qrcode(text, margin, cell_width + margin, qrcode_width, eccLevel=LPA_QREccLevel.EccLevel_Q.value,
                        horizontalAlignment=1, verticalAlignment=1)
        # 纠错级别为：H
        api.draw_qrcode(text, cell_width + margin, cell_width + margin, qrcode_width,
                        eccLevel=LPA_QREccLevel.EccLevel_H.value, horizontalAlignment=1, verticalAlignment=1)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_pdf417():
    """
    PDF417打印测试
    """
    text = "www.detonger.com"
    label_width = 40
    label_height = 20
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(label_width, label_height):
        # 绘制字符串
        api.draw_pdf417(text, 0, 0, label_width, label_height)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_rect():
    """
    矩形打印测试。
    """
    width = 30
    height = 20
    margin = 5
    line_width = 0.4
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(width, height):
        # 绘制矩形框
        api.draw_rect(width=width, height=height, lineWidth=line_width)
        # 绘制填充矩形
        api.draw_rect(margin, margin, width - margin *
                      2, height - margin * 2, fill=True)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_round_rect():
    """
    圆角矩形打印测试。
    """
    width = 30
    height = 20
    margin = 5
    corner = 2
    line_width = 0.4
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(width, height):  # 绘制矩形框
        api.draw_rect(width=width, height=height,
                      cornerWidth=corner, lineWidth=line_width)
        # 绘制填充矩形
        api.draw_rect(margin, margin, width - margin * 2,
                      height - margin * 2, cornerWidth=corner, fill=True)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_ellipse():
    """
    椭圆打印测试。
    """
    width = 30
    height = 20
    margin = 5
    # 打开打印机
    if not api.open_printer(**printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(width, height):  # 绘制矩形框
        api.draw_ellipse(width=width, height=height)
        # 绘制填充矩形
        api.draw_ellipse(margin, margin, width - margin *
                         2, height - margin * 2, fill=True)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_circle():
    """
    圆形打印测试。
    """
    width = 30
    height = 20
    margin = 5
    line_width = 0.4
    center_x = width * 0.5
    center_y = height * 0.5
    radius = width * 0.5 if width < height else height * 0.5
    # 打开打印机
    if not api.open_printer():
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(width, height):
        # 绘制矩形框
        api.draw_circle(center_x, center_y, radius, line_width)
        # 绘制填充矩形
        api.draw_circle(center_x, center_y, radius - margin, fill=True)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


###############
# 直线/虚线打印测试。
###############

def print_lines():
    """
    直线打印测试
    """
    label_width = 45
    label_height = 30
    line_space = 5
    line_width = 0.4
    #
    # 打开打印机
    if not api.open_printer(printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(label_width, label_height):
        # 绘制矩形框
        api.draw_line(0, line_space, x2=label_width, lineWidth=line_width)
        api.draw_line(0, line_space * 2, x2=label_width,
                      dashLens=0.5, lineWidth=line_width)
        api.draw_line(0, line_space * 3, x2=label_width,
                      dashLens=[0.5], lineWidth=line_width)
        api.draw_line(0, line_space * 4, x2=label_width,
                      dashLens=[1, 0.5], lineWidth=line_width)
        api.draw_line(0, line_space * 5, x2=label_width,
                      dashLens=[0.5, 0.5, 1, 1], lineWidth=line_width)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def draw_image():
    """ 绘制png/jpeg图片 """
    label_width = 30
    label_height = 30
    orientation = 90
    image_width = 25
    image_height = 25

    # 打开打印机
    if not api.open_printer(printers[0]):
        return
    # 1. 创建打印任务，指定标签纸大小。
    if api.start_job(label_width, label_height, orientation):
        api.draw_rect(0, 0, label_width, label_height, 0.5)
        # 绘制矩形框
        api.draw_image_data(DATA_PNG, (label_width - image_width) * 0.5,
                            (label_height - image_height) * 0.5, image_width, image_height)
        # 提交打印任务，开始打印
        api.commit_job()
    #
    api.close_printer()


def print_image():
    """直接打印图片。"""
    # 打开打印机
    if not api.open_printer(printers[0]):
        return
    api.print_image(DATA_PNG)
    #
    api.close_printer()


def main():
    # 第一步检查本地打印助手以及设备端口号
    api.check_plugin()
    # 休眠3秒，接口可以做一些初始化工作，比如搜索设备等
    time.sleep(3)
    # 获取打印机列表
    get_printers()
    #
    print_text()
    #
    print_text_with_align()
    #
    print_text_with_rotate()
    #
    print_barcode()
    #
    print_qrcode()
    #
    print_pdf417()
    #
    print_rect()
    #
    print_round_rect()
    #
    print_ellipse()
    #
    print_circle()
    #
    print_lines()
    #
    draw_image()
    #
    print_image()
    #
    pass


if __name__ == '__main__':
    main()
