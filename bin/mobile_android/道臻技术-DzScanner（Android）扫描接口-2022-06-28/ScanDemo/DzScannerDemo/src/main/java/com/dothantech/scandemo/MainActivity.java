package com.dothantech.scandemo;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.dothantech.scanner.DzScanner;

import static android.content.DialogInterface.BUTTON_NEGATIVE;

public class MainActivity extends Activity {
    TextView content;
    ToggleButton tb_scan;
    ToggleButton tb_continueScan;
    ToggleButton tb_playVibrate;
    ToggleButton tb_playBeep;
    // DzScanner 实例对象
    DzScanner scanner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        initView();

        // 得到 DzScanner 实例对象
        scanner = DzScanner.Factory.getInstance();
        // 打开扫描头，并设置扫描操作相关的回调
        boolean openSuccess = scanner.open(MainActivity.this, new DzScanner.Callback() {
            @Override
            public void onScanSuccess(ScanResult a) {
                tb_scan.setChecked(true);
                content.setText(String.format("条码类型：%s\n条码内容：%s", a.type, a.result));
            }
        });

        if (!openSuccess) {
            Toast.makeText(MainActivity.this, "打开扫描头失败，请检查PDA后重试！", Toast.LENGTH_SHORT).show();
        }

        // 开始或停止扫码
        tb_scan.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    scanner.stop();
                } else {
                    scanner.start();
                }
            }
        });
        // 配置使能连续扫描
        tb_continueScan.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                scanner.enableContinueScan(!isChecked);
            }
        });
        // 配置使能扫描成功后震动
        tb_playVibrate.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                scanner.enablePlayVibrate(!isChecked);
            }
        });
        // 配置使能扫描成功后播放声音
        tb_playBeep.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                scanner.enablePlayBeep(!isChecked);
            }
        });
    }

    private void initView() {
        content = findViewById(R.id.tv_content);
        tb_scan = findViewById(R.id.tb_scan);
        tb_continueScan = findViewById(R.id.tb_continueScan);
        tb_playVibrate = findViewById(R.id.tb_playVibrate);
        tb_playBeep = findViewById(R.id.tb_playBeep);
    }

    @Override
    protected void onDestroy() {
        // 关闭扫描头
        scanner.close();

        super.onDestroy();
    }

    public void onDecodeEncodingClick(View view) {
        showChooseDecodeEncodingDialog();
    }

    /**
     * 显示选择解码字符编码格式弹窗
     */
    private void showChooseDecodeEncodingDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setTitle("选择解码字符编码格式");
        builder.setItems(shownDecodeEncodingArray, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if (which != AlertDialog.BUTTON_NEGATIVE) {
                    scanner.setDecodeEncoding(decodeEncodingArray[which]);
                }
            }
        });
        builder.show();
    }

    /**
     * 显示的解码字符编码格式数组
     */
    static final String[] shownDecodeEncodingArray = {"Auto", "GB2312", "GBK", "GB18030", "UTF-8", "ISO-8859-1", "BIG5", "SJIS", "EUC-JP"};
    /**
     * 解码字符编码格式数组
     */
    static final int[] decodeEncodingArray = {DzScanner.DecodeEncoding.Auto, DzScanner.DecodeEncoding.GB2312, DzScanner.DecodeEncoding.GBK,
            DzScanner.DecodeEncoding.GB18030, DzScanner.DecodeEncoding.UTF_8, DzScanner.DecodeEncoding.ISO_8859_1, DzScanner.DecodeEncoding.BIG5,
            DzScanner.DecodeEncoding.SJIS, DzScanner.DecodeEncoding.EUC_JP};

    public void onContinueIntervalClick(View view) {
        showContinueIntervalDialog();
    }

    /**
     * 显示配置连续扫描间隔时间弹窗
     */
    private void showContinueIntervalDialog() {
        final EditText editText = new EditText(this);
        editText.setInputType(InputType.TYPE_CLASS_NUMBER);
        editText.setHint("单位：毫秒，取值范围：100-3000");
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("连续扫描间隔时间").setIcon(android.R.drawable.ic_dialog_info).setView(editText)
                .setNegativeButton("取消", null);
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                if (which != BUTTON_NEGATIVE) {
                    int continueInterval = Integer.parseInt(editText.getText().toString());
                    if (continueInterval < 100 || continueInterval > 3000) {
                        Toast.makeText(MainActivity.this, "设置无效，连续扫描间隔时间取值范围为100-3000ms。", Toast.LENGTH_LONG).show();
                        return;
                    }
                    scanner.setContinueInterval(continueInterval);
                }
            }
        });
        builder.show();
    }

    public void onOutTimeClick(View view) {
        showTimeOutDialog();
    }

    /**
     * 显示配置扫描超时时间弹窗
     */
    private void showTimeOutDialog() {
        final EditText editText = new EditText(this);
        editText.setInputType(InputType.TYPE_CLASS_NUMBER);
        editText.setHint("单位：毫秒，取值范围：1000-10000");
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("扫描超时时间").setIcon(android.R.drawable.ic_dialog_info).setView(editText)
                .setNegativeButton("取消", null);
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                if (which != BUTTON_NEGATIVE) {
                    int outTime = Integer.parseInt(editText.getText().toString());
                    if (outTime < 1000 || outTime > 10000) {
                        Toast.makeText(MainActivity.this, "设置无效，扫描超时时间取值范围为1000-10000ms。", Toast.LENGTH_LONG).show();
                        return;
                    }
                    scanner.setTimeOut(outTime);
                }
            }
        });
        builder.show();
    }
}
