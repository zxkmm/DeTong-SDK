package com.dothantech.demo;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import com.dothantech.lpapi.LPAPI;
import com.dothantech.lpapi.LPAPI.BarcodeType;
import com.dothantech.printer.IDzPrinter;
import com.dothantech.printer.IDzPrinter.PrintParamName;
import com.dothantech.printer.IDzPrinter.PrintProgress;
import com.dothantech.printer.IDzPrinter.PrinterAddress;
import com.dothantech.printer.IDzPrinter.PrinterInfo;
import com.dothantech.printer.IDzPrinter.PrinterState;
import com.dothantech.printer.IDzPrinter.ProgressInfo;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.SharedPreferences.Editor;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Handler;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

@SuppressLint("InflateParams")
public class MainActivity extends Activity {

	/********************************************************************************************************************************************/
	// DzPrinter连接打印功能相关
	/********************************************************************************************************************************************/

	// LPAPI 打印机操作相关的回调函数。
	private final LPAPI.Callback mCallback = new LPAPI.Callback() {

		/****************************************************************************************************************************************/
		// 所有回调函数都是在打印线程中被调用，因此如果需要刷新界面，需要发送消息给界面主线程，以避免互斥等繁琐操作。
		/****************************************************************************************************************************************/

		// 打印机连接状态发生变化时被调用
		@Override
		public void onStateChange(PrinterAddress arg0, PrinterState arg1) {
			final PrinterAddress printer = arg0;
			switch (arg1) {
			case Connected:
			case Connected2:
				// 打印机连接成功，发送通知，刷新界面提示
				mHandler.post(new Runnable() {
					@Override
					public void run() {
						onPrinterConnected(printer);
					}
				});
				break;

			case Disconnected:
				// 打印机连接失败、断开连接，发送通知，刷新界面提示
				mHandler.post(new Runnable() {
					@Override
					public void run() {
						onPrinterDisconnected();
					}
				});
				break;

			default:
				break;
			}
		}

		// 蓝牙适配器状态发生变化时被调用
		@Override
		public void onProgressInfo(ProgressInfo arg0, Object arg1) {
		}

		@Override
		public void onPrinterDiscovery(PrinterAddress arg0, PrinterInfo arg1) {
		}

		// 打印标签的进度发生变化是被调用
		@Override
		public void onPrintProgress(PrinterAddress address, Object bitmapData, PrintProgress progress, Object addiInfo) {
			switch (progress) {
			case Success:
				// 打印标签成功，发送通知，刷新界面提示
				mHandler.post(new Runnable() {
					@Override
					public void run() {
						onPrintSuccess();
					}
				});
				break;

			case Failed:
				// 打印标签失败，发送通知，刷新界面提示
				mHandler.post(new Runnable() {
					@Override
					public void run() {
						onPrintFailed();
					}
				});
				break;

			default:
				break;
			}
		}
	};

	private LPAPI api;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		// 初始化界面
		initialView();

		// 调用LPAPI对象的init方法初始化对象
		this.api = LPAPI.Factory.createInstance(mCallback);

