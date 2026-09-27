// 工具函数库
const BitcoinTimelineUtils = {
    // 数据验证
    validateData: function(data) {
        const errors = [];
        
        // 检查必需的数据结构
        const requiredSections = ['timeline', 'milestones', 'technology', 'priceHistory'];
        requiredSections.forEach(section => {
            if (!data[section] || !Array.isArray(data[section])) {
                errors.push(`缺少必需的数据部分: ${section}`);
            }
        });
        
        // 验证时间线数据
        if (data.timeline) {
            data.timeline.forEach((item, index) => {
                if (!item.date || !item.title || !item.description) {
                    errors.push(`时间线项目 ${index + 1} 缺少必需字段`);
                }
            });
        }
        
        return errors;
    },

    // 日期格式化
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 导出数据为JSON
    exportToJSON: function(data, filename = 'bitcoin-timeline-data.json') {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        URL.revokeObjectURL(url);
    },

    // 导出数据为CSV
    exportToCSV: function(data, filename = 'bitcoin-timeline-data.csv') {
        if (!data.timeline || !Array.isArray(data.timeline)) {
            console.error('没有可导出的时间线数据');
            return;
        }

        const headers = ['日期', '标题', '描述', '标签'];
        const rows = data.timeline.map(item => [
            item.date || '',
            item.title || '',
            item.description || '',
            (item.tags || []).join('; ')
        ]);

        let csvContent = headers.join(',') + '\n';
        rows.forEach(row => {
            csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
        });

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        URL.revokeObjectURL(url);
    },

    // 搜索功能
    searchEvents: function(data, searchTerm) {
        const results = {
            timeline: [],
            milestones: [],
            technology: [],
            priceHistory: [],
            china: []
        };

        const searchLower = searchTerm.toLowerCase();

        // 搜索时间线
        if (data.timeline) {
            results.timeline = data.timeline.filter(item => 
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        }

        // 搜索里程碑
        if (data.milestones) {
            results.milestones = data.milestones.filter(item =>
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower)
            );
        }

        // 搜索技术发展
        if (data.technology) {
            results.technology = data.technology.filter(item =>
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower)
            );
        }

        // 搜索价格历史
        if (data.priceHistory) {
            results.priceHistory = data.priceHistory.filter(item =>
                item.details.toLowerCase().includes(searchLower)
            );
        }

        // 搜索中国视角
        if (data.china) {
            results.china = data.china.filter(item =>
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        }

        return results;
    },

    // 统计信息
    getStatistics: function(data) {
        const stats = {
            totalEvents: 0,
            yearRange: { start: null, end: null },
            categories: {},
            priceRange: { min: null, max: null }
        };

        // 统计时间线事件
        if (data.timeline) {
            stats.totalEvents += data.timeline.length;
            
            // 提取年份范围
            data.timeline.forEach(item => {
                const year = parseInt(item.date.match(/\d{4}/)?.[0]);
                if (year) {
                    if (!stats.yearRange.start || year < stats.yearRange.start) {
                        stats.yearRange.start = year;
                    }
                    if (!stats.yearRange.end || year > stats.yearRange.end) {
                        stats.yearRange.end = year;
                    }
                }

                // 统计标签
                if (item.tags) {
                    item.tags.forEach(tag => {
                        stats.categories[tag] = (stats.categories[tag] || 0) + 1;
                    });
                }
            });
        }

        // 统计其他部分
        ['milestones', 'technology', 'priceHistory', 'china'].forEach(section => {
            if (data[section]) {
                stats.totalEvents += data[section].length;
            }
        });

        // 统计价格范围
        if (data.priceHistory) {
            data.priceHistory.forEach(item => {
                const price = parseFloat(item.amount.replace(/[$,]/g, ''));
                if (!isNaN(price)) {
                    if (!stats.priceRange.min || price < stats.priceRange.min) {
                        stats.priceRange.min = price;
                    }
                    if (!stats.priceRange.max || price > stats.priceRange.max) {
                        stats.priceRange.max = price;
                    }
                }
            });
        }

        return stats;
    },

    // 按年份筛选
    filterByYear: function(data, year) {
        const filteredData = {
            timeline: [],
            milestones: [],
            technology: [],
            priceHistory: [],
            china: []
        };

        const yearStr = year.toString();

        // 筛选时间线
        if (data.timeline) {
            filteredData.timeline = data.timeline.filter(item =>
                item.date.includes(yearStr)
            );
        }

        // 筛选里程碑
        if (data.milestones) {
            filteredData.milestones = data.milestones.filter(item =>
                item.year === yearStr
            );
        }

        // 筛选技术发展
        if (data.technology) {
            filteredData.technology = data.technology.filter(item =>
                item.date.includes(yearStr)
            );
        }

        // 筛选价格历史
        if (data.priceHistory) {
            filteredData.priceHistory = data.priceHistory.filter(item =>
                item.date.includes(yearStr)
            );
        }

        // 筛选中国视角
        if (data.china) {
            filteredData.china = data.china.filter(item =>
                item.date.includes(yearStr)
            );
        }

        return filteredData;
    },

    // 生成时间线图表数据
    generateTimelineChartData: function(data) {
        const chartData = {};
        
        if (data.timeline) {
            data.timeline.forEach(item => {
                const year = item.date.match(/\d{4}/)?.[0];
                if (year) {
                    if (!chartData[year]) {
                        chartData[year] = [];
                    }
                    chartData[year].push({
                        title: item.title,
                        date: item.date,
                        tags: item.tags || []
                    });
                }
            });
        }

        return chartData;
    },

    // 数据备份
    backupData: function(data) {
        const backup = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            data: data
        };
        
        localStorage.setItem('bitcoinTimelineBackup', JSON.stringify(backup));
        return backup;
    },

    // 数据恢复
    restoreData: function() {
        const backupStr = localStorage.getItem('bitcoinTimelineBackup');
        if (backupStr) {
            try {
                const backup = JSON.parse(backupStr);
                return backup.data;
            } catch (error) {
                console.error('恢复数据失败:', error);
                return null;
            }
        }
        return null;
    },

    // 清理数据
    cleanData: function(data) {
        const cleanedData = JSON.parse(JSON.stringify(data));
        
        // 清理时间线数据
        if (cleanedData.timeline) {
            cleanedData.timeline = cleanedData.timeline.filter(item => 
                item.date && item.title && item.description
            );
        }

        // 清理其他数据部分
        ['milestones', 'technology', 'priceHistory', 'china'].forEach(section => {
            if (cleanedData[section]) {
                cleanedData[section] = cleanedData[section].filter(item => {
                    const hasRequiredFields = item.title && item.description;
                    const hasDate = item.date || item.year;
                    return hasRequiredFields && hasDate;
                });
            }
        });

        return cleanedData;
    }
};

// 导出工具函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BitcoinTimelineUtils;
} else {
    window.BitcoinTimelineUtils = BitcoinTimelineUtils;
}
