
// 初始化各echarts实例
var trendChart1 = echarts.init(document.getElementById('trendNationWide'));
var trendChart2 = echarts.init(document.getElementById('trendTotal'));
var trendChart3 = echarts.init(document.getElementById('trendDaily'));
var contrast = echarts.init(document.getElementById('contrastGraph'));

var data = [];
var dates = [];

// 变量与文字对应关系
var seriesText1 = {
    curedRate: "治愈率",
    deadRate: "死亡率"
};
var seriesText2 = {
    totalDiagnosed: "累计确诊",
    totalDead: "累计死亡",
    totalCured: "累计治愈"
};
var seriesText3 = {
    diagnosed: "新增确诊"
};
var otherPro = {proName:'非鄂地区',data_daylist:[]};
var hubei_daylist = [];
var optionContrast;
// 向后端请求疫情数据信息
$(document).ready(function (){
	$.ajax({
		url: "/situation/epidata/",
		async: true,
		success: function(dataRaw){
			// 解析数据
			dataRaw = JSON.parse(dataRaw);
			data = dataRaw.provinceset;
			// 日期列表
			dates = dataRaw.dates;
			// 计算全国及目标地区各日数据，及全国现存\累计的地图数据
			var nationwideData = []; // 绘制用数据
			for (const provinceN in data) {
				province = data[provinceN];
				provinceDiagnosedNow = 0;
				provinceDiagnosedTotal = 0;
				dataPointer = 0; // 用日期指针解决记录时间可能不连续的问题。
				for (const date of dates) { // 内循环是日期不是data。
					dateData = province.data[dataPointer];
					// 计算全国累计治愈、死亡
					if ((dateData == undefined || dateData.date != date) && provinceN == 0) {
						nationwideData.push({
							date: date,
							diagnosed: 0,
							cured: 0,
							dead: 0,
							imported:0
						});
						continue;
					}
					if (dateData == undefined) {
						continue;
					}
					provinceDiagnosedNow += dateData.diagnosed - dateData.cured - dateData.dead;
					provinceDiagnosedTotal += dateData.diagnosed;
					if (provinceN == 0) {
						nationwideData.push({
							date: dateData.date,
							diagnosed: dateData.diagnosed,
							cured: dateData.cured,
							dead: dateData.dead,
							imported: dateData.imported
						});
					} else {
						toModifiedData = nationwideData[dataPointer];
						toModifiedData.diagnosed += dateData.diagnosed;
						toModifiedData.cured += dateData.cured;
						toModifiedData.dead += dateData.dead;
					}
					dataPointer++;
				}
				mapDataNow.push({
					name: province.province,
					value: provinceDiagnosedNow,
				})
				mapDataTotal.push({
					name: province.province,
					value: provinceDiagnosedTotal,
				})
			}

			// 绘制地图。相关函数见Epi_map.js
			choice = mapDataTotal;
			ec_center.setOption({
				series: [{
					data: mapDataTotal,
				}]
			})

			// 计算全国治愈率、死亡率趋势
			var nationwideRateData = [];
			var totalDiagnosed = 0, totalDead = 0, totalCured = 0;
			for (const dateData of nationwideData) {
				totalDiagnosed += dateData.diagnosed;
				totalCured += dateData.cured;
				totalDead += dateData.dead;
				nationwideRateData.push({
					date: dateData.date,
					curedRate: (totalCured / totalDiagnosed * 100).toFixed(1),
					deadRate: (totalDead / totalDiagnosed * 100).toFixed(1)
				});
			}

			// 全国治愈率、死亡率趋势图数据配置
			var optionTC1 = {
				title: {
					text: '全国治愈率、死亡率趋势图'
				},
				tooltip: {
					trigger: 'axis',
					formatter: function (params) {
						tipString = "日期：" + params[0].data.date;
						tipString = tipString + "<br>治愈率：" + params[0].data.curedRate + "%<br>死亡率：" + params[0].data.deadRate + "%";
						return tipString;
					},
					textStyle: {
						align: 'left'
					},
				},
				legend: {
					selectedMode: false,
					x: "left",
					y: "bottom",
					formatter: function (params) {
						return seriesText1[params];
					}
				},
				xAxis: { type: 'category' },
				yAxis: {
					type: 'value',
					min: 0,
					max: 100,
				},
				series: [
					{ type: "line" },
					{ type: "line" }
				],
				dataset: {
					dimensions: ['date', 'curedRate', 'deadRate'],
					source: nationwideRateData
				}
			};

			//计算非鄂地区的统计数据
			for (const eachday of nationwideData) {
				otherPro.data_daylist.push(eachday.imported);
			}
			// for (const eachday of data) {
			// 	if(data[eachday].province=='湖北'){
			// 		for( const day_import in data[eachday].data){
			// 			otherPro.data_daylist[day_import]-=eachday.data[day_import];
			// 		}
			// 	}
			// }
			for(var index=0;index<data.length;index++){
				if(data[index].province=='湖北'){
					for(var index2=0;index<data[index].data.length&&index2<<data.length;index2++ ){
						otherPro.data_daylist[index2]-=data[index].data[index2].imported;
					}
				}
			}



			// 使用刚指定的配置项和数据显示图表。
			trendChart1.setOption(optionTC1);
			// 计算各省累计、新增数据并显示图表。之所以单独作为函数是因为这一块可能会被反复调用，因此以重复遍历为代价增强复用性。

			calcTargetData();
			//modify
			//趋势图部分
			var contrastLegend = ['湖北'], contrastXaxis = [];
			var contrastSeries = [];
			for (const index in data) {
				var proName = data[index].province;
				//contrastLegend.push(proName);
				var dayListingThisProvince = [];
				for (const everyday in data[index].data) {
					dayListingThisProvince.push(
						{
							date: data[index].data[everyday].date,
							import: data[index].data[everyday].imported
						}
					)
					// sumday+=data[index].data[everyday].imported;
				}
				provinceGather.push(
					{
						proName: proName,
						dayListing: dayListingThisProvince
					}
				)
			}

			
			for (const index in provinceGather) {
				if (provinceGather[index].proName == '湖北') {
					for (const index_date in provinceGather[index].dayListing) {
						hubei_daylist.push(provinceGather[index].dayListing[index_date].import);
						contrastXaxis.push(provinceGather[index].dayListing[index_date].date);
					}
					contrastSeries.push({
						name: '湖北',
						type: 'line',
						data: hubei_daylist}
					);
				}
				else{
					
				}
			}

			optionContrast = {
				title: {
					text: '每日境外输入对比图'
				},
				tooltip: {
					trigger: 'axis',
					textStyle: {
						align: 'left'
					},
				},
				legend: {
					selectedMode: false,
					data: contrastLegend,
					x:"left",
					y:"bottom"
				},
				xAxis: {
					type: 'category',
					data: contrastXaxis
				},
				yAxis: {
					type: 'value'
				},
				series: contrastSeries
			};
			contrast.setOption(optionContrast);
		}
	});
	// 不要忘记设置图表的初始大小。
    resizeCharts();
})

