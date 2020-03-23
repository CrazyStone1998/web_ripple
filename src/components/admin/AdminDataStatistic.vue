<template>
    <div>
        <el-row>
            <el-col :span="12" id="demo-1" style="height: 300px">
            </el-col>
            <el-col :span="12" id="demo-2" style="height: 300px">

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" id="demo-3" style="height: 300px">

            </el-col>
            <el-col :span="12" id="demo-4" style="height:300px">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {

        name: "AdminDataStatistic",
        data() {
            return {

            }
        },
        methods: {
            chartDemo4() {
                let dom = document.getElementById("demo-4");
                let myChart = echarts.init(dom);
                let option = null;
                let builderJson = {
                    "all": 10887,
                    "charts": {
                        "map": 3237,
                        "lines": 2164,
                        "bar": 7561,
                        "line": 7778,
                        "pie": 7355,
                        "scatter": 2405,
                        "candlestick": 1842,
                        "radar": 2090,
                        "heatmap": 1762,
                        "treemap": 1593,
                        "graph": 2060,
                        "boxplot": 1537,
                        "parallel": 1908,
                        "gauge": 2107,
                        "funnel": 1692,
                        "sankey": 1568
                    },
                    "components": {
                        "geo": 2788,
                        "title": 9575,
                        "legend": 9400,
                        "tooltip": 9466,
                        "grid": 9266,
                        "markPoint": 3419,
                        "markLine": 2984,
                        "timeline": 2739,
                        "dataZoom": 2744,
                        "visualMap": 2466,
                        "toolbox": 3034,
                        "polar": 1945
                    },
                    "ie": 9743
                };

                let downloadJson = {
                    "echarts.min.js": 17365,
                    "echarts.simple.min.js": 4079,
                    "echarts.common.min.js": 6929,
                    "echarts.js": 14890
                };

                var themeJson = {
                    "dark.js": 1594,
                    "infographic.js": 925,
                    "shine.js": 1608,
                    "roma.js": 721,
                    "macarons.js": 2179,
                    "vintage.js": 1982
                };

                var waterMarkText = 'ECHARTS';

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = canvas.height = 100;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.globalAlpha = 0.08;
                ctx.font = '20px Microsoft Yahei';
                ctx.translate(50, 50);
                ctx.rotate(-Math.PI / 4);
                ctx.fillText(waterMarkText, 0, 0);

                option = {
                    backgroundColor: {
                        type: 'pattern',
                        image: canvas,
                        repeat: 'repeat'
                    },
                    tooltip: {},
                    title: [{
                        text: '在线构建',
                        subtext: '总计 ' + builderJson.all,
                        left: '25%',
                        textAlign: 'center'
                    }, {
                        text: '各版本下载',
                        subtext: '总计 ' + Object.keys(downloadJson).reduce(function (all, key) {
                            return all + downloadJson[key];
                        }, 0),
                        left: '75%',
                        textAlign: 'center'
                    }, {
                        text: '主题下载',
                        subtext: '总计 ' + Object.keys(themeJson).reduce(function (all, key) {
                            return all + themeJson[key];
                        }, 0),
                        left: '75%',
                        top: '50%',
                        textAlign: 'center'
                    }],
                    grid: [{
                        top: 50,
                        width: '50%',
                        bottom: '45%',
                        left: 10,
                        containLabel: true
                    }, {
                        top: '55%',
                        width: '50%',
                        bottom: 0,
                        left: 10,
                        containLabel: true
                    }],
                    xAxis: [{
                        type: 'value',
                        max: builderJson.all,
                        splitLine: {
                            show: false
                        }
                    }, {
                        type: 'value',
                        max: builderJson.all,
                        gridIndex: 1,
                        splitLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        }
                    }, {
                        gridIndex: 1,
                        type: 'category',
                        data: Object.keys(builderJson.components),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }, {
                        type: 'bar',
                        stack: 'chart',
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.all - builderJson.charts[key];
                        })
                    }, {
                        type: 'bar',
                        stack: 'component',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        z: 3,
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        data: Object.keys(builderJson.components).map(function (key) {
                            return builderJson.components[key];
                        })
                    }, {
                        type: 'bar',
                        stack: 'component',
                        silent: true,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        data: Object.keys(builderJson.components).map(function (key) {
                            return builderJson.all - builderJson.components[key];
                        })
                    }, {
                        type: 'pie',
                        radius: [0, '30%'],
                        center: ['75%', '25%'],
                        data: Object.keys(downloadJson).map(function (key) {
                            return {
                                name: key.replace('.js', ''),
                                value: downloadJson[key]
                            }
                        })
                    }, {
                        type: 'pie',
                        radius: [0, '30%'],
                        center: ['75%', '75%'],
                        data: Object.keys(themeJson).map(function (key) {
                            return {
                                name: key.replace('.js', ''),
                                value: themeJson[key]
                            };
                        })
                    }]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            },
            chartDemo1() {

                var dom = document.getElementById("demo-1");
                var myChart = echarts.init(dom);
                let option = null;
// Generate data
                var category = [];
                var dottedBase = +new Date();
                var lineData = [];
                var barData = [];

                for (var i = 0; i < 20; i++) {
                    var date = new Date(dottedBase += 3600 * 24 * 1000);
                    category.push([
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                    ].join('-'));
                    var b = Math.random() * 200;
                    var d = Math.random() * 200;
                    barData.push(b)
                    lineData.push(d + b);
                }


// option
                option = {
                    backgroundColor: '#0f375f',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['line', 'bar'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    xAxis: {
                        data: category,
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    yAxis: {
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    series: [{
                        name: 'line',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 15,
                        data: lineData
                    }, {
                        name: 'bar',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#14c8d4'},
                                    {offset: 1, color: '#43eec6'}
                                ]
                            )
                        },
                        data: barData
                    }, {
                        name: 'line',
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: 10,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: 'rgba(20,200,212,0.5)'},
                                    {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                                    {offset: 1, color: 'rgba(20,200,212,0)'}
                                ]
                            )
                        },
                        z: -12,
                        data: lineData
                    }, {
                        name: 'dotted',
                        type: 'pictorialBar',
                        symbol: 'rect',
                        itemStyle: {
                            color: '#0f375f'
                        },
                        symbolRepeat: true,
                        symbolSize: [12, 4],
                        symbolMargin: 1,
                        z: -10,
                        data: lineData
                    }]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }

            },
            chartDemo2() {
                let dom = document.getElementById("demo-2");
                let myChart = echarts.init(dom);
                let option = {
                    title: {
                        text: '漏斗图(对比)',
                        subtext: '纯属虚构',
                        left: 'left',
                        top: 'bottom'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['产品A', '产品B', '产品C', '产品D', '产品E']
                    },

                    series: [
                        {
                            name: '漏斗图',
                            type: 'funnel',
                            width: '40%',
                            height: '45%',
                            left: '5%',
                            top: '50%',
                            funnelAlign: 'right',

                            center: ['25%', '25%'],  // for pie

                            data: [
                                {value: 60, name: '产品C'},
                                {value: 30, name: '产品D'},
                                {value: 10, name: '产品E'},
                                {value: 80, name: '产品B'},
                                {value: 100, name: '产品A'}
                            ]
                        },
                        {
                            name: '金字塔',
                            type: 'funnel',
                            width: '40%',
                            height: '45%',
                            left: '5%',
                            top: '5%',
                            sort: 'ascending',
                            funnelAlign: 'right',

                            center: ['25%', '75%'],  // for pie

                            data: [
                                {value: 60, name: '产品C'},
                                {value: 30, name: '产品D'},
                                {value: 10, name: '产品E'},
                                {value: 80, name: '产品B'},
                                {value: 100, name: '产品A'}
                            ]
                        },
                        {
                            name: '漏斗图',
                            type: 'funnel',
                            width: '40%',
                            height: '45%',
                            left: '55%',
                            top: '5%',
                            funnelAlign: 'left',

                            center: ['75%', '25%'],  // for pie

                            data: [
                                {value: 60, name: '产品C'},
                                {value: 30, name: '产品D'},
                                {value: 10, name: '产品E'},
                                {value: 80, name: '产品B'},
                                {value: 100, name: '产品A'}
                            ]
                        },
                        {
                            name: '金字塔',
                            type: 'funnel',
                            width: '40%',
                            height: '45%',
                            left: '55%',
                            top: '50%',
                            sort: 'ascending',
                            funnelAlign: 'left',

                            center: ['75%', '75%'],  // for pie

                            data: [
                                {value: 60, name: '产品C'},
                                {value: 30, name: '产品D'},
                                {value: 10, name: '产品E'},
                                {value: 80, name: '产品B'},
                                {value: 100, name: '产品A'}
                            ]
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            },
            chartDemo3() {
                let dom = document.getElementById("demo-3");
                let myChart = echarts.init(dom);
                let option =  {
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        showContent: false
                    },
                    dataset: {
                        source: [
                            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                            ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                            ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {gridIndex: 0},
                    grid: {top: '55%'},
                    series: [
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {
                            type: 'pie',
                            id: 'pie',
                            radius: '30%',
                            center: ['50%', '25%'],
                            label: {
                                formatter: '{b}: {@2012} ({d}%)'
                            },
                            encode: {
                                itemName: 'product',
                                value: '2012',
                                tooltip: '2012'
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            }
        },
        created() {

        },
        mounted() {
            this.chartDemo1();
            this.chartDemo2();
            this.chartDemo3();
            this.chartDemo4();
        }
    }
</script>

<style scoped>
    div {
        padding: 0;

    }
</style>