		// 尝试连接上次成功连接的打印机
		if (mPrinterAddress != null) {
			if (api.openPrinterByAddress(mPrinterAddress)) {
				// 连接打印机的请求提交成功，刷新界面提示
				onPrinterConnecting(mPrinterAddress, false);
				return;
			}
		}
	}

	@Override
	protected void onDestroy() {
		// 应用退出时，调用LPAPI对象的quit方法断开打印机连接
		api.quit();

		// 应用退出时需要的操作
		fini();

		super.onDestroy();
	}

	// 打印机列表的每项点击事件
	private class DeviceListItemClicker implements OnClickListener {
		@Override
		public void onClick(DialogInterface dialog, int which) {
			PrinterAddress printer = pairedPrinters.get(which);
			if (printer != null) {
				// 连接选择的打印机
				if (api.openPrinterByAddress(printer)) {
					// 连接打印机的请求提交成功，刷新界面提示
					onPrinterConnecting(printer, true);
					return;
				}
			}

			// 连接打印机失败，刷新界面提示
			onPrinterDisconnected();
		}
	}

	// 判断当前打印机是否连接
	private boolean isPrinterConnected() {
		// 调用LPAPI对象的getPrinterState方法获取当前打印机的连接状态
		PrinterState state = api.getPrinterState();

		// 打印机未连接
		if (state == null || state.equals(PrinterState.Disconnected)) {
			Toast.makeText(MainActivity.this, this.getResources().getString(R.string.pleaseconnectprinter), Toast.LENGTH_SHORT).show();
			return false;
		}

		// 打印机正在连接
		if (state.equals(PrinterState.Connecting)) {
			Toast.makeText(MainActivity.this, this.getResources().getString(R.string.waitconnectingprinter), Toast.LENGTH_SHORT).show();
			return false;
		}

		// 打印机已连接
		return true;
	}

	// 获取打印时需要的打印参数
	private Bundle getPrintParam(int copies, int orientation) {
		Bundle param = new Bundle();

		// 打印浓度
		if (printDensity >= 0) {
			param.putInt(PrintParamName.PRINT_DENSITY, printDensity);
		}

		// 打印速度
		if (printSpeed >= 0) {
			param.putInt(PrintParamName.PRINT_SPEED, printSpeed);
		}

		// 间隔类型
		if (gapType >= 0) {
			param.putInt(PrintParamName.GAP_TYPE, gapType);
		}

		// 打印页面旋转角度
		if (orientation != 0) {
			param.putInt(PrintParamName.PRINT_DIRECTION, orientation);
		}

		// 打印份数
		if (copies > 1) {
			param.putInt(PrintParamName.PRINT_COPIES, copies);
		}

		return param;
	}

	/********************************************************************************************************************************************/
	// LPAPI绘图打印相关
	/********************************************************************************************************************************************/

	// 打印文本
	private boolean printText(String text, Bundle param) {

		// 开始绘图任务，传入参数(页面宽度, 页面高度)
		api.startJob(48, 50, 0);

		// 开始一个页面的绘制，绘制文本字符串
		// 传入参数(需要绘制的文本字符串, 绘制的文本框左上角水平位置, 绘制的文本框左上角垂直位置, 绘制的文本框水平宽度, 绘制的文本框垂直高度, 文字大小, 字体风格)
		api.drawText(text, 4, 5, 40, 40, 4);

		// 结束绘图任务提交打印
		return api.commitJob();
	}

	// 打印文本一维码
	private boolean printText1DBarcode(String text, String onedBarcde, Bundle param) {

		// 开始绘图任务，传入参数(页面宽度, 页面高度)
		api.startJob(48, 48, 90);

		// 开始一个页面的绘制，绘制文本字符串
		// 传入参数(需要绘制的文本字符串, 绘制的文本框左上角水平位置, 绘制的文本框左上角垂直位置, 绘制的文本框水平宽度, 绘制的文本框垂直高度, 文字大小, 字体风格)
		api.drawText(text, 4, 4, 40, 20, 4);

		// 设置之后绘制的对象内容旋转180度
		api.setItemOrientation(180);

		// 绘制一维码，此一维码绘制时内容会旋转180度，
		// 传入参数(需要绘制的一维码的数据, 绘制的一维码左上角水平位置, 绘制的一维码左上角垂直位置, 绘制的一维码水平宽度, 绘制的一维码垂直高度)
		api.draw1DBarcode(onedBarcde, BarcodeType.AUTO, 4, 25, 40, 15, 3);

		// 结束绘图任务提交打印
		return api.commitJob();
	}

	// 打印二维码
	private boolean print2dBarcode(String twodBarcode, Bundle param) {
		// 开始绘图任务，传入参数(页面宽度, 页面高度)
		api.startJob(48, 50, 0);

		// 开始一个页面的绘制，绘制二维码
		// 传入参数(需要绘制的二维码的数据, 绘制的二维码左上角水平位置, 绘制的二维码左上角垂直位置, 绘制的二维码的宽度(宽高相同))
		api.draw2DQRCode(twodBarcode, 9, 10, 30);

		// 结束绘图任务提交打印
		return api.commitJob();
	}

	// 打印图片
	private boolean printBitmap(Bitmap bitmap, Bundle param) {
		// 打印
		return api.printBitmap(bitmap, param);
	}

	/********************************************************************************************************************************************/
	// 应用界面相关
	/********************************************************************************************************************************************/

	// 初始化界面
	private void initialView() {
		printQualityList = getResources().getStringArray(R.array.print_quality);
		printDensityList = getResources().getStringArray(R.array.print_density);
		printSpeedList = getResources().getStringArray(R.array.print_speed);
		gapTypeList = getResources().getStringArray(R.array.gap_type);
		btnConnectDevice = (Button) findViewById(R.id.btn_printer);
		btnPrintQuality = (Button) findViewById(R.id.btn_printquality);
		btnGapType = (Button) findViewById(R.id.btn_gaptype);
		btnPrintDensity = (Button) findViewById(R.id.btn_printdensity);
		btnPrintSpeed = (Button) findViewById(R.id.btn_printspeed);
		SharedPreferences sharedPreferences = getSharedPreferences(getResources().getString(R.string.app_name), Context.MODE_PRIVATE);
		String lastPrinterMac = sharedPreferences.getString(KeyLastPrinterMac, null);
		String lastPrinterName = sharedPreferences.getString(KeyLastPrinterName, null);
		String lastPrinterType = sharedPreferences.getString(KeyLastPrinterType, null);
		IDzPrinter.AddressType lastAddressType = TextUtils.isEmpty(lastPrinterType) ? null : Enum.valueOf(IDzPrinter.AddressType.class, lastPrinterType);
		if (lastPrinterMac == null || lastPrinterName == null || lastAddressType == null) {
			mPrinterAddress = null;
		} else {
			mPrinterAddress = new IDzPrinter.PrinterAddress(lastPrinterName, lastPrinterMac, lastAddressType);
		}
		printQuality = sharedPreferences.getInt(KeyPrintQuality, -1);
		printDensity = sharedPreferences.getInt(KeyPrintDensity, -1);
		printSpeed = sharedPreferences.getInt(KeyPrintSpeed, -1);
		gapType = sharedPreferences.getInt(KeyGapType, -1);
		defaultText1 = sharedPreferences.getString(KeyDefaultText1, getResources().getString(R.string.defaulttextone));
		defaultText2 = sharedPreferences.getString(KeyDefaultText2, getResources().getString(R.string.defaulttexttwo));
		default1dBarcode = sharedPreferences.getString(KeyDefault1dBarcode, getResources().getString(R.string.defaultonedbarcode));
		default2dBarcode = sharedPreferences.getString(KeyDefault2dBarcode, getResources().getString(R.string.defaulttwodbarcode));
		btnPrintDensity.setText(getResources().getString(R.string.printdensity) + printDensityList[printDensity + 1]);
		btnPrintQuality.setText(getResources().getString(R.string.printquality) + printQualityList[printQuality + 1]);
		btnPrintSpeed.setText(getResources().getString(R.string.printspeed) + printSpeedList[printSpeed + 1]);
		btnGapType.setText(getResources().getString(R.string.gaptype) + gapTypeList[gapType + 1]);

		String[] testPicName = getResources().getStringArray(R.array.test_pic_name);
		bitmapOrientations = getResources().getIntArray(R.array.test_pic_orientation);

		// 加载测试用图片文件
		if (testPicName != null) {
			for (String str : testPicName) {
				try {
					InputStream is = getAssets().open(str);
					if (is != null) {
						Bitmap bmp = BitmapFactory.decodeStream(is);
						if (bmp != null) {
							printBitmaps.add(bmp);
						}
						try {
							is.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
	}

	// 应用退出时需要的操作
	private void fini() {
		// 保存相关信息
		SharedPreferences sharedPreferences = getSharedPreferences(getResources().getString(R.string.app_name), Context.MODE_PRIVATE);
		Editor editor = sharedPreferences.edit();

		editor.putInt(KeyPrintQuality, printQuality);
		editor.putInt(KeyPrintDensity, printDensity);
		editor.putInt(KeyPrintSpeed, printSpeed);
		editor.putInt(KeyGapType, gapType);
		if (mPrinterAddress != null) {
			editor.putString(KeyLastPrinterMac, mPrinterAddress.macAddress);
			editor.putString(KeyLastPrinterName, mPrinterAddress.shownName);
			editor.putString(KeyLastPrinterType, mPrinterAddress.addressType.toString());
		}
		if (defaultText1 != null) {
			editor.putString(KeyDefaultText1, defaultText1);
		}
		if (defaultText2 != null) {
			editor.putString(KeyDefaultText2, defaultText2);
		}
		if (default1dBarcode != null) {
			editor.putString(KeyDefault1dBarcode, default1dBarcode);
		}
		if (default2dBarcode != null) {
			editor.putString(KeyDefault2dBarcode, default2dBarcode);
		}
		editor.commit();
	}

	// 选择打印机的按钮事件
	public void selectPrinterOnClick(View view) {
		BluetoothAdapter btAdapter = BluetoothAdapter.getDefaultAdapter();
		if (btAdapter == null) {
			Toast.makeText(MainActivity.this, this.getResources().getString(R.string.unsupportedbluetooth), Toast.LENGTH_SHORT).show();
			return;
		}
		if (!btAdapter.isEnabled()) {
			Toast.makeText(MainActivity.this, this.getResources().getString(R.string.unenablebluetooth), Toast.LENGTH_SHORT).show();
			return;
		}

		pairedPrinters = api.getAllPrinterAddresses(null);
		new AlertDialog.Builder(MainActivity.this).setTitle(R.string.selectbondeddevice).setAdapter(new DeviceListAdapter(), new DeviceListItemClicker()).show();
	}

	// 设置打印质量的按钮事件
	public void printQualityOnClick(View view) {
		new AlertDialog.Builder(MainActivity.this).setTitle(R.string.setprintquality).setAdapter(new ParamAdapter(printQualityList), new PrintQualityItemClicker()).show();
	}

	// 设置间隔类型的按钮事件
	public void gapTypeOnClick(View view) {
		new AlertDialog.Builder(MainActivity.this).setTitle(R.string.setgaptype).setAdapter(new ParamAdapter(gapTypeList), new GapTypeItemClicker()).show();
	}

	// 设置打印浓度的按钮事件
	public void printDensityOnClick(View view) {
		new AlertDialog.Builder(MainActivity.this).setTitle(R.string.setprintdensity).setAdapter(new ParamAdapter(printDensityList), new PrintDensityItemClicker()).show();
	}

	// 设置打印速度的按钮事件
	public void printSpeedOnClick(View view) {
		new AlertDialog.Builder(MainActivity.this).setTitle(R.string.setprintspeed).setAdapter(new ParamAdapter(printSpeedList), new PrintSpeedItemClicker()).show();
	}

	// 打印文本的按钮事件
	public void printTextOnClick(View view) {
		// 显示打印数据设置界面
		AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
		builder.setTitle(R.string.printtext);
		builder.setView(initView(R.string.textvalue, defaultText1));
		builder.setPositiveButton(R.string.ok, new OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// 获取打印数据并进行打印
				defaultText1 = et1.getText().toString();
				if (isPrinterConnected()) {
					if (printText(defaultText1, getPrintParam(1, 0))) {
						onPrintStart();
					} else {
						onPrintFailed();
					}
				}
			}
		});
		builder.setNegativeButton(R.string.cancel, null);
		builder.show();
	}

	// 打印文本一维码的按钮事件
	public void printText1DBarcodeOnClick(View view) {
		// 显示打印数据设置界面
		AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
		builder.setTitle(R.string.printtext1dbarcode);
		builder.setView(initView(R.string.textvalue, defaultText2, R.string.onedbarcodevalue, default1dBarcode));
		builder.setPositiveButton(R.string.ok, new OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// 获取打印数据并进行打印
				defaultText2 = et1.getText().toString();
				default1dBarcode = et2.getText().toString();
				if (isPrinterConnected()) {
					if (printText1DBarcode(defaultText2, default1dBarcode, getPrintParam(1, 90))) {
						onPrintStart();
					} else {
						onPrintFailed();
					}
				}
			}
		});
		builder.setNegativeButton(R.string.cancel, null);
		builder.show();
	}

	// 打印二维码的按钮事件
	public void print2DBarcodeOnClick(View view) {
		// 显示打印数据设置界面
		AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
		builder.setTitle(R.string.print2dbarcode);
		builder.setView(initView(R.string.twodbarcodevalue, default2dBarcode));
		builder.setPositiveButton(R.string.ok, new OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// 获取打印数据并进行打印
				default2dBarcode = et1.getText().toString();
				if (isPrinterConnected()) {
					if (print2dBarcode(default2dBarcode, getPrintParam(1, 0))) {
						onPrintStart();
					} else {
						onPrintFailed();
					}
				}
			}
		});
		builder.setNegativeButton(R.string.cancel, null);
		builder.show();
	}

	// 打印图片的按钮事件
	public void printBitmapOnClick(View view) {
		new AlertDialog.Builder(MainActivity.this).setTitle(R.string.printbitmap).setAdapter(new BitmapListAdapter(), new BitmapListItemClicker()).show();
	}

	// 连接打印机请求成功提交时操作
	private void onPrinterConnecting(PrinterAddress printer, boolean showDialog) {
		// 连接打印机请求成功提交，刷新界面提示
		String txt = printer.shownName;
		if (TextUtils.isEmpty(txt))
			txt = printer.macAddress;
		txt = getResources().getString(R.string.nowisconnectingprinter) + '[' + txt + ']';
		txt += getResources().getString(R.string.printer);
		if (showDialog) {
			showStateAlertDialog(txt);
		}
		btnConnectDevice.setText(txt);
	}

	// 连接打印机成功时操作
	private void onPrinterConnected(PrinterAddress printer) {
		// 连接打印机成功时，刷新界面提示，保存相关信息
		clearAlertDialog();
		Toast.makeText(MainActivity.this, this.getResources().getString(R.string.connectprintersuccess), Toast.LENGTH_SHORT).show();
		mPrinterAddress = printer;
		// 调用LPAPI对象的getPrinterInfo方法获得当前连接的打印机信息
		String txt = getResources().getString(R.string.printer) + getResources().getString(R.string.chinesecolon);
		txt += api.getPrinterInfo().deviceName + "\n";
		txt += api.getPrinterInfo().deviceAddress;
		btnConnectDevice.setText(txt);
	}

	// 连接打印机操作提交失败、打印机连接失败或连接断开时操作
	private void onPrinterDisconnected() {
		// 连接打印机操作提交失败、打印机连接失败或连接断开时，刷新界面提示
		clearAlertDialog();

		Toast.makeText(MainActivity.this, this.getResources().getString(R.string.connectprinterfailed), Toast.LENGTH_SHORT).show();
		btnConnectDevice.setText("");
	}

	// 开始打印标签时操作
	private void onPrintStart() {
		// 开始打印标签时，刷新界面提示
		showStateAlertDialog(R.string.nowisprinting);
	}

	// 标签打印成功时操作
	private void onPrintSuccess() {
		// 标签打印成功时，刷新界面提示
		clearAlertDialog();
		Toast.makeText(MainActivity.this, this.getResources().getString(R.string.printsuccess), Toast.LENGTH_SHORT).show();
	}

	// 打印请求失败或标签打印失败时操作
	private void onPrintFailed() {
		// 打印请求失败或标签打印失败时，刷新界面提示
		clearAlertDialog();
		Toast.makeText(MainActivity.this, this.getResources().getString(R.string.printfailed), Toast.LENGTH_SHORT).show();
	}

	// 显示连接、打印的状态提示框
	private void showStateAlertDialog(int resId) {
		showStateAlertDialog(getResources().getString(resId));
	}

	// 显示连接、打印的状态提示框
	private void showStateAlertDialog(String str) {
		if (stateAlertDialog != null && stateAlertDialog.isShowing()) {
			stateAlertDialog.setTitle(str);
		} else {
			stateAlertDialog = new AlertDialog.Builder(MainActivity.this).setCancelable(false).setTitle(str).show();
		}
	}

	// 清除连接、打印的状态提示框
	private void clearAlertDialog() {
		if (stateAlertDialog != null && stateAlertDialog.isShowing()) {
			stateAlertDialog.dismiss();
		}
		stateAlertDialog = null;
	}

	// 用于填充打印机列表的Adapter
	private class DeviceListAdapter extends BaseAdapter {
		private TextView tv_name = null;
		private TextView tv_mac = null;

		@Override
		public int getCount() {
			return pairedPrinters.size();
		}

		@Override
		public Object getItem(int position) {
			return pairedPrinters.get(position);
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			if (convertView == null) {
				convertView = LayoutInflater.from(MainActivity.this).inflate(R.layout.printer_item, null);
			}
			tv_name = (TextView) convertView.findViewById(R.id.tv_device_name);
			tv_mac = (TextView) convertView.findViewById(R.id.tv_macaddress);

			if (pairedPrinters != null && pairedPrinters.size() > position) {
				PrinterAddress printer = pairedPrinters.get(position);
				tv_name.setText(printer.shownName);
				tv_mac.setText(printer.macAddress);
			}

			return convertView;
		}
	}

	// 用于填充设置打印参数界面的Adapter
	private class ParamAdapter extends BaseAdapter {
		private TextView tv_param = null;
		private String[] paramArray = null;

		public ParamAdapter(String[] array) {
			this.paramArray = array;
		}

		@Override
		public int getCount() {
			return paramArray.length;
		}

		@Override
		public Object getItem(int position) {
			return paramArray[position];
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			if (convertView == null) {
				convertView = LayoutInflater.from(MainActivity.this).inflate(R.layout.param_item, null);
			}
			tv_param = (TextView) convertView.findViewById(R.id.tv_param);
			String text = "";
			if (paramArray != null && paramArray.length > position) {
				text = paramArray[position];
			}
			tv_param.setText(text);

			return convertView;
		}
	}

	// 用于填充打印图片的示例图片列表的Adapter
	private class BitmapListAdapter extends BaseAdapter {
		private ImageView iv_bmp = null;

		@Override
		public int getCount() {
			return printBitmaps.size();
		}

		@Override
		public Object getItem(int position) {
			return printBitmaps.get(position);
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			if (convertView == null) {
				convertView = LayoutInflater.from(MainActivity.this).inflate(R.layout.bitmap_item, null);
			}
			iv_bmp = (ImageView) convertView.findViewById(R.id.iv_bmp);
			if (printBitmaps != null && printBitmaps.size() > position) {
				Bitmap bmp = printBitmaps.get(position);
				if (bmp != null) {
					iv_bmp.setImageBitmap(bmp);
				}
			}

			return convertView;
		}
	}

	// 设置打印质量的每项点击事件
	private class PrintQualityItemClicker implements OnClickListener {
		@Override
		public void onClick(DialogInterface dialog, int which) {
			printQuality = which - 1;
			btnPrintQuality.setText(getResources().getString(R.string.printquality) + printQualityList[which]);
		}
	}

	// 设置打印浓度的每项点击事件
	private class PrintDensityItemClicker implements OnClickListener {
		@Override
		public void onClick(DialogInterface dialog, int which) {
			printDensity = which - 1;
			btnPrintDensity.setText(getResources().getString(R.string.printdensity) + printDensityList[which]);
		}
	}

	// 设置打印速度的每项点击事件
	private class PrintSpeedItemClicker implements OnClickListener {
		@Override
		public void onClick(DialogInterface dialog, int which) {
			printSpeed = which - 1;
			btnPrintSpeed.setText(getResources().getString(R.string.printspeed) + printSpeedList[which]);
		}
	}

	// 设置间隔类型的每项点击事件
	private class GapTypeItemClicker implements OnClickListener {
		@Override
		public void onClick(DialogInterface dialog, int which) {
			gapType = which - 1;
			btnGapType.setText(getResources().getString(R.string.gaptype) + gapTypeList[which]);
		}
	}

	// 打印图片的示例图片列表的每项点击事件
	private class BitmapListItemClicker implements OnClickListener {
		@Override
		public void onClick(DialogInterface dialog, int which) {
			if (isPrinterConnected()) {
				int orientation = 0;
				if (bitmapOrientations != null && bitmapOrientations.length > which) {
					orientation = bitmapOrientations[which];
				}

				// 获取打印数据并进行打印
				Bitmap bmp = printBitmaps.get(which);
				if (bmp != null) {
					if (printBitmap(bmp, getPrintParam(1, orientation))) {
						onPrintStart();
						return;
					}
				}

				onPrintFailed();
			}
		}
	}

	// 初始化并获得设置打印数据的界面（一项数据）
	private View initView(int title1, String text1) {
		View view = View.inflate(MainActivity.this, R.layout.setvalue_item, null);
		((TextView) view.findViewById(R.id.tv_title1)).setText(title1);
		et1 = (EditText) view.findViewById(R.id.et_value1);
		et1.setText(text1 == null ? "" : text1);
		et1.setSelection(et1.getText().toString().length());
		return view;
	}

	// 初始化并获得设置打印数据的界面（两项数据）
	private View initView(int title1, String text1, int title2, String text2) {
		View view = View.inflate(MainActivity.this, R.layout.setvalue_item, null);
		((LinearLayout) view.findViewById(R.id.ll_2)).setVisibility(View.VISIBLE);
		((TextView) view.findViewById(R.id.tv_title1)).setText(title1);
		et1 = (EditText) view.findViewById(R.id.et_value1);
		et1.setText(text1 == null ? "" : text1);
		et1.setSelection(et1.getText().length());
		((TextView) view.findViewById(R.id.tv_title2)).setText(title2);
		et2 = (EditText) view.findViewById(R.id.et_value2);
		et2.setText(text2 == null ? "" : text2);
		et2.setSelection(et2.getText().toString().length());
		return view;
	}

	// 用于处理各种通知消息，刷新界面的handler
	private final Handler mHandler = new Handler();

	// 保存各种信息时的名称
	private static final String KeyPrintQuality = "PrintQuality";
	private static final String KeyPrintDensity = "PrintDensity";
	private static final String KeyPrintSpeed = "PrintSpeed";
	private static final String KeyGapType = "GapType";

	private static final String KeyLastPrinterMac = "LastPrinterMac";
	private static final String KeyLastPrinterName = "LastPrinterName";
	private static final String KeyLastPrinterType = "LastPrinterType";

	private static final String KeyDefaultText1 = "DefaultText1";
	private static final String KeyDefaultText2 = "DefaultText2";
	private static final String KeyDefault1dBarcode = "Default1dBarcode";
	private static final String KeyDefault2dBarcode = "Default2dBarcode";

	// 需要用到的各个控件对象
	private Button btnConnectDevice = null;
	private Button btnPrintQuality = null;
	private Button btnPrintDensity = null;
	private Button btnPrintSpeed = null;
	private Button btnGapType = null;
	private EditText et1 = null;
	private EditText et2 = null;

	// 打印参数
	private int printQuality = -1;
	private int printDensity = -1;
	private int printSpeed = -1;
	private int gapType = -1;

	// 打印数据
	private String defaultText1 = "";
	private String defaultText2 = "";
	private String default1dBarcode = "";
	private String default2dBarcode = "";

	// 用于填充的数组及集合列表
	private String[] printQualityList = null;
	private String[] printDensityList = null;
	private String[] printSpeedList = null;
	private String[] gapTypeList = null;

	private List<PrinterAddress> pairedPrinters = new ArrayList<PrinterAddress>();

	private List<Bitmap> printBitmaps = new ArrayList<Bitmap>();
	private int[] bitmapOrientations = null;

	// 上次连接成功的设备对象
	private PrinterAddress mPrinterAddress = null;

	// 状态提示框
	private AlertDialog stateAlertDialog = null;
}