function calcTargetData() {
    // 计算目标地区新增数据
    var targetData = []; // 绘制用数据
    var firstProvince = 1; // 判断是否为第一个录入的省份
    for (const province of data) {
        if (province.province == targetProvince || targetProvince == "全国" || (targetProvince == "非鄂" && province.province != "湖北")) {
            dataPointer = 0;	// 操作和第一张图的一样
            for (const date of dates) {
                dateData = province.data[dataPointer];
                if ((dateData == undefined || dateData.date != date) && firstProvince == 1)
                {
                    targetData.push({
                        date: date,
                        diagnosed: 0,
                        cured: 0,
                        dead: 0,
                        imported: 0,
						asymptomatic: 0,
                    });
                    continue;
                }
                if (dateData == undefined) {
                    continue;
                }
                if (firstProvince == 1) {
                    targetData.push({
                        date: dateData.date,
                        diagnosed: dateData.diagnosed,
                        cured: dateData.cured,
                        dead: dateData.dead,
                        imported: dateData.imported,
						asymptomatic: dateData.asymptomatic,
                    });
                } else {
                    toModifiedData = targetData[dataPointer];
                    toModifiedData.diagnosed += dateData.diagnosed;
                    toModifiedData.cured += dateData.cured;
                    toModifiedData.dead += dateData.dead;
                    toModifiedData.imported += dateData.imported;
                    toModifiedData.asymptomatic += dateData.asymptomatic;
                }
                dataPointer++;
            }
            firstProvince = 0;
        }
    }
    // 计算目标地区累计确诊、死亡、治愈
    var totalDiagnosed = 0, totalCured = 0, totalDead = 0, totalImported = 0, totalAsymptomatic = 0;
    for (dateData of targetData) {
        totalDiagnosed += dateData.diagnosed;
        totalCured += dateData.cured;
        totalDead += dateData.dead;
        totalImported += dateData.imported;
		totalAsymptomatic += dateData.asymptomatic;
        dateData.totalDiagnosed = totalDiagnosed;
        dateData.totalCured = totalCured;
        dateData.totalDead = totalDead;
    }
    // 更新数据展示页的四个数字数据
    $("#confirm").text(totalDiagnosed.toString());
    $("#import").text(totalImported.toString());
    $("#mortality").text(totalDead.toString());
    $("#cure").text(totalCured.toString());
    $("#asymptomatic").text(totalAsymptomatic.toString());

    var optionTC2 = {
    // 显示目标地区累计确诊、死亡、治愈趋势图
        title: {
            text: '累计确诊、死亡、治愈趋势图'
        },
        tooltip: {
			trigger: 'axis',
            formatter: function (params) {
                tipString = "日期：" + params[0].data.date;
                tipString = tipString + "<br>累计确诊：" + params[0].data.totalDiagnosed + "<br>累计死亡：" + params[0].data.totalDead + "<br>累计治愈：" + params[0].data.totalCured;
                return tipString;
            },
            textStyle: {
                align: 'left'
            }
        },
        legend: {
            selectedMode: false,
            x: "left",
            y: "bottom",
            formatter: function (params) {
                return seriesText2[params];
            }
        },
        xAxis: { type: 'category' },
        yAxis: { min: 0 },
        series: [
            { type: "line" },
            { type: "line" },
            { type: "line" }
        ],
        grid: {
            left: "60em",
        },
        dataset: {
            dimensions: ['date', 'totalDiagnosed', 'totalDead', 'totalCured'],
            source: targetData
        }
    };
    trendChart2.setOption(optionTC2);
    var optionTC3 = {
    // 显示目标地区每日新增确诊趋势图
        title: {
            text: '每日新增确诊趋势图'
        },
        tooltip: {
			trigger: 'axis',
            formatter: function (params) {
                tipString = "日期：" + params[0].data.date;
                tipString = tipString + "<br>人数：" + params[0].data.diagnosed;
                return tipString;
            },
            textStyle: {
                align: 'left'
            }
        },
        legend: {
            selectedMode: false,
            x: "left",
            y: "bottom",
            formatter: function (params) {
                return seriesText3[params];
            }
        },
        xAxis: { type: 'category' },
        yAxis: { min: 0 },
        series: [
            { type: "line" }
        ],
        grid: {
            left: "60em",
        },
        dataset: {
            dimensions: ['date', 'diagnosed'],
            source: targetData
        }
    };
	trendChart3.setOption(optionTC3);
}

