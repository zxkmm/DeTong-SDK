package com.dothantech.quick;

import com.dothantech.lpapi.IAtBitmap;
import com.dothantech.lpapi.LPAPI;
import com.dothantech.lpapi.LPAPI.Factory;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {
	
	private LPAPI api;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		// 初始化 LPAPI 对象（简单起见，不处理结果通知）
		api = Factory.createInstance();
	}

	@Override
	protected void onDestroy() {
		// 断开蓝牙连接，释放 LPAPI 对象
		api.quit();

		super.onDestroy();
	}

	public void printTextOnClick(View view) {
		printText("德佟电子");
	}

	public void print2RcodeOnClick(View view) {
		printQRcode("http://www.detonger.com");
	}

	private void printText(String content) {
		// 连接配对的第一个打印机对象
		api.openPrinter("");

		// 开始绘图任务，传入参数(页面宽度, 页面高度)
		api.startJob(50, 30, 0);

		// 开始一个页面的绘制，绘制文本字符串
		api.drawText(content, 4, 5, 40, 30, 4);

		// 结束绘图任务提交打印
		api.commitJob();
	}

	private void printQRcode(String content) {
		// 连接配对的第一个打印机对象
		api.openPrinter("");

		// 开始绘图任务，传入参数(页面宽度, 页面高度)
		api.startJob(40, 30, 0);

		// 开始一个页面的绘制，绘制二维码
		api.draw2DQRCode(content, 4, 5, 20);

		// 结束绘图任务提交打印
	    api.commitJob();
	}

}
