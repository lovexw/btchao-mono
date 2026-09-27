#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
比特币预测数据添加工具
用于快速添加新的预测数据到 predictions.json
"""

import json
import sys
from datetime import datetime
from pathlib import Path


def get_next_id(predictions):
    """获取下一个可用的 ID"""
    if not predictions:
        return 1
    return max(p['id'] for p in predictions) + 1


def get_sentiment():
    """获取情绪类型"""
    print("\n选择预测情绪：")
    print("1. 看涨 (bullish)")
    print("2. 看跌 (bearish)")
    print("3. 中性 (neutral)")
    
    while True:
        choice = input("请选择 (1-3): ").strip()
        if choice == '1':
            return 'bullish'
        elif choice == '2':
            return 'bearish'
        elif choice == '3':
            return 'neutral'
        else:
            print("无效选择，请重试")


def get_input(prompt, required=True, input_type=str):
    """获取用户输入"""
    while True:
        value = input(prompt).strip()
        if not value and not required:
            return None if input_type == str else 0
        if not value and required:
            print("此项为必填项，请输入！")
            continue
        
        if input_type == int:
            try:
                return int(value)
            except ValueError:
                print("请输入有效的数字！")
                continue
        
        return value


def main():
    # 读取现有数据
    data_file = Path(__file__).parent.parent / 'data' / 'predictions.json'
    
    try:
        with open(data_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"错误：找不到文件 {data_file}")
        sys.exit(1)
    except json.JSONDecodeError:
        print("错误：JSON 格式错误")
        sys.exit(1)
    
    predictions = data.get('predictions', [])
    
    print("=" * 60)
    print("比特币预测数据添加工具")
    print("=" * 60)
    print("提示：带 * 的为必填项，按 Ctrl+C 可随时退出")
    print()
    
    try:
        # 收集数据
        new_prediction = {
            'id': get_next_id(predictions),
            'date': get_input("* 预测发布日期 (YYYY-MM-DD): "),
            'institution': get_input("* 机构名称: "),
            'person': get_input("  预测者姓名 (可选): ", required=False),
            'role': get_input("  职位/头衔 (可选): ", required=False),
            'targetPrice': get_input("* 目标价格 (美元): ", input_type=int),
            'targetDate': get_input("* 预期达到时间: "),
            'sentiment': get_sentiment(),
            'content': get_input("* 预测内容描述: "),
            'sourceUrl': get_input("* 原文链接: ")
        }
        
        # 可选字段
        change = get_input("  预期涨跌幅 (%) [可选]: ", required=False, input_type=int)
        if change:
            new_prediction['change'] = change
        
        long_term_price = get_input("  长期目标价格 (美元) [可选]: ", required=False, input_type=int)
        if long_term_price:
            new_prediction['longTermPrice'] = long_term_price
            new_prediction['longTermDate'] = get_input("  长期目标时间: ")
        
        # 显示预览
        print("\n" + "=" * 60)
        print("预测数据预览：")
        print("=" * 60)
        print(json.dumps(new_prediction, ensure_ascii=False, indent=2))
        print()
        
        # 确认添加
        confirm = input("确认添加此预测数据？(y/n): ").strip().lower()
        if confirm != 'y':
            print("已取消")
            sys.exit(0)
        
        # 添加数据
        predictions.append(new_prediction)
        data['predictions'] = predictions
        
        # 保存文件
        with open(data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"\n✅ 成功添加预测数据！(ID: {new_prediction['id']})")
        print(f"📊 当前总预测数：{len(predictions)}")
        
    except KeyboardInterrupt:
        print("\n\n已取消")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ 错误：{e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