// 当画面大小变化时对应改变各图表的尺寸。
function resizeCharts() {
    $("#trendNationWide").css({
        "height": 0.5 * $("#trendNationWideDiv").width(),
        "width": $("#trendNationWideDiv").width()
    });
    trendChart1.resize();
    $("#trendTotal").css({
        "height": 0.5 * $("#trendTotalDiv").width(),
        "width": $("#trendTotalDiv").width()
    });
    trendChart2.resize();
    $("#trendDaily").css({
        "height": 0.5 * $("#trendDailyDiv").width(),
        "width": $("#trendDailyDiv").width()
    });
    trendChart3.resize();
    $("#contrastGraph").css({
        "height": 0.5 * $("#contrastWrapper").width(),
        "width": $("#contrastWrapper").width()
    })
    contrast.resize();
	if (window.matchMedia('(min-width: 992px)').matches) {
		$("#Epi_map").css({
			"height": 3 * $("#contrastWrapper").height(),
		})
	} else {
		$("#Epi_map").css({
			"height": 0.75 * $("#contrastWrapper").width(),
		})
	}
    ec_center.resize();
}

// 使图表大小进行自适应。
window.onresize = function () {
    resizeCharts();
}

//点击了显示湖北/非鄂地区的按钮
$("#hubei_other").click(function () {
    for (updatedProvince of choice)
    {
        delete updatedProvince.itemStyle;
    }
    if (targetProvince == "非鄂") {
		targetProvince = "全国";
		$("#Region_Name").html("当前地区: "+'全国');
	} else {
		targetProvince = "非鄂"
		$("#Region_Name").html("当前地区: "+'除湖北省外地区');
	}
	ec_center.setOption({
        series: [{
            data: choice
        }]
    })
	calcTargetData(); // 更新其他图
	
})