package com.dothantech.nfcdemo;

import com.dothantech.lpapi.LPAPI;
import com.dothantech.nfcmanager.NFCManagerActivity;
import com.dothantech.printer.IDzPrinter.PrintProgress;
import com.dothantech.printer.IDzPrinter.PrinterAddress;
import com.dothantech.printer.IDzPrinter.PrinterInfo;
import com.dothantech.printer.IDzPrinter.PrinterState;
import com.dothantech.printer.IDzPrinter.ProgressInfo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;

public class MainActivity extends Activity {

	private LPAPI mApi;		// 标签打印接口类，在OnCreate函数中创建
	/**
	 * 创建LPAPI实例的时候指定该回调接口，当NFC检测到打印机的时候会通过该回调接口的
	 * onPrinterDiscovery()函数来通知客户,用户可以在改函数中连接打印机即可；
	 */
	private LPAPI.Callback callback = new LPAPI.Callback() {
		
		@Override
		public void onStateChange(PrinterAddress address, PrinterState state) {
		}
		
		@Override
		public void onProgressInfo(ProgressInfo info, Object addiInfo) {
		}
		
		@Override
		public void onPrinterDiscovery(PrinterAddress address, PrinterInfo info) {
			// 打印过程中不能切换打印机；
			if (mApi.getPrinterState() != PrinterState.Printing) { 
				mApi.openPrinterByAddress(address);	// 连接打印机
			}
		}
		
		@Override
		public void onPrintProgress(PrinterAddress address, Object printData, PrintProgress progress, Object addiInfo) {
		}
	};
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		// ------------------------- 初始化打印接口 -------------------------//
		// 在应用已经打开的情况下如果想通过NFC连接打印机，则需要在创建mApi属性的时候，制定回调接口，通过NFC检测到打印机的时候，
		// 接口对调用回调接口中的onPrinterDiscovery方法，我们只需要在该方法中连接检测到的打印机即可；
		this.mApi = LPAPI.Factory.createInstance(callback);
		// 如果应用主界面是通过打印机中的NFC来启动的，则可以通过字符串常量：NFCManagerActivity.EXTRA_NDEF_INTENT 来获取打印机信息，否则获取不到数据；
		Intent ndefIntent = getIntent().getParcelableExtra(NFCManagerActivity.EXTRA_NDEF_INTENT);
		PrinterInfo info = PrinterInfo.valueOf(ndefIntent);
		if (info != null) {
			this.mApi.openPrinterByAddress(info.getPrinterAddress());	// 连接打印机
		}

		// --------------------- 打印测试 ---------------------------------//
		this.findViewById(R.id.btn_printText).setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (mApi.isPrinterOpened())
					printText("德佟电子");
			}
		});
		this.findViewById(R.id.btn_print2Rcode).setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (mApi.isPrinterOpened())
					printQRcode("http://www.detonger.com");
			}
		});
	}

	private void printText(String content) {
		// 开始绘图任务，传入参数(页面宽度, 页面高度)
		mApi.startJob(40, 30, 0);

		// 开始一个页面的绘制，绘制文本字符串
		mApi.drawText(content, 4, 5, 40, 30, 4);

		// 结束绘图任务提交打印
		mApi.commitJob();
	}

	private void printQRcode(String content) {
		// 开始绘图任务，传入参数(页面宽度, 页面高度)
		mApi.startJob(40, 30, 0);

		// 开始一个页面的绘制，绘制二维码
		mApi.draw2DQRCode(content, 4, 5, 20);

		// 结束绘图任务提交打印
		mApi.commitJob();
	}
}
