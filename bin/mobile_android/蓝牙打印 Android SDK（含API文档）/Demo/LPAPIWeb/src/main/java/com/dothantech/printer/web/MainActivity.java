package com.dothantech.printer.web;

import com.dothantech.lpapi.LPAPI;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends Activity {
	private WebView mWeb;
	private LPAPI mPrinter;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		this.findViews();
		this.initDatas();
	}

	private void findViews() {
		mWeb = (WebView) findViewById(R.id.webviewer);
	}

	@SuppressLint("SetJavaScriptEnabled")
	private void initDatas() {
		// 创建打印机接口对象，并导入到 WebView
		mPrinter = LPAPI.Factory.createInstance(mWeb);

		// 样例程序将Web页面放在APP的asserts中，实际使用时可为任意网络页面
		mWeb.loadUrl("file:///android_asset/index.html");
	}

	@Override
	protected void onDestroy() {
		mPrinter.quit();

		super.onDestroy();
	}
}
