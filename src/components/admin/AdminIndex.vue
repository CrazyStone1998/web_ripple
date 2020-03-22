<template>
    <div>
        <el-row>
            <el-col :span="12" id="d-1" style="height: 300px">
            </el-col>
            <el-col :span="12" id="d-2" style="height: 300px">

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" id="d-3" style="height: 300px">

            </el-col>
            <el-col :span="12" id="d-4" style="height:300px">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {

        name: "AdminIndex",
        data() {
            return {

            }
        },
        methods: {
            chartDemo1() {

                var dom = document.getElementById("d-1");
                var myChart = echarts.init(dom);
                let option = null;
                var data = [{
                    name: 'Flora',
                    itemStyle: {
                        color: '#da0d68'
                    },
                    children: [{
                        name: 'Black Tea',
                        value: 1,
                        itemStyle: {
                            color: '#975e6d'
                        }
                    }, {
                        name: 'Floral',
                        itemStyle: {
                            color: '#e0719c'
                        },
                        children: [{
                            name: 'Chamomile',
                            value: 1,
                            itemStyle: {
                                color: '#f99e1c'
                            }
                        }, {
                            name: 'Rose',
                            value: 1,
                            itemStyle: {
                                color: '#ef5a78'
                            }
                        }, {
                            name: 'Jasmine',
                            value: 1,
                            itemStyle: {
                                color: '#f7f1bd'
                            }
                        }]
                    }]
                }, {
                    name: 'Fruity',
                    itemStyle: {
                        color: '#da1d23'
                    },
                    children: [{
                        name: 'Berry',
                        itemStyle: {
                            color: '#dd4c51'
                        },
                        children: [{
                            name: 'Blackberry',
                            value: 1,
                            itemStyle: {
                                color: '#3e0317'
                            }
                        }, {
                            name: 'Raspberry',
                            value: 1,
                            itemStyle: {
                                color: '#e62969'
                            }
                        }, {
                            name: 'Blueberry',
                            value: 1,
                            itemStyle: {
                                color: '#6569b0'
                            }
                        }, {
                            name: 'Strawberry',
                            value: 1,
                            itemStyle: {
                                color: '#ef2d36'
                            }
                        }]
                    }, {
                        name: 'Dried Fruit',
                        itemStyle: {
                            color: '#c94a44'
                        },
                        children: [{
                            name: 'Raisin',
                            value: 1,
                            itemStyle: {
                                color: '#b53b54'
                            }
                        }, {
                            name: 'Prune',
                            value: 1,
                            itemStyle: {
                                color: '#a5446f'
                            }
                        }]
                    }, {
                        name: 'Other Fruit',
                        itemStyle: {
                            color: '#dd4c51'
                        },
                        children: [{
                            name: 'Coconut',
                            value: 1,
                            itemStyle: {
                                color: '#f2684b'
                            }
                        }, {
                            name: 'Cherry',
                            value: 1,
                            itemStyle: {
                                color: '#e73451'
                            }
                        }, {
                            name: 'Pomegranate',
                            value: 1,
                            itemStyle: {
                                color: '#e65656'
                            }
                        }, {
                            name: 'Pineapple',
                            value: 1,
                            itemStyle: {
                                color: '#f89a1c'
                            }
                        }, {
                            name: 'Grape',
                            value: 1,
                            itemStyle: {
                                color: '#aeb92c'
                            }
                        }, {
                            name: 'Apple',
                            value: 1,
                            itemStyle: {
                                color: '#4eb849'
                            }
                        }, {
                            name: 'Peach',
                            value: 1,
                            itemStyle: {
                                color: '#f68a5c'
                            }
                        }, {
                            name: 'Pear',
                            value: 1,
                            itemStyle: {
                                color: '#baa635'
                            }
                        }]
                    }, {
                        name: 'Citrus Fruit',
                        itemStyle: {
                            color: '#f7a128'
                        },
                        children: [{
                            name: 'Grapefruit',
                            value: 1,
                            itemStyle: {
                                color: '#f26355'
                            }
                        }, {
                            name: 'Orange',
                            value: 1,
                            itemStyle: {
                                color: '#e2631e'
                            }
                        }, {
                            name: 'Lemon',
                            value: 1,
                            itemStyle: {
                                color: '#fde404'
                            }
                        }, {
                            name: 'Lime',
                            value: 1,
                            itemStyle: {
                                color: '#7eb138'
                            }
                        }]
                    }]
                }, {
                    name: 'Sour/\nFermented',
                    itemStyle: {
                        color: '#ebb40f'
                    },
                    children: [{
                        name: 'Sour',
                        itemStyle: {
                            color: '#e1c315'
                        },
                        children: [{
                            name: 'Sour Aromatics',
                            value: 1,
                            itemStyle: {
                                color: '#9ea718'
                            }
                        }, {
                            name: 'Acetic Acid',
                            value: 1,
                            itemStyle: {
                                color: '#94a76f'
                            }
                        }, {
                            name: 'Butyric Acid',
                            value: 1,
                            itemStyle: {
                                color: '#d0b24f'
                            }
                        }, {
                            name: 'Isovaleric Acid',
                            value: 1,
                            itemStyle: {
                                color: '#8eb646'
                            }
                        }, {
                            name: 'Citric Acid',
                            value: 1,
                            itemStyle: {
                                color: '#faef07'
                            }
                        }, {
                            name: 'Malic Acid',
                            value: 1,
                            itemStyle: {
                                color: '#c1ba07'
                            }
                        }]
                    }, {
                        name: 'Alcohol/\nFremented',
                        itemStyle: {
                            color: '#b09733'
                        },
                        children: [{
                            name: 'Winey',
                            value: 1,
                            itemStyle: {
                                color: '#8f1c53'
                            }
                        }, {
                            name: 'Whiskey',
                            value: 1,
                            itemStyle: {
                                color: '#b34039'
                            }
                        }, {
                            name: 'Fremented',
                            value: 1,
                            itemStyle: {
                                color: '#ba9232'
                            }
                        }, {
                            name: 'Overripe',
                            value: 1,
                            itemStyle: {
                                color: '#8b6439'
                            }
                        }]
                    }]
                }, {
                    name: 'Green/\nVegetative',
                    itemStyle: {
                        color: '#187a2f'
                    },
                    children: [{
                        name: 'Olive Oil',
                        value: 1,
                        itemStyle: {
                            color: '#a2b029'
                        }
                    }, {
                        name: 'Raw',
                        value: 1,
                        itemStyle: {
                            color: '#718933'
                        }
                    }, {
                        name: 'Green/\nVegetative',
                        itemStyle: {
                            color: '#3aa255'
                        },
                        children: [{
                            name: 'Under-ripe',
                            value: 1,
                            itemStyle: {
                                color: '#a2bb2b'
                            }
                        }, {
                            name: 'Peapod',
                            value: 1,
                            itemStyle: {
                                color: '#62aa3c'
                            }
                        }, {
                            name: 'Fresh',
                            value: 1,
                            itemStyle: {
                                color: '#03a653'
                            }
                        }, {
                            name: 'Dark Green',
                            value: 1,
                            itemStyle: {
                                color: '#038549'
                            }
                        }, {
                            name: 'Vegetative',
                            value: 1,
                            itemStyle: {
                                color: '#28b44b'
                            }
                        }, {
                            name: 'Hay-like',
                            value: 1,
                            itemStyle: {
                                color: '#a3a830'
                            }
                        }, {
                            name: 'Herb-like',
                            value: 1,
                            itemStyle: {
                                color: '#7ac141'
                            }
                        }]
                    }, {
                        name: 'Beany',
                        value: 1,
                        itemStyle: {
                            color: '#5e9a80'
                        }
                    }]
                }, {
                    name: 'Other',
                    itemStyle: {
                        color: '#0aa3b5'
                    },
                    children: [{
                        name: 'Papery/Musty',
                        itemStyle: {
                            color: '#9db2b7'
                        },
                        children: [{
                            name: 'Stale',
                            value: 1,
                            itemStyle: {
                                color: '#8b8c90'
                            }
                        }, {
                            name: 'Cardboard',
                            value: 1,
                            itemStyle: {
                                color: '#beb276'
                            }
                        }, {
                            name: 'Papery',
                            value: 1,
                            itemStyle: {
                                color: '#fefef4'
                            }
                        }, {
                            name: 'Woody',
                            value: 1,
                            itemStyle: {
                                color: '#744e03'
                            }
                        }, {
                            name: 'Moldy/Damp',
                            value: 1,
                            itemStyle: {
                                color: '#a3a36f'
                            }
                        }, {
                            name: 'Musty/Dusty',
                            value: 1,
                            itemStyle: {
                                color: '#c9b583'
                            }
                        }, {
                            name: 'Musty/Earthy',
                            value: 1,
                            itemStyle: {
                                color: '#978847'
                            }
                        }, {
                            name: 'Animalic',
                            value: 1,
                            itemStyle: {
                                color: '#9d977f'
                            }
                        }, {
                            name: 'Meaty Brothy',
                            value: 1,
                            itemStyle: {
                                color: '#cc7b6a'
                            }
                        }, {
                            name: 'Phenolic',
                            value: 1,
                            itemStyle: {
                                color: '#db646a'
                            }
                        }]
                    }, {
                        name: 'Chemical',
                        itemStyle: {
                            color: '#76c0cb'
                        },
                        children: [{
                            name: 'Bitter',
                            value: 1,
                            itemStyle: {
                                color: '#80a89d'
                            }
                        }, {
                            name: 'Salty',
                            value: 1,
                            itemStyle: {
                                color: '#def2fd'
                            }
                        }, {
                            name: 'Medicinal',
                            value: 1,
                            itemStyle: {
                                color: '#7a9bae'
                            }
                        }, {
                            name: 'Petroleum',
                            value: 1,
                            itemStyle: {
                                color: '#039fb8'
                            }
                        }, {
                            name: 'Skunky',
                            value: 1,
                            itemStyle: {
                                color: '#5e777b'
                            }
                        }, {
                            name: 'Rubber',
                            value: 1,
                            itemStyle: {
                                color: '#120c0c'
                            }
                        }]
                    }]
                }, {
                    name: 'Roasted',
                    itemStyle: {
                        color: '#c94930'
                    },
                    children: [{
                        name: 'Pipe Tobacco',
                        value: 1,
                        itemStyle: {
                            color: '#caa465'
                        }
                    }, {
                        name: 'Tobacco',
                        value: 1,
                        itemStyle: {
                            color: '#dfbd7e'
                        }
                    }, {
                        name: 'Burnt',
                        itemStyle: {
                            color: '#be8663'
                        },
                        children: [{
                            name: 'Acrid',
                            value: 1,
                            itemStyle: {
                                color: '#b9a449'
                            }
                        }, {
                            name: 'Ashy',
                            value: 1,
                            itemStyle: {
                                color: '#899893'
                            }
                        }, {
                            name: 'Smoky',
                            value: 1,
                            itemStyle: {
                                color: '#a1743b'
                            }
                        }, {
                            name: 'Brown, Roast',
                            value: 1,
                            itemStyle: {
                                color: '#894810'
                            }
                        }]
                    }, {
                        name: 'Cereal',
                        itemStyle: {
                            color: '#ddaf61'
                        },
                        children: [{
                            name: 'Grain',
                            value: 1,
                            itemStyle: {
                                color: '#b7906f'
                            }
                        }, {
                            name: 'Malt',
                            value: 1,
                            itemStyle: {
                                color: '#eb9d5f'
                            }
                        }]
                    }]
                }, {
                    name: 'Spices',
                    itemStyle: {
                        color: '#ad213e'
                    },
                    children: [{
                        name: 'Pungent',
                        value: 1,
                        itemStyle: {
                            color: '#794752'
                        }
                    }, {
                        name: 'Pepper',
                        value: 1,
                        itemStyle: {
                            color: '#cc3d41'
                        }
                    }, {
                        name: 'Brown Spice',
                        itemStyle: {
                            color: '#b14d57'
                        },
                        children: [{
                            name: 'Anise',
                            value: 1,
                            itemStyle: {
                                color: '#c78936'
                            }
                        }, {
                            name: 'Nutmeg',
                            value: 1,
                            itemStyle: {
                                color: '#8c292c'
                            }
                        }, {
                            name: 'Cinnamon',
                            value: 1,
                            itemStyle: {
                                color: '#e5762e'
                            }
                        }, {
                            name: 'Clove',
                            value: 1,
                            itemStyle: {
                                color: '#a16c5a'
                            }
                        }]
                    }]
                }, {
                    name: 'Nutty/\nCocoa',
                    itemStyle: {
                        color: '#a87b64'
                    },
                    children: [{
                        name: 'Nutty',
                        itemStyle: {
                            color: '#c78869'
                        },
                        children: [ {
                            name: 'Peanuts',
                            value: 1,
                            itemStyle: {
                                color: '#d4ad12'
                            }
                        }, {
                            name: 'Hazelnut',
                            value: 1,
                            itemStyle: {
                                color: '#9d5433'
                            }
                        }, {
                            name: 'Almond',
                            value: 1,
                            itemStyle: {
                                color: '#c89f83'
                            }
                        }]
                    }, {
                        name: 'Cocoa',
                        itemStyle: {
                            color: '#bb764c'
                        },
                        children: [{
                            name: 'Chocolate',
                            value: 1,
                            itemStyle: {
                                color: '#692a19'
                            }
                        }, {
                            name: 'Dark Chocolate',
                            value: 1,
                            itemStyle: {
                                color: '#470604'
                            }
                        }]
                    }]
                }, {
                    name: 'Sweet',
                    itemStyle: {
                        color: '#e65832'
                    },
                    children: [{
                        name: 'Brown Sugar',
                        itemStyle: {
                            color: '#d45a59'
                        },
                        children: [{
                            name: 'Molasses',
                            value: 1,
                            itemStyle: {
                                color: '#310d0f'
                            }
                        }, {
                            name: 'Maple Syrup',
                            value: 1,
                            itemStyle: {
                                color: '#ae341f'
                            }
                        }, {
                            name: 'Caramelized',
                            value: 1,
                            itemStyle: {
                                color: '#d78823'
                            }
                        }, {
                            name: 'Honey',
                            value: 1,
                            itemStyle: {
                                color: '#da5c1f'
                            }
                        }]
                    }, {
                        name: 'Vanilla',
                        value: 1,
                        itemStyle: {
                            color: '#f89a80'
                        }
                    }, {
                        name: 'Vanillin',
                        value: 1,
                        itemStyle: {
                            color: '#f37674'
                        }
                    }, {
                        name: 'Overall Sweet',
                        value: 1,
                        itemStyle: {
                            color: '#e75b68'
                        }
                    }, {
                        name: 'Sweet Aromatics',
                        value: 1,
                        itemStyle: {
                            color: '#d0545f'
                        }
                    }]
                }];

                option = {
                    title: {
                        text: 'WORLD COFFEE RESEARCH SENSORY LEXICON',
                        subtext: 'Source: https://worldcoffeeresearch.org/work/sensory-lexicon/',
                        textStyle: {
                            fontSize: 14,
                            align: 'center'
                        },
                        subtextStyle: {
                            align: 'center'
                        },
                        sublink: 'https://worldcoffeeresearch.org/work/sensory-lexicon/'
                    },
                    series: {
                        type: 'sunburst',
                        highlightPolicy: 'ancestor',
                        data: data,
                        radius: [0, '95%'],
                        sort: null,
                        levels: [{}, {
                            r0: '15%',
                            r: '35%',
                            itemStyle: {
                                borderWidth: 2
                            },
                            label: {
                                rotate: 'tangential'
                            }
                        }, {
                            r0: '35%',
                            r: '70%',
                            label: {
                                align: 'right'
                            }
                        }, {
                            r0: '70%',
                            r: '72%',
                            label: {
                                position: 'outside',
                                padding: 3,
                                silent: false
                            },
                            itemStyle: {
                                borderWidth: 3
                            }
                        }]
                    }
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }

            },
            chartDemo4() {

                var dom = document.getElementById("d-4");
                var myChart = echarts.init(dom);
                let option = null;
                option = {
                    title: {
                        text: '浏览器占比变化',
                        subtext: '纯属虚构',
                        top: 10,
                        left: 10
                    },
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,250,0.2)'
                    },
                    legend: {
                        type: 'scroll',
                        bottom: 10,
                        data: (function (){
                            var list = [];
                            for (var i = 1; i <=28; i++) {
                                list.push(i + 2000 + '');
                            }
                            return list;
                        })()
                    },
                    visualMap: {
                        top: 'middle',
                        right: 10,
                        color: ['red', 'yellow'],
                        calculable: true
                    },
                    radar: {
                        indicator: [
                            { text: 'IE8-', max: 400},
                            { text: 'IE9+', max: 400},
                            { text: 'Safari', max: 400},
                            { text: 'Firefox', max: 400},
                            { text: 'Chrome', max: 400}
                        ]
                    },
                    series: (function (){
                        var series = [];
                        for (var i = 1; i <= 28; i++) {
                            series.push({
                                name: '浏览器（数据纯属虚构）',
                                type: 'radar',
                                symbol: 'none',
                                lineStyle: {
                                    width: 1
                                },
                                emphasis: {
                                    areaStyle: {
                                        color: 'rgba(0,250,0,0.3)'
                                    }
                                },
                                data: [{
                                    value: [
                                        (40 - i) * 10,
                                        (38 - i) * 4 + 60,
                                        i * 5 + 10,
                                        i * 9,
                                        i * i /2
                                    ],
                                    name: i + 2000 + ''
                                }]
                            });
                        }
                        return series;
                    })()
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }

            },
            chartDemo2() {
                let dom = document.getElementById("d-2");
                let myChart = echarts.init(dom);
                let option = {
                    title: {
                        text: '堆叠区域图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {},
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            },
            chartDemo3() {
                let dom = document.getElementById("d-3");
                let myChart = echarts.init(dom);
                let option = {
                    title: {
                        text: '南丁格尔玫瑰图',
                        subtext: '纯属虚构',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        top: 'bottom',
                        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '半径模式',
                            type: 'pie',
                            radius: [20, 110],
                            center: ['25%', '50%'],
                            roseType: 'radius',
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: [
                                {value: 10, name: 'rose1'},
                                {value: 5, name: 'rose2'},
                                {value: 15, name: 'rose3'},
                                {value: 25, name: 'rose4'},
                                {value: 20, name: 'rose5'},
                                {value: 35, name: 'rose6'},
                                {value: 30, name: 'rose7'},
                                {value: 40, name: 'rose8'}
                            ]
                        },
                        {
                            name: '面积模式',
                            type: 'pie',
                            radius: [30, 110],
                            center: ['75%', '50%'],
                            roseType: 'area',
                            data: [
                                {value: 10, name: 'rose1'},
                                {value: 5, name: 'rose2'},
                                {value: 15, name: 'rose3'},
                                {value: 25, name: 'rose4'},
                                {value: 20, name: 'rose5'},
                                {value: 35, name: 'rose6'},
                                {value: 30, name: 'rose7'},
                                {value: 40, name: 'rose8'}
                            ]
